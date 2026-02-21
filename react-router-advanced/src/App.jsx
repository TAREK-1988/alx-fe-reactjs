import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Blog from "./components/Blog.jsx";
import BlogPost from "./components/BlogPost.jsx";

import Profile from "./components/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
        <h1>React Router Advanced</h1>

        <nav style={{ display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/profile/details">Profile</Link>
          <Link to="/login">Login</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={<Login onLogin={() => setIsAuthenticated(true)} />}
          />

          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />

          <Route
            path="/profile/*"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile onLogout={() => setIsAuthenticated(false)} />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
