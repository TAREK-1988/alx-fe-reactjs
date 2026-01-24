import { Link } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'

export default function FavoritesList() {
  const recipes = useRecipeStore((s) => s.recipes)
  const favoritesIds = useRecipeStore((s) => s.favorites)
  const removeFavorite = useRecipeStore((s) => s.removeFavorite)

  const favorites = favoritesIds
    .map((id) => recipes.find((r) => r.id === id))
    .filter(Boolean)

  return (
    <div className="stack">
      <h2 className="cardTitle">My Favorites</h2>
      {favorites.length === 0 ? (
        <div className="item"><div>No favorites yet</div></div>
      ) : (
        <div className="list">
          {favorites.map((r) => (
            <div className="item" key={r.id}>
              <div>
                <h3 className="itemTitle">{r.title}</h3>
                <p className="itemDesc">{r.description}</p>
                <div className="badgeRow">
                  <Link className="link" to={`/recipes/${r.id}`}>Open</Link>
                  <span className="badge">{r.prepTime} min</span>
                </div>
              </div>
              <div className="row">
                <button className="btnSecondary" onClick={() => removeFavorite(r.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
