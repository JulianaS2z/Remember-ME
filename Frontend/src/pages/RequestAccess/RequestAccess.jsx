import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RiMailLine, RiUserLine, RiPhoneLine, RiMessage3Line, RiCameraLensLine } from 'react-icons/ri'
import authService from '../../services/authService.js'

export default function RequestAccess() {
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', mensagem: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!form.nome.trim() || !form.email.trim() || !form.mensagem.trim()) {
      return setError('Nome, e-mail e mensagem são obrigatórios.')
    }

    try {
      setLoading(true)
      const data = await authService.requestAccess({
        nome: form.nome.trim(),
        email: form.email.trim(),
        telefone: form.telefone.trim(),
        mensagem: form.mensagem.trim(),
      })

      setSuccess(data.mensagem || 'Solicitação enviada ao administrador com sucesso.')
      setForm({ nome: '', email: '', telefone: '', mensagem: '' })
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
          <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase mb-6">Acesso Administrativo</p>
          <h1 className="font-display font-bold text-5xl text-slate-100 leading-tight mb-6">
            Solicite acesso<br />ao administrador e<br />faça parte do studio.
          </h1>
          <p className="text-surface-subtle text-lg leading-relaxed max-w-md">
            Informe seus dados e envie uma mensagem para que o time administrativo autorize seu acesso.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md animate-slide-in">
          <div className="mb-8">
            <h2 className="font-display font-bold text-3xl text-slate-100 mb-2">Solicitar acesso</h2>
            <p className="text-surface-subtle">Preencha os campos abaixo para enviar sua solicitação.</p>
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
              <label className="block text-sm font-medium text-slate-300 mb-2">Nome</label>
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
              <label className="block text-sm font-medium text-slate-300 mb-2">Telefone</label>
              <div className="relative">
                <RiPhoneLine size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-subtle" />
                <input
                  type="tel"
                  name="telefone"
                  value={form.telefone}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                  className="rm-input pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Mensagem</label>
              <div className="relative">
                <RiMessage3Line size={18} className="absolute left-3.5 top-3 text-surface-subtle" />
                <textarea
                  name="mensagem"
                  value={form.mensagem}
                  onChange={handleChange}
                  placeholder="Explique por que precisa de acesso administrativo"
                  required
                  className="rm-input pl-10 min-h-[140px] resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/20 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Enviando...' : 'Enviar Solicitação'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-surface-subtle">
            Já tem acesso?{' '}
            <Link to="/login" className="text-brand-400 font-medium hover:text-brand-300 transition-colors">
              Voltar ao login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
