import styles from './EditPost.module.css'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { db } from '../../firebase/config'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

const EditPost = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState("")
    const [formError, setFormError] = useState("")
    const [loading, setLoading] = useState(false)

    const { user } = useAuthValue()

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true)
            try {
                const docRef = doc(db, "posts", id)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    const data = docSnap.data()
                    
                    // Verificar se o usuário é o autor do post
                    if(data.uid !== user.uid) {
                        navigate("/dashboard")
                        return
                    }
                    
                    setTitle(data.title)
                    setBody(data.body)
                    setTags(data.tags.join(", "))
                } else {
                    navigate("/dashboard")
                    return
                }
            } catch (error) {
                console.error("Erro ao buscar post:", error)
                setFormError("Erro ao carregar o post para edição")
            } finally {
                setLoading(false)
            }
        }

        fetchPost()
    }, [id, navigate, user.uid])

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
            // Atualizar post existente
            const postRef = doc(db, "posts", id)
            await updateDoc(postRef, {
                title,
                body,
                tags: tagsArray,
            })

            // Redirecionar para o dashboard
            navigate("/dashboard")
        } catch (error) {
            console.error(error)
            setFormError("Erro ao editar o post")
            setLoading(false)
        }
    }

    return (
        <div className={styles.edit_post}>
            <h2>Editar Post</h2>
            <p>Altere os dados do seu post</p>

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

                {!loading && <button className="btn">Salvar</button>}
                {loading && <button className="btn" disabled>Aguarde...</button>}
                {formError && <p className={styles.error}>{formError}</p>}
            </form>
        </div>
    )
}

export default EditPost 