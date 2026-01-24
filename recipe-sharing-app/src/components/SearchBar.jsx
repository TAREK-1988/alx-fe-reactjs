import { useRecipeStore } from './recipeStore'

export default function SearchBar() {
  const searchTerm = useRecipeStore((s) => s.searchTerm)
  const setSearchTerm = useRecipeStore((s) => s.setSearchTerm)

  return (
    <div className="stack">
      <input
        className="input"
        type="text"
        placeholder="Search by title, ingredient, or prep time..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="badgeRow">
        <span className="badge">Title</span>
        <span className="badge">Ingredients</span>
        <span className="badge">Prep Time</span>
      </div>
    </div>
  )
}
