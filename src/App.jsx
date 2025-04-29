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
import './App.css'

function App() {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  // Verificar se o usuário está autenticado
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
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
                path="/dashboard" 
                element={user ? <Dashboard /> : <Navigate to="/login" />} 
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
