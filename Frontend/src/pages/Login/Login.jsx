import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine, RiCameraLensLine } from 'react-icons/ri'
import { useAuth } from '../../hooks/useAuth.js'
import loginjpg from '../../assets/login.jpg'

export default function Login() {
  const { login, loading } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(form.email, form.password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.erro || err.response?.data?.message || 'E-mail ou senha incorretos.')
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-surface">
      {/* Left — branding */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-slate-950 border-r border-slate-800 relative overflow-hidden">
        {/* bg grid decoration */}
                <div className="absolute inset-0"
          style={{ 
            backgroundImage: `linear-gradient(90deg, rgba(15,23,42,.92), rgba(15,23,42,.68)), url(${loginjpg})`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }} 
        />

        <div className="relative">
          <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase mb-6">Studio Premium</p>
          <h1 className="font-display font-bold text-5xl text-white leading-tight mb-6">
            Transformando<br />momentos em<br />
            <span className="text-brand-400">memórias eternas.</span>
          </h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-md">
            Sistema completo de gestão para estúdios fotográficos — clientes, agendamentos, profissionais e muito mais.
          </p>
        </div>

        <div className="relative flex items-center gap-6">
          {[['247', 'Clientes'], ['1.2k', 'Ensaios'], ['4.9★', 'Avaliação']].map(([val, label]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur">
              <p className="font-display font-bold text-2xl text-white">{val}</p>
              <p className="text-white/70 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md animate-slide-in bg-white border border-surface-border rounded-2xl shadow-xl shadow-slate-200/70 p-8">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center">
              <RiCameraLensLine size={18} className="text-white" />
            </div>
            <span className="font-display font-bold text-slate-100 text-lg">Remember Me</span>
          </div>

          <div className="mb-8">
            <h2 className="font-display font-bold text-3xl text-slate-100 mb-2">Bem-vindo de volta</h2>
            <p className="text-surface-subtle">Entre com suas credenciais para acessar o studio.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">E-mail</label>
              <div className="relative">
                <RiMailLine size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-subtle" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  required
                  className="rm-input pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Senha</label>
              <div className="relative">
                <RiLockLine size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-subtle" />
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="rm-input pl-10 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-surface-subtle hover:text-slate-300 transition-colors"
                >
                  {showPass ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded bg-surface border-surface-border accent-brand-500" />
                <span className="text-sm text-surface-subtle">Lembrar-me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-brand-600 hover:text-brand-700 transition-colors">
                Esqueci minha senha
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/20 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Entrando...
                </>
              ) : 'Entrar'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-surface-subtle">
            Não tem acesso?{' '}
            <Link to="/request-access" className="text-brand-600 font-medium hover:text-brand-700 transition-colors">
              Solicite ao administrador
            </Link>
            {' '}ou{' '}
            <Link to="/register" className="text-brand-600 font-medium hover:text-brand-700 transition-colors">
              crie sua conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
