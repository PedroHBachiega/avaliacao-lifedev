import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { AuthProvider } from './context/AuthContext'
import { auth } from './firebase/config'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import CreatePost from './pages/CreatePost/CreatePost'
import EditPost from './pages/EditPost/EditPost'
import Post from './pages/Post/Post'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import Profile from './pages/Profile/Profile'
import './App.css'

function App() {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
 
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

 
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Alternar entre temas claro e escuro
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="theme-toggle">
            <button onClick={toggleTheme} className="theme-btn">
              {theme === "light" ? "🌙 Modo Escuro" : "☀️ Modo Claro"}
            </button>
          </div>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/login" 
                element={!user ? <Login /> : <Navigate to="/dashboard" />} 
              />
              <Route 
                path="/register" 
                element={!user ? <Register /> : <Navigate to="/dashboard" />} 
              />
              <Route 
                path="/reset-password" 
                element={<ResetPassword />} 
              />
              <Route 
                path="/dashboard" 
                element={user ? <Dashboard /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/profile" 
                element={user ? <Profile /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/posts/create" 
                element={user ? <CreatePost /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/posts/:id" 
                element={user ? <Post /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/posts/edit/:id" 
                element={user ? <EditPost /> : <Navigate to="/login" />} 
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
