import { useEffect } from 'react'
import { RiCloseLine } from 'react-icons/ri'

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm animate-fade-in" />

      {/* panel */}
      <div className={`relative w-full ${sizes[size]} bg-surface-card border border-surface-border rounded-2xl shadow-2xl animate-scale-in`}>
        {/* header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-surface-border">
          <h2 className="text-lg font-semibold text-slate-100 font-display">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-surface-subtle hover:text-slate-300 hover:bg-surface-hover rounded-xl transition-colors"
          >
            <RiCloseLine size={20} />
          </button>
        </div>

        {/* body */}
        <div className="px-6 py-5 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
