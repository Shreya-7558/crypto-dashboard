export default function FavoriteStar({ active, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="toggle favorite"
      className={`p-1 rounded ${active ? 'text-yellow-500' : 'text-slate-400'} hover:text-yellow-500`}
    >
      {active ? '★' : '☆'}
    </button>
  )
}
