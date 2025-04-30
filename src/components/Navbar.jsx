import styles from './Navbar.module.css'
import { NavLink } from "react-router-dom"
import { useAuthValue } from '../context/AuthContext'
import { useAuthentication } from '../hooks/useAuthentication'

const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles.links_list}>
          <NavLink to="/" className={({isActive}) => (isActive ? `${styles.brand} ${styles.active}` : styles.brand)}>
            <li><span>Life</span>Dev</li>
          </NavLink>
          {!user && (
            <>
              <NavLink to="/login" className={({isActive}) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}>
                <li>Login</li>
              </NavLink>
              <NavLink to="/register" className={({isActive}) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}>
                <li>Register</li>
              </NavLink>
            </>
          )}
          {user && (
            <>
              <NavLink to="/dashboard" className={({isActive}) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}>
                <li>Dashboard</li>
              </NavLink>
              <NavLink to="/posts/create" className={({isActive}) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}>
                <li>Criar Post</li>
              </NavLink>
              <li className={styles.user_name}>Olá, {user.displayName}</li>
              <button onClick={logout} className={styles.exit}>Sair</button>
            </>
          )}
        </ul>
      </nav>
    </>
  )
}

export default Navbar