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
          <NavLink to="/" className={styles.brand} activeClassName={styles.active}>
            <li><span>Life</span>Dev</li>
          </NavLink>
          {!user && (
            <>
              <NavLink to="/login" className={styles.link} activeClassName={styles.active}>
                <li>Login</li>
              </NavLink>
              <NavLink to="/register" className={styles.link} activeClassName={styles.active}>
                <li>Register</li>
              </NavLink>
            </>
          )}
          {user && (
            <>
              <NavLink to="/dashboard" className={styles.link} activeClassName={styles.active}>
                <li>Dashboard</li>
              </NavLink>
              <NavLink to="/posts/create" className={styles.link} activeClassName={styles.active}>
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