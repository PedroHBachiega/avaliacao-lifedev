import styles from './CreatePost.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { db } from '../../firebase/config'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

const CreatePost = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState("")
    const [formError, setFormError] = useState("")
    const [loading, setLoading] = useState(false)

    const { user } = useAuthValue()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError("")
        setLoading(true)

        // Validar campos
        if (!title || !body || !tags) {
            setFormError("Por favor, preencha todos os campos!")
            setLoading(false)
            return
        }

        // Processar tags
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

        try {
            // Criar novo post
            await addDoc(collection(db, "posts"), {
                title,
                body,
                tags: tagsArray,
                uid: user.uid,
                createdBy: user.displayName,
                createdAt: Timestamp.now()
            })

            // Redirecionar para o dashboard
            navigate("/dashboard")
        } catch (error) {
            console.error(error)
            setFormError("Erro ao criar o post")
            setLoading(false)
        }
    }

    return (
        <div className={styles.create_post}>
            <h2>Criar Post</h2>
            <p>Crie seu post e compartilhe seu conhecimento</p>

            <form onSubmit={handleSubmit}>
                <label>
                    <span>Título:</span>
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder="Título do post"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={loading}
                    />
                </label>
                <label>
                    <span>Conteúdo:</span>
                    <textarea
                        name="body"
                        required
                        placeholder="Conteúdo do post"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        disabled={loading}
                    ></textarea>
                </label>
                <label>
                    <span>Tags:</span>
                    <input
                        type="text"
                        name="tags"
                        required
                        placeholder="Tags (separadas por vírgula)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        disabled={loading}
                    />
                </label>

                {!loading && <button className="btn">Criar</button>}
                {loading && <button className="btn" disabled>Aguarde...</button>}
                {formError && <p className={styles.error}>{formError}</p>}
            </form>
        </div>
    )
}

export default CreatePost
