export default function Loading({ fullscreen = false, size = 'md' }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' }

  const spinner = (
    <div className={`${sizes[size]} border-2 border-surface-border border-t-brand-500 rounded-full animate-spin`} />
  )

  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-surface flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-surface-border border-t-brand-500 rounded-full animate-spin" />
          <span className="text-surface-subtle text-sm font-medium tracking-wide">Carregando...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center py-12">
      {spinner}
    </div>
  )
}
