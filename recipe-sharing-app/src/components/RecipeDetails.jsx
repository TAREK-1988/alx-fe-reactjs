import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'
import EditRecipeForm from './EditRecipeForm'
import DeleteRecipeButton from './DeleteRecipeButton'

export default function RecipeDetails() {
  const params = useParams()
  const recipeId = useMemo(() => {
    const n = Number(params.id)
    return Number.isFinite(n) ? n : params.id
  }, [params.id])

  const recipe = useRecipeStore((s) => s.recipes.find((r) => r.id === recipeId))
  const favorites = useRecipeStore((s) => s.favorites)
  const addFavorite = useRecipeStore((s) => s.addFavorite)
  const removeFavorite = useRecipeStore((s) => s.removeFavorite)

  if (!recipe) {
    return (
      <div className="page">
        <div className="card">
          <h1 className="title">Recipe Not Found</h1>
          <Link className="link" to="/">Back</Link>
        </div>
      </div>
    )
  }

  const isFav = favorites.includes(recipe.id)

  return (
    <div className="page">
      <div className="card">
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 className="title">{recipe.title}</h1>
            <p className="subtitle">{recipe.description}</p>
            <div className="badgeRow">
              <span className="badge">{recipe.prepTime} min</span>
              <span className="badge">{(recipe.ingredients || []).join(', ') || 'No ingredients'}</span>
            </div>
            <div className="badgeRow">
              <Link className="link" to="/">Back to Home</Link>
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
      </div>

      <div className="grid" style={{ marginTop: 14 }}>
        <div className="card">
          <h2 className="cardTitle">Edit Recipe</h2>
          <EditRecipeForm recipe={recipe} />
        </div>

        <div className="card">
          <h2 className="cardTitle">Delete</h2>
          <DeleteRecipeButton recipeId={recipe.id} />
        </div>
      </div>
    </div>
  )
}
