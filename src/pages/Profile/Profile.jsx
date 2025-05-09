import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'
import { useAuthValue } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import styles from './Profile.module.css'

const Profile = () => {
    const { user } = useAuthValue()
    const { updateUserProfile, verifyEmail, deleteAccount, error, loading, message } = useAuthentication()
    const navigate = useNavigate()

    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [photoURL, setPhotoURL] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [formError, setFormError] = useState("")
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

   
    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || "")
            setEmail(user.email || "")
            setPhotoURL(user.photoURL || "")
        }
    }, [user])

  
    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError("")

      
        if (password && password !== confirmPassword) {
            setFormError("As senhas precisam ser iguais!")
            return
        }

        const data = {
            displayName,
            email,
            photoURL
        }

        await updateUserProfile(data)
    }

    // Enviar email de verificação
    const handleVerifyEmail = async () => {
        await verifyEmail()
    }

    // Excluir conta
    const handleDeleteAccount = async () => {
        if (await deleteAccount(password)) {
            navigate("/")
        }
    }

    return (
        <div className={styles.profile}>
            <h1>Meu Perfil</h1>
            <p>Gerencie suas informações de perfil</p>

            {/* Status de verificação de email */}
            {user && !user.emailVerified && (
                <div className={styles.verification}>
                    <p>Seu email ainda não foi verificado.</p>
                    <button 
                        onClick={handleVerifyEmail} 
                        className={styles.verify_btn}
                        disabled={loading}
                    >
                        Enviar email de verificação
                    </button>
                </div>
            )}

            {/* Formulário de atualização de perfil */}
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nome:</span>
                    <input
                        type="text"
                        name="displayName"
                        placeholder="Nome de exibição"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                </label>
                <label>
                    <span>Email:</span>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <span>URL da foto:</span>
                    <input
                        type="url"
                        name="photoURL"
                        placeholder="URL da foto de perfil"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                    />
                </label>
                {photoURL && (
                    <div className={styles.preview}>
                        <img src={photoURL} alt="Prévia da foto de perfil" />
                    </div>
                )}
                {!loading && <button className="btn">Salvar alterações</button>}
                {loading && <button className="btn" disabled>Aguarde...</button>}
                {formError && <p className={styles.error}>{formError}</p>}
                {message && <p className={styles.success}>{message}</p>}
                {error && <p className={styles.error}>{error}</p>}
            </form>

            {/* Seção de exclusão de conta */}
            <div className={styles.danger_zone}>
                <h2>Zona de perigo</h2>
                {!showDeleteConfirm ? (
                   <center>
                    <button 
                        onClick={() => setShowDeleteConfirm(true)}
                        className={styles.delete_btn}
                    >
                        Excluir minha conta
                    </button>
                   </center>
                ) : (
                    <div className={styles.delete_confirm}>
                        <p>Esta ação é irreversível. Digite sua senha para confirmar:</p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Sua senha"
                        />
                        <div className={styles.delete_actions}>
                            <button 
                                onClick={() => setShowDeleteConfirm(false)}
                                className={styles.cancel_btn}
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleDeleteAccount}
                                className={styles.confirm_delete_btn}
                                disabled={loading || !password}
                            >
                                Confirmar exclusão
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile 