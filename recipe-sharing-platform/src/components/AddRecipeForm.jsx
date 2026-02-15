import { useMemo, useState } from 'react'

export default function AddRecipeForm() {
  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [steps, setSteps] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const ingredientItems = useMemo(() => {
    return ingredients
      .split('\n')
      .map((x) => x.trim())
      .filter(Boolean)
  }, [ingredients])

  const errors = useMemo(() => {
    const e = {}
    if (!title.trim()) e.title = 'Title is required'
    if (!ingredients.trim()) e.ingredients = 'Ingredients are required'
    if (!steps.trim()) e.steps = 'Preparation steps are required'
    if (ingredients.trim() && ingredientItems.length < 2) e.ingredients = 'Add at least 2 ingredients'
    return e
  }, [title, ingredients, steps, ingredientItems.length])

  const isValid = Object.keys(errors).length === 0

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    if (!isValid) return

    const payload = {
      title: title.trim(),
      ingredients: ingredientItems,
      steps: steps.trim(),
    }

    console.log(payload)

    setTitle('')
    setIngredients('')
    setSteps('')
    setSubmitted(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md md:p-8">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Add Recipe</h1>
        <p className="mt-2 text-sm text-gray-600 md:text-base">Submit a new recipe using the form below.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-800">Recipe Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              placeholder="Recipe title"
            />
            {submitted && errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-800">Ingredients</label>
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                rows={10}
                className="mt-2 w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                placeholder={'One ingredient per line\nEggs\nMilk'}
              />
              {submitted && errors.ingredients && <p className="mt-2 text-sm text-red-600">{errors.ingredients}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800">Preparation Steps</label>
              <textarea
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                rows={10}
                className="mt-2 w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                placeholder={'Write the preparation steps'}
              />
              {submitted && errors.steps && <p className="mt-2 text-sm text-red-600">{errors.steps}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
