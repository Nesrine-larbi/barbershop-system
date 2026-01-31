import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, signOut, checkAuth } from '../supabaseClient'

export default function AdminDashboard() {
  const navigate = useNavigate()
  
  // Data State
  const [appointments, setAppointments] = useState([])
  const [stats, setStats] = useState({ total: 0, upcoming: 0, completed: 0, cancelled: 0 })
  const [filter, setFilter] = useState('upcoming') // Default to 'upcoming' for speed
  
  // UI State
  const [isLoading, setIsLoading] = useState(true)
  const [userEmail, setUserEmail] = useState('')

  // --- 1. Helpers & Formatters ---

  // Fix the "Postgres Space" issue once and for all
  const toIsoString = (dateStr) => {
    if (!dateStr) return null;
    return dateStr.replace(' ', 'T');
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Date invalide';
    return new Date(toIsoString(dateStr)).toLocaleDateString('fr-FR', { 
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' 
    })
  }

  const formatTime = (dateStr) => {
    if (!dateStr) return '--:--';
    const date = new Date(toIsoString(dateStr));
    if (isNaN(date.getTime())) return 'Invalid';
    
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Paris' 
    });
  };

  // --- 2. Data Fetching Logic ---

  // Fetch the Counts for the top cards (Lightweight query)
  const fetchStats = async () => {
    try {
      // We can run these in parallel for speed
      const [all, cancelled, upcoming] = await Promise.all([
        supabase.from('appointments').select('id', { count: 'exact', head: true }),
        supabase.from('appointments').select('id', { count: 'exact', head: true }).eq('status', 'cancelled'),
        supabase.from('upcoming_appointments').select('id', { count: 'exact', head: true }).neq('status', 'cancelled')
      ]);

      setStats({
        total: all.count || 0,
        cancelled: cancelled.count || 0,
        upcoming: upcoming.count || 0,
        completed: (all.count || 0) - (upcoming.count || 0) - (cancelled.count || 0) // Approximation
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  // Fetch the actual List based on the Filter
  const fetchAppointments = useCallback(async () => {
    setIsLoading(true)
    try {
      let query;

      // STRATEGY: Use the SQL VIEW for "Upcoming" to save performance
      if (filter === 'upcoming') {
        query = supabase
          .from('upcoming_appointments') 
          .select('*')
          .neq('status', 'cancelled') // View might have them, so we double check
          .order('start_time', { ascending: true });
      } 
      // For History/Cancelled, we hit the main table
      else {
        query = supabase
          .from('appointments')
          .select('*')
          .order('start_time', { ascending: false }); // Newest first

        if (filter === 'cancelled') query = query.eq('status', 'cancelled');
        // Note: For 'completed', we filter client-side below or could add complex SQL here
      }

      const { data, error } = await query;

      if (error) throw error;
      
      // Client-side filtering for "Completed" since it's tricky in SQL without a view
      let finalData = data || [];
      if (filter === 'completed') {
        const now = new Date();
        finalData = finalData.filter(a => {
           const end = new Date(toIsoString(a.end_time));
           return a.status !== 'cancelled' && end < now;
        });
      }

      setAppointments(finalData);
      
    } catch (err) {
      console.error('Error fetching list:', err);
      alert('Erreur de chargement');
    } finally {
      setIsLoading(false);
    }
  }, [filter]); // Re-run when filter changes

  // --- 3. Effects ---

  useEffect(() => {
    const init = async () => {
      const { session, error } = await checkAuth();
      if (error || !session) {
        navigate('/admin/login');
        return;
      }
      setUserEmail(session.user.email);
      fetchStats(); // Load stats once
      fetchAppointments(); // Load list
    };
    
    init();
  }, [navigate, fetchAppointments]);

  // --- REALTIME SUBSCRIPTION ---
  useEffect(() => {
    // 1. Safety Check: Don't subscribe if we haven't logged in yet
    if (!userEmail) return;

    console.log("📡 Connecting to Realtime for:", userEmail);

    const channel = supabase
      .channel('appointments-changes')
      .on(
        'postgres_changes',
        { 
          event: '*', // Listen to INSERT, UPDATE, DELETE
          schema: 'public', 
          table: 'appointments' 
        },
        (payload) => {
          console.log("🔔 Change detected:", payload);
          // 2. Refresh data immediately when DB changes
          fetchAppointments(); 
          fetchStats();
        }
      )
      .subscribe();

    // 3. Cleanup: Cut the connection when leaving
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userEmail, fetchAppointments]); // <--- DEPENDENCY UPDATED



  // --- 4. Actions ---

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Annuler ce rendez-vous ?')) return;

    const { error } = await supabase.from('appointments').update({ status: 'cancelled' }).eq('id', id);
    if (error) {
      alert("Erreur lors de l'annulation");
    } else {
      fetchAppointments(); // Refresh list
      fetchStats(); // Refresh counts
    }
  };

  // --- 5. Render Helpers ---

  const getStatusBadge = (apt) => {
    if (apt.status === 'cancelled') return { label: 'Annulé', style: 'text-red-400 bg-red-400/10 border-red-400/20' };
    
    const isPast = new Date(toIsoString(apt.end_time)) < new Date();
    if (isPast) return { label: 'Terminé', style: 'text-green-400 bg-green-400/10 border-green-400/20' };
    
    return { label: 'Confirmé', style: 'text-amber-400 bg-amber-400/10 border-amber-400/20' };
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-200 font-sans">
      {/* --- Navbar --- */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#1a1a1a]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-serif text-amber-500 tracking-wide">Barber Admin</h1>
            <p className="text-xs text-gray-500">{userEmail}</p>
          </div>
          <button onClick={handleLogout} className="text-sm text-gray-400 hover:text-white transition">
            Déconnexion
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* --- KPI Cards --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total" value={stats.total} />
          <StatCard label="À venir" value={stats.upcoming} active color="text-amber-400" />
          <StatCard label="Terminés" value={stats.completed} color="text-green-400" />
          <StatCard label="Annulés" value={stats.cancelled} color="text-red-400" />
        </div>

        {/* --- Filter Tabs --- */}
        <div className="flex gap-2 mb-6 border-b border-white/5 pb-1 overflow-x-auto">
          {['all','upcoming', 'completed', 'cancelled'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                filter === f 
                  ? 'bg-white/5 text-amber-400 border-b-2 border-amber-400' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {f === 'all' ? 'Tous' : f === 'completed' ? 'Terminés' : f === 'cancelled' ? 'Annulés' : f === 'upcoming' ? 'À Venir' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* --- List Content --- */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-white">
            {filter === 'upcoming' ? 'Prochains Rendez-vous' : 'Liste des Rendez-vous'}
          </h2>
          <button onClick={() => { fetchAppointments(); fetchStats(); }} className="p-2 text-gray-400 hover:text-white" title="Refresh">
            🔄
          </button>
        </div>

        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map(i => <div key={i} className="h-24 bg-white/5 rounded-xl" />)}
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-xl border border-white/5">
            <p className="text-gray-500">Aucun rendez-vous dans cette catégorie.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {appointments.map((apt) => {
              const badge = getStatusBadge(apt);
              // We calculate date parts for the "Calendar Box" on the left
              const dateObj = new Date(toIsoString(apt.start_time));
              const dayName = dateObj.toLocaleDateString('fr-FR', { weekday: 'short' }); // "sam."
              const dayNumber = dateObj.getDate(); // "31"
              
              return (
                <div key={apt.id} className="group bg-[#252525] hover:bg-[#2a2a2a] border border-white/5 rounded-xl p-5 transition-all">
                  <div className="flex justify-between items-start">
                    
                    {/* Left: Calendar Box & Info */}
                    <div className="flex gap-4">
                      {/* Visual Calendar Box */}
                      <div className="hidden sm:flex flex-col items-center justify-center w-16 h-16 bg-black/40 rounded-lg border border-white/5 text-center shrink-0">
                         <span className="text-[10px] uppercase text-gray-500 font-bold">{dayName}</span>
                         <span className="text-xl font-serif text-white">{dayNumber}</span>
                      </div>
                      
                      {/* Text Info */}
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-white font-medium text-lg">{apt.customer_name}</h3>
                          <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border ${badge.style}`}>
                            {badge.label}
                          </span>
                        </div>
                        
                        {/* THE NEW DATE SECTION */}
                        <div className="text-amber-500/90 text-sm font-medium mb-1">
                          📅 {formatDate(apt.start_time)}
                        </div>

                        <div className="text-gray-400 text-sm space-y-0.5">
                          <p className="flex items-center gap-2">
                             <span>✂️ {apt.service_type}</span>
                             <span className="text-gray-700">|</span> 
                             <span className="text-gray-300">🕐 {formatTime(apt.start_time)} - {formatTime(apt.end_time)}</span>
                          </p>
                          <p className="text-xs text-gray-500">📞 {apt.customer_phone}</p>
                        </div>
                      </div>
                    </div>

                    {/* Right: Price & Actions */}
                    <div className="flex flex-col items-end gap-2 pl-2">
                       <span className="text-white font-mono font-bold text-lg">€{apt.price}</span>
                       {apt.status !== 'cancelled' && (
                         <button 
                           onClick={() => handleCancel(apt.id)}
                           className="text-xs text-red-400/50 hover:text-red-400 hover:bg-red-400/10 px-2 py-1 rounded transition-colors"
                         >
                           Annuler
                         </button>
                       )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  )
}

// Simple Sub-component for Stats
function StatCard({ label, value, color = "text-white", active = false }) {
  return (
    <div className={`p-4 rounded-xl border ${active ? 'bg-amber-500/10 border-amber-500/30' : 'bg-white/5 border-white/5'}`}>
      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</div>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
    </div>
  )
}