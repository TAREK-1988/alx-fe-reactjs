import { useNavigate } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'

export default function DeleteRecipeButton({ recipeId }) {
  const navigate = useNavigate()
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe)

  const handleDelete = () => {
    deleteRecipe(recipeId)
    navigate('/', { replace: true })
  }

  return (
    <button className="btn" onClick={handleDelete}>
      Delete Recipe
    </button>
  )
}
