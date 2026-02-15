import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import data from '../data.json'

export default function RecipeDetail() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)

  useEffect(() => {
    const found = data.find((r) => String(r.id) === String(id))
    setRecipe(found || null)
  }, [id])

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-8">
          <h1 className="text-xl font-semibold text-gray-900">Recipe not found</h1>
          <p className="mt-2 text-sm text-gray-600">No recipe matches this id.</p>
          <Link to="/" className="mt-6 inline-flex rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            ← Back
          </Link>
          <div className="text-xs text-gray-500">ID: {recipe.id}</div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="h-56 w-full bg-gray-100 md:h-72">
            <img src={recipe.image} alt={recipe.title} className="h-full w-full object-cover" />
          </div>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{recipe.title}</h1>
            <p className="mt-3 text-sm text-gray-600 md:text-base">{recipe.summary}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">Ingredients</h2>
            <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-gray-700">
              {(recipe.ingredients || []).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">Instructions</h2>
            <p className="mt-4 whitespace-pre-line text-sm text-gray-700">{recipe.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
