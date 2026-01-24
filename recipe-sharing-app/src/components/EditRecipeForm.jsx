import { useMemo, useState } from 'react'
import { useRecipeStore } from './recipeStore'

export default function EditRecipeForm({ recipe }) {
  const updateRecipe = useRecipeStore((s) => s.updateRecipe)

  const [title, setTitle] = useState(recipe.title)
  const [description, setDescription] = useState(recipe.description)
  const [ingredientsText, setIngredientsText] = useState((recipe.ingredients || []).join(', '))
  const [prepTime, setPrepTime] = useState(String(recipe.prepTime ?? 0))

  const canSubmit = useMemo(() => title.trim().length > 0 && description.trim().length > 0, [title, description])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!canSubmit) return

    const ingredients = ingredientsText
      .split(',')
      .map((x) => x.trim())
      .filter((x) => x.length > 0)

    const parsedPrep = Number(prepTime)

    updateRecipe({
      id: recipe.id,
      title: title.trim(),
      description: description.trim(),
      ingredients,
      prepTime: Number.isFinite(parsedPrep) ? parsedPrep : 0
    })
  }

  return (
    <form className="stack" onSubmit={handleSubmit}>
      <input className="input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea className="textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input
        className="input"
        type="text"
        value={ingredientsText}
        onChange={(e) => setIngredientsText(e.target.value)}
        placeholder="Ingredients (comma separated)"
      />
      <input className="input" type="number" value={prepTime} onChange={(e) => setPrepTime(e.target.value)} placeholder="Prep time (minutes)" />
      <button className="btn" type="submit" disabled={!canSubmit}>Save Changes</button>
    </form>
  )
}
