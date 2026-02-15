import { useMemo, useState } from 'react'

export default function AddRecipeForm() {
  const [title, setTitle] = useState('')
  const [ingredientsText, setIngredientsText] = useState('')
  const [stepsText, setStepsText] = useState('')
  const [touched, setTouched] = useState(false)
  const [success, setSuccess] = useState(false)

  const ingredients = useMemo(() => {
    return ingredientsText
      .split('\n')
      .map((x) => x.trim())
      .filter(Boolean)
  }, [ingredientsText])

  const steps = useMemo(() => {
    return stepsText
      .split('\n')
      .map((x) => x.trim())
      .filter(Boolean)
  }, [stepsText])

  const errors = useMemo(() => {
    const e = {}
    if (!title.trim()) e.title = 'Title is required.'
    if (!ingredientsText.trim()) e.ingredients = 'Ingredients are required.'
    if (!stepsText.trim()) e.steps = 'Preparation steps are required.'
    if (ingredientsText.trim() && ingredients.length < 2) e.ingredients = 'Add at least 2 ingredients (one per line).'
    if (stepsText.trim() && steps.length < 2) e.steps = 'Add at least 2 steps (one per line).'
    return e
  }, [title, ingredientsText, stepsText, ingredients.length, steps.length])

  const isValid = Object.keys(errors).length === 0

  const reset = () => {
    setTitle('')
    setIngredientsText('')
    setStepsText('')
    setTouched(false)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setTouched(true)
    setSuccess(false)

    if (!isValid) return

    const payload = {
      title: title.trim(),
      ingredients,
      steps,
    }

    console.log('New Recipe Payload:', payload)

    setSuccess(true)
    reset()
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Add New Recipe</h1>
        <p className="mt-2 text-sm text-gray-600">Fill in the title, ingredients, and steps.</p>

        {success && (
          <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            Recipe submitted successfully.
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Recipe Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="e.g. Pancakes"
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
            />
            {touched && errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Ingredients</label>
              <textarea
                value={ingredientsText}
                onChange={(e) => setIngredientsText(e.target.value)}
                onBlur={() => setTouched(true)}
                rows={10}
                placeholder={'One ingredient per line\nFlour\nEggs\nMilk'}
                className="mt-2 w-full resize-y rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
              />
              {touched && errors.ingredients && <p className="mt-2 text-sm text-red-600">{errors.ingredients}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Preparation Steps</label>
              <textarea
                value={stepsText}
                onChange={(e) => setStepsText(e.target.value)}
                onBlur={() => setTouched(true)}
                rows={10}
                placeholder={'One step per line\nPreheat pan\nMix ingredients\nCook'}
                className="mt-2 w-full resize-y rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
              />
              {touched && errors.steps && <p className="mt-2 text-sm text-red-600">{errors.steps}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-gray-500">Required fields and minimum 2 lines for ingredients and steps.</div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
              disabled={touched && !isValid}
            >
              Submit Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
