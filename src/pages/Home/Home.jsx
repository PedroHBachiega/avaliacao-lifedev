import styles from './Home.module.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

const Home = () => {
  const [query, setQuery] = useState("")
  const { documents: posts, loading, error } = useFetchDocuments("posts")

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className={styles.home}>
      <h1>Veja os posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input 
          type="text"
          placeholder='Ou busque por tags...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div className={styles.post_list}>
        {loading && <p>Carregando...</p>}
        {error && <p className={styles.error}>{error}</p>}
        {posts && posts.length === 0 ? (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            {/* Se o usuário estiver logado, mostrar link para criar post */}
          </div>
        ) : (
          <>
            {posts && posts.map((post) => (
              <div className={styles.post} key={post.id}>
                <h2>{post.title}</h2>
                <p className={styles.author}>por {post.createdBy}</p>
                <div className={styles.tags}>
                  {post.tags.map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>
                <Link to={`/posts/${post.id}`} className="btn btn-outline">
                  Ler
                </Link>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default Home