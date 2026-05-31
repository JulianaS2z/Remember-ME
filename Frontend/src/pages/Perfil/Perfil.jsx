import { useState } from 'react'
import { RiUserLine, RiMailLine, RiLockLine, RiSaveLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri'
import { useAuth } from '../../hooks/useAuth.js'
import authService from '../../services/authService.js'

export default function Perfil() {
  const { user, refreshUser } = useAuth()
  const [tab, setTab] = useState('info')
  const [form, setForm] = useState({ nome: user?.nome || '', email: user?.email || '' })
  const [passForm, setPassForm] = useState({ senhaAtual: '', novaSenha: '', confirmar: '' })
  const [showPass, setShowPass] = useState({ atual: false, nova: false, conf: false })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState({ type: '', text: '' })

  const handleInfo = async (e) => {
    e.preventDefault()
    setSaving(true); setMsg({})
    try {
      await authService.updateProfile(form)
      await refreshUser()
      setMsg({ type: 'ok', text: 'Perfil atualizado com sucesso!' })
    } catch (err) {
      setMsg({ type: 'err', text: err.response?.data?.erro || err.response?.data?.message || 'Erro ao atualizar.' })
    } finally { setSaving(false) }
  }

  const handlePass = async (e) => {
    e.preventDefault()
    if (passForm.novaSenha !== passForm.confirmar) return setMsg({ type: 'err', text: 'As senhas não conferem.' })
    if (passForm.novaSenha.length < 6) return setMsg({ type: 'err', text: 'A nova senha deve ter pelo menos 6 caracteres.' })
    setSaving(true); setMsg({})
    try {
      await authService.changePassword({ senhaAtual: passForm.senhaAtual, novaSenha: passForm.novaSenha })
      setPassForm({ senhaAtual: '', novaSenha: '', confirmar: '' })
      setMsg({ type: 'ok', text: 'Senha alterada com sucesso!' })
    } catch (err) {
      setMsg({ type: 'err', text: err.response?.data?.erro || err.response?.data?.message || 'Erro ao alterar senha.' })
    } finally { setSaving(false) }
  }

  const toggleShow = (field) => setShowPass(p => ({ ...p, [field]: !p[field] }))

  return (
    <div className="max-w-2xl space-y-6">
      {/* Avatar card */}
      <div className="rm-card p-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-brand-500/20 text-brand-400 font-display font-bold text-2xl flex items-center justify-center flex-shrink-0">
          {user?.nome?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <div>
          <p className="font-display font-bold text-xl text-slate-100">{user?.nome || 'Usuário'}</p>
          <p className="text-surface-subtle text-sm">{user?.email || ''}</p>
          <span className="rm-badge status-ativo mt-1 text-xs">Conta Premium</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-card border border-surface-border rounded-xl p-1">
        {[['info', 'Informações'], ['senha', 'Senha']].map(([t, l]) => (
          <button
            key={t}
            onClick={() => { setTab(t); setMsg({}) }}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${tab === t ? 'bg-brand-500 text-white' : 'text-surface-subtle hover:text-slate-200'}`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Feedback message */}
      {msg.text && (
        <div className={`p-4 rounded-xl text-sm border ${msg.type === 'ok' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
          {msg.text}
        </div>
      )}

      {/* Info tab */}
      {tab === 'info' && (
        <form onSubmit={handleInfo} className="rm-card p-6 space-y-5">
          <h2 className="font-display font-semibold text-slate-100">Informações Pessoais</h2>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Nome</label>
            <div className="relative">
              <RiUserLine size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-subtle" />
              <input value={form.nome} onChange={e => setForm(f => ({ ...f, nome: e.target.value }))} placeholder="Seu nome" className="rm-input pl-10" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">E-mail</label>
            <div className="relative">
              <RiMailLine size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-subtle" />
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="email@exemplo.com" className="rm-input pl-10" />
            </div>
          </div>
          <button type="submit" disabled={saving} className="rm-btn-primary">
            <RiSaveLine size={16} />
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </form>
      )}

      {/* Password tab */}
      {tab === 'senha' && (
        <form onSubmit={handlePass} className="rm-card p-6 space-y-5">
          <h2 className="font-display font-semibold text-slate-100">Alterar Senha</h2>
          {[
            ['senhaAtual', 'Senha Atual', 'atual'],
            ['novaSenha', 'Nova Senha', 'nova'],
            ['confirmar', 'Confirmar Nova Senha', 'conf'],
          ].map(([field, label, showKey]) => (
            <div key={field}>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
              <div className="relative">
                <RiLockLine size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-subtle" />
                <input
                  type={showPass[showKey] ? 'text' : 'password'}
                  value={passForm[field]}
                  onChange={e => setPassForm(f => ({ ...f, [field]: e.target.value }))}
                  required
                  placeholder="••••••••"
                  className="rm-input pl-10 pr-12"
                />
                <button type="button" onClick={() => toggleShow(showKey)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-surface-subtle hover:text-slate-300 transition-colors">
                  {showPass[showKey] ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
                </button>
              </div>
            </div>
          ))}
          <button type="submit" disabled={saving} className="rm-btn-primary">
            <RiSaveLine size={16} />
            {saving ? 'Salvando...' : 'Alterar Senha'}
          </button>
        </form>
      )}
    </div>
  )
}
