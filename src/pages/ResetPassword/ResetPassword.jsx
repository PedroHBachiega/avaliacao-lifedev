import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'
import { Link } from 'react-router-dom'
import styles from './ResetPassword.module.css'

const ResetPassword = () => {
    const [email, setEmail] = useState("")
    const { resetPassword, error, loading, message } = useAuthentication()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await resetPassword(email)
    }

    return (
        <div className={styles.reset}>
            <h1>Recuperar Senha</h1>
            <p>Insira seu email para receber um link de recuperação de senha</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>E-mail:</span>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="E-mail do usuário"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                {!loading && <button className="btn">Enviar Link de Recuperação</button>}
                {loading && <button className="btn" disabled>Aguarde...</button>}
                {message && <p className={styles.success}>{message}</p>}
                {error && <p className={styles.error}>{error}</p>}
            </form>
            <div className={styles.back}>
                <Link to="/login">Voltar para o login</Link>
            </div>
        </div>
    )
}

export default ResetPassword 