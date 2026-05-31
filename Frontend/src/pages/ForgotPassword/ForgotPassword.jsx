import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RiMailLine, RiCameraLensLine } from 'react-icons/ri'
import authService from '../../services/authService.js'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!email.trim()) {
      return setError('Informe um e-mail válido para continuar.')
    }

    try {
      setLoading(true)
      const data = await authService.forgotPassword(email.trim())
      setSuccess(data.mensagem || 'Solicitação enviada com sucesso. Verifique sua caixa de entrada.')
      setEmail('')
    } catch (err) {
      setError(err.response?.data?.erro || err.message || 'Não foi possível enviar a solicitação.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-surface">
      <div className="hidden lg:flex flex-col justify-between p-12 bg-surface-card border-r border-surface-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #2563EB 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/30">
            <RiCameraLensLine size={20} className="text-white" />
          </div>
          <span className="font-display font-bold text-slate-100 text-xl">Remember Me</span>
        </div>

        <div className="relative">
          <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase mb-6">Recuperação de Acesso</p>
          <h1 className="font-display font-bold text-5xl text-slate-100 leading-tight mb-6">
            Recuperação<br />de acesso fácil<br />e segura.
          </h1>
          <p className="text-surface-subtle text-lg leading-relaxed max-w-md">
            Informe seu e-mail para receber instruções de redefinição de senha e voltar a acessar o sistema.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md animate-slide-in">
          <div className="mb-8">
            <h2 className="font-display font-bold text-3xl text-slate-100 mb-2">Esqueci minha senha</h2>
            <p className="text-surface-subtle">Digite o e-mail cadastrado para receber orientações.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {success && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-300 text-sm">
                {success}
              </div>
            )}

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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="rm-input pl-10"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/20 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Enviando...' : 'Enviar instruções'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-surface-subtle">
            Lembrou sua senha?{' '}
            <Link to="/login" className="text-brand-400 font-medium hover:text-brand-300 transition-colors">
              Voltar ao login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
