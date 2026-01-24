import { Link } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'

export default function RecommendationsList() {
  const recommendations = useRecipeStore((s) => s.recommendations)
  const generateRecommendations = useRecipeStore((s) => s.generateRecommendations)

  return (
    <div className="stack">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <h2 className="cardTitle" style={{ margin: 0 }}>Recommendations</h2>
        <button className="btnSecondary" onClick={generateRecommendations}>Refresh</button>
      </div>

      {!recommendations || recommendations.length === 0 ? (
        <div className="item"><div>No recommendations available</div></div>
      ) : (
        <div className="list">
          {recommendations.map((r) => (
            <div className="item" key={r.id}>
              <div>
                <h3 className="itemTitle">{r.title}</h3>
                <p className="itemDesc">{r.description}</p>
                <div className="badgeRow">
                  <Link className="link" to={`/recipes/${r.id}`}>Open</Link>
                  <span className="badge">{r.prepTime} min</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
