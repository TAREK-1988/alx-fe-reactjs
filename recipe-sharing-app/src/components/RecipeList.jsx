import { Link } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'

export default function RecipeList() {
  const filteredRecipes = useRecipeStore((s) => s.filteredRecipes)
  const favorites = useRecipeStore((s) => s.favorites)
  const addFavorite = useRecipeStore((s) => s.addFavorite)
  const removeFavorite = useRecipeStore((s) => s.removeFavorite)

  if (!filteredRecipes || filteredRecipes.length === 0) {
    return <div className="item"><div>No recipes found</div></div>
  }

  return (
    <div className="list">
      {filteredRecipes.map((recipe) => {
        const isFav = favorites.includes(recipe.id)
        return (
          <div className="item" key={recipe.id}>
            <div>
              <h3 className="itemTitle">{recipe.title}</h3>
              <p className="itemDesc">{recipe.description}</p>
              <div className="badgeRow">
                <span className="badge">{(recipe.ingredients || []).length} ingredients</span>
                <span className="badge">{recipe.prepTime} min</span>
                <Link className="link" to={`/recipes/${recipe.id}`}>Open</Link>
              </div>
            </div>

            <div className="row">
              {isFav ? (
                <button className="btnSecondary" onClick={() => removeFavorite(recipe.id)}>Unfavorite</button>
              ) : (
                <button className="btnSecondary" onClick={() => addFavorite(recipe.id)}>Favorite</button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
