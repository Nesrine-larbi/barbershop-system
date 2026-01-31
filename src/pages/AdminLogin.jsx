import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import bgVideo from '../assets/Book.mp4'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      })

      if (error) {
        setError('Email ou mot de passe incorrect')
        setIsLoading(false)
        return
      }

      // Successfully logged in
      console.log('Admin logged in:', data.user.email)
      navigate('/admin/dashboard')
    } catch (err) {
      console.error('Login error:', err)
      setError('Erreur de connexion. Réessayez.')
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="fixed inset-0 bg-black/80" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="bg-black/60 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-8 max-w-md w-full shadow-2xl">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif text-amber-400 tracking-wider mb-2">Admin</h1>
            <p className="text-white/50 text-sm tracking-wide uppercase">Panneau d'administration</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-200 text-sm backdrop-blur-md">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs font-light text-amber-400 tracking-[0.15em] uppercase mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg text-white placeholder-white/30 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-light text-amber-400 tracking-[0.15em] uppercase mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg text-white placeholder-white/30 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-linear-to-r from-amber-500 to-yellow-600 text-black font-semibold tracking-[0.15em] uppercase rounded-xl hover:from-amber-400 hover:to-yellow-500 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/30 mt-8"
            >
              {isLoading ? '⏳ Connexion...' : 'Se connecter'}
            </button>
          </form>

          {/* Back to Home */}
          <button
            onClick={() => navigate('/')}
            className="w-full mt-4 py-3 text-white/60 hover:text-white text-sm tracking-wide transition-colors"
          >
            ← Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  )
}
