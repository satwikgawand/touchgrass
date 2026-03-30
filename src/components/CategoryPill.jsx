const categoryStyles = {
  social: 'border-blue-500/60 text-blue-400 bg-blue-500/10',
  body: 'border-green-500/60 text-green-400 bg-green-500/10',
  mind: 'border-purple-500/60 text-purple-400 bg-purple-500/10',
  skill: 'border-amber-500/60 text-amber-400 bg-amber-500/10',
  chaos: 'border-red-500/60 text-red-400 bg-red-500/10',
}

export default function CategoryPill({ category }) {
  const style = categoryStyles[category] || 'border-gray-500/60 text-gray-400 bg-gray-500/10'
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded border text-xs font-mono font-medium tracking-widest uppercase ${style}`}
    >
      {category}
    </span>
  )
}
