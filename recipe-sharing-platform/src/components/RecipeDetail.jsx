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
      <div className="min-h-screen bg-gray-100 px-4 py-10">
        <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md md:p-8">
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Recipe not found</h1>
          <p className="mt-2 text-sm text-gray-600 md:text-base">No recipe matches this id.</p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-sm font-semibold text-blue-600 hover:underline">
            Back
          </Link>
          <span className="text-xs text-gray-500">ID: {recipe.id}</span>
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          <img src={recipe.image} alt={recipe.title} className="h-56 w-full object-cover md:h-72" />
          <div className="p-6 md:p-8">
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{recipe.title}</h1>
            <p className="mt-3 text-sm text-gray-700 md:text-base">{recipe.summary}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-md md:p-8">
            <h2 className="text-lg font-bold text-gray-900 md:text-xl">Ingredients</h2>
            <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-gray-700 md:text-base">
              {(recipe.ingredients || []).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md md:p-8">
            <h2 className="text-lg font-bold text-gray-900 md:text-xl">Instructions</h2>
            <p className="mt-4 whitespace-pre-line text-sm text-gray-700 md:text-base">
              {recipe.instructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
