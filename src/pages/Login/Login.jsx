import styles from './Login.module.css'
import { useEffect, useState } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const { 
        login, 
        loginWithGoogle, 
        loginWithFacebook, 
        loginWithTwitter, 
        loginWithGithub, 
        error: authError, 
        loading 
    } = useAuthentication()

    const handlerSubmit = async (e) => {
        e.preventDefault()

        setError("")
        const user = {
            email,
            password,
        }

        const res = await login(user)

        console.log(res)
    }

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle()
            navigate("/dashboard")
        } catch (error) {
            console.log(error)
        }
    }

    const handleFacebookLogin = async () => {
        try {
            await loginWithFacebook()
            navigate("/dashboard")
        } catch (error) {
            console.log(error)
        }
    }

    const handleTwitterLogin = async () => {
        try {
            await loginWithTwitter()
            navigate("/dashboard")
        } catch (error) {
            console.log(error)
        }
    }

    const handleGithubLogin = async () => {
        try {
            await loginWithGithub()
            navigate("/dashboard")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log(authError)
        if (authError) {
            setError(authError)
        }
    }, [authError])

    return (
        <div className={styles.login}>
            <h1>Entrar</h1>
            <p>Faça login em nossa plataforma de desenvolvedores</p>
            <form onSubmit={handlerSubmit}>
                <label>
                    <span>E-mail: </span>
                    <input
                        type='email'
                        name='email'
                        required
                        placeholder='E-mail do usuário'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </label>
                <label>
                    <span>Senha: </span>
                    <input
                        type='password'
                        name='password'
                        required
                        placeholder='Insira sua senha'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </label>
                {!loading && <button className='btn'>Entrar</button>}
                {loading && <button className='btn' disabled>Aguarde... </button>}
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.forgot_password}>
                    <Link to="/reset-password">Esqueceu sua senha?</Link>
                </div>
            </form>

            <div className={styles.social_login}>
                <p>OU</p>
                <button 
                    onClick={handleGoogleLogin} 
                    className={`${styles.social_btn} ${styles.google_btn}`}
                    disabled={loading}
                >
                    <i className="fab fa-google"></i> Entrar com Google
                </button>
                <button 
                    onClick={handleFacebookLogin} 
                    className={`${styles.social_btn} ${styles.facebook_btn}`}
                    disabled={loading}
                >
                    <i className="fab fa-facebook-f"></i> Entrar com Facebook
                </button>
                <button 
                    onClick={handleTwitterLogin} 
                    className={`${styles.social_btn} ${styles.twitter_btn}`}
                    disabled={loading}
                >
                    <i className="fab fa-twitter"></i> Entrar com Twitter
                </button>
                <button 
                    onClick={handleGithubLogin} 
                    className={`${styles.social_btn} ${styles.github_btn}`}
                    disabled={loading}
                >
                    <i className="fab fa-github"></i> Entrar com GitHub
                </button>
            </div>
        </div>
    )
}
export default Login