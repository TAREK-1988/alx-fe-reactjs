import { create } from 'zustand'

const normalizeRecipe = (r) => {
  const ingredients = Array.isArray(r.ingredients) ? r.ingredients : []
  const prepTime = Number.isFinite(r.prepTime) ? r.prepTime : 0
  return {
    id: r.id,
    title: String(r.title ?? '').trim(),
    description: String(r.description ?? '').trim(),
    ingredients,
    prepTime
  }
}

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [],
  recommendations: [],

  setRecipes: (recipes) => {
    const normalized = (recipes ?? []).map(normalizeRecipe).filter((r) => r.title.length > 0 && r.id != null)
    set({ recipes: normalized })
    get().filterRecipes()
    get().generateRecommendations()
  },

  addRecipe: (newRecipe) => {
    const recipe = normalizeRecipe(newRecipe)
    if (!recipe.title || recipe.id == null) return
    set((state) => ({ recipes: [...state.recipes, recipe] }))
    get().filterRecipes()
    get().generateRecommendations()
  },

  deleteRecipe: (recipeId) => {
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== recipeId),
      favorites: state.favorites.filter((id) => id !== recipeId)
    }))
    get().filterRecipes()
    get().generateRecommendations()
  },

  updateRecipe: (updatedRecipe) => {
    const recipe = normalizeRecipe(updatedRecipe)
    if (recipe.id == null) return
    set((state) => ({
      recipes: state.recipes.map((r) => (r.id === recipe.id ? recipe : r))
    }))
    get().filterRecipes()
    get().generateRecommendations()
  },

  setSearchTerm: (term) => {
    set({ searchTerm: String(term ?? '') })
    get().filterRecipes()
  },

  filterRecipes: () => {
    const { recipes, searchTerm } = get()
    const t = searchTerm.trim().toLowerCase()
    if (!t) {
      set({ filteredRecipes: recipes })
      return
    }
    const filtered = recipes.filter((r) => {
      const inTitle = r.title.toLowerCase().includes(t)
      const inIngredients = (r.ingredients || []).some((x) => String(x).toLowerCase().includes(t))
      const prepMatch = String(r.prepTime).includes(t)
      return inTitle || inIngredients || prepMatch
    })
    set({ filteredRecipes: filtered })
  },

  addFavorite: (recipeId) => {
    const { favorites, recipes } = get()
    const existsRecipe = recipes.some((r) => r.id === recipeId)
    if (!existsRecipe) return
    if (favorites.includes(recipeId)) return
    set({ favorites: [...favorites, recipeId] })
    get().generateRecommendations()
  },

  removeFavorite: (recipeId) => {
    set((state) => ({ favorites: state.favorites.filter((id) => id !== recipeId) }))
    get().generateRecommendations()
  },

  generateRecommendations: () => {
    const { recipes, favorites } = get()
    if (favorites.length === 0) {
      const recommended = recipes.slice(0, 3)
      set({ recommendations: recommended })
      return
    }
    const favoriteRecipes = recipes.filter((r) => favorites.includes(r.id))
    const favoriteIngredients = new Set(favoriteRecipes.flatMap((r) => r.ingredients || []).map((x) => String(x).toLowerCase()))
    const recommended = recipes
      .filter((r) => !favorites.includes(r.id))
      .map((r) => {
        const score = (r.ingredients || []).reduce((acc, x) => acc + (favoriteIngredients.has(String(x).toLowerCase()) ? 1 : 0), 0)
        return { recipe: r, score }
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((x) => x.recipe)

    set({ recommendations: recommended })
  }
}))
