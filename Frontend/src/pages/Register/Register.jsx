import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RiMailLine, RiLockLine, RiUserLine, RiEyeLine, RiEyeOffLine, RiCameraLensLine } from 'react-icons/ri'
import authService from '../../services/authService.js'

export default function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({ nome: '', email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await authService.register(form.email, form.password, form.nome)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.erro || err.response?.data?.message || 'Erro ao registrar usuário.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-surface">
      {/* Left — branding */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-surface-card border-r border-surface-border relative overflow-hidden">
        {/* bg grid decoration */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #2563EB 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-700/10 rounded-full blur-3xl" />

        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/30">
            <RiCameraLensLine size={20} className="text-white" />
          </div>
          <span className="font-display font-bold text-slate-100 text-xl">Remember Me</span>
        </div>

        <div className="relative">
          <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase mb-6">Studio Premium</p>
          <h1 className="font-display font-bold text-5xl text-slate-100 leading-tight mb-6">
            Criar sua conta<br />e começar a usar<br />
            <span className="text-brand-400">o Remember Me.</span>
          </h1>
          <p className="text-surface-subtle text-lg leading-relaxed max-w-md">
            Gerencie seus agendamentos e clientes com o melhor sistema para estúdios fotográficos.
          </p>
        </div>

        <div className="relative flex items-center gap-6">
          {[['247', 'Clientes'], ['1.2k', 'Ensaios'], ['4.9★', 'Avaliação']].map(([val, label]) => (
            <div key={label}>
              <p className="font-display font-bold text-2xl text-slate-100">{val}</p>
              <p className="text-surface-subtle text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md animate-slide-in">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center">
              <RiCameraLensLine size={18} className="text-white" />
            </div>
            <span className="font-display font-bold text-slate-100 text-lg">Remember Me</span>
          </div>

          <div className="mb-8">
            <h2 className="font-display font-bold text-3xl text-slate-100 mb-2">Criar Conta</h2>
            <p className="text-surface-subtle">Preencha os dados para se registrar na plataforma.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Nome Completo</label>
              <div className="relative">
                <RiUserLine size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-subtle" />
                <input
                  type="text"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  placeholder="Seu nome completo"
                  required
                  className="rm-input pl-10"
                />
              </div>
            </div>

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

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/20 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Registrando...
                </>
              ) : 'Registrar'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-surface-subtle">
            Já tem conta?{' '}
            <Link to="/login" className="text-brand-400 font-medium hover:text-brand-300 transition-colors">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
