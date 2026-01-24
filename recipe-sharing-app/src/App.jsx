import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useRecipeStore } from './components/recipeStore'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeList from './components/RecipeList'
import RecipeDetails from './components/RecipeDetails'
import SearchBar from './components/SearchBar'
import FavoritesList from './components/FavoritesList'
import RecommendationsList from './components/RecommendationsList'

function HomePage() {
  return (
    <div className="page">
      <div className="pageHeader">
        <h1 className="title">Recipe Sharing</h1>
        <p className="subtitle">Add, edit, delete, search, favorite, and get recommendations</p>
      </div>

      <div className="grid">
        <div className="card">
          <h2 className="cardTitle">Add Recipe</h2>
          <AddRecipeForm />
        </div>

        <div className="card">
          <h2 className="cardTitle">Search</h2>
          <SearchBar />
        </div>

        <div className="card span2">
          <h2 className="cardTitle">Recipes</h2>
          <RecipeList />
        </div>

        <div className="card">
          <FavoritesList />
        </div>

        <div className="card">
          <RecommendationsList />
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const setRecipes = useRecipeStore((s) => s.setRecipes)

  useEffect(() => {
    setRecipes([
      {
        id: 101,
        title: 'Chicken Shawarma Bowl',
        description: 'Quick bowl with chicken, rice, garlic sauce, and veggies',
        ingredients: ['chicken', 'rice', 'garlic', 'cucumber', 'tomato'],
        prepTime: 20
      },
      {
        id: 102,
        title: 'Pasta Arrabbiata',
        description: 'Spicy tomato pasta with garlic and chili',
        ingredients: ['pasta', 'tomato', 'garlic', 'chili'],
        prepTime: 25
      }
    ])
  }, [setRecipes])

  return (
    <BrowserRouter>
      <div className="appShell">
        <nav className="nav">
          <div className="navBrand">Recipe App</div>
          <div className="navLinks">
            <Link className="navLink" to="/">Home</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
