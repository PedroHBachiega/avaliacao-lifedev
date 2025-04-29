import styles from './Dashboard.module.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../firebase/config'
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useDeleteDocument } from '../../hooks/useDeleteDocument'


const Dashboard = () => {
    const {user} = useAuthValue();
    const uid= user.uid;

    const {documents, loading, error} = useFetchDocuments("posts", null, uid);

    const {deleteDocument} = useDeleteDocument("posts");

    console.log(uid);
    console.log(documents);

    return (
        <div className={styles.dashboard}>
            <h2>Dashboard</h2>
            {loading && <p>Carregando...</p>}
            {error && <p>{error}</p>}
            {documents && documents.length === 0 ? (
                <div className={styles.noposts}>
                    <p>Não foram encontrados posts</p>
                    <Link to="/posts/create" className="btn">Criar post</Link>
                </div>
            ) : (
                <>
                    <div className={styles.post_header}>
                        <span>Título</span>
                        <span>Ações</span>
                    </div>
                    {documents && documents.map((post) => (
                        <div className={styles.post_row} key={post.id}>
                            <p>{post.title}</p>
                            <div className={styles.actions}>
                                <Link to={`/posts/${post.id}`} className='btn btn-outline'>
                                    Ver
                                </Link>
                                <Link to={`/posts/edit/${post.id}`} className='btn btn-outline'>
                                    Editar
                                </Link>
                                <button onClick={() => deleteDocument(post.id)} className='btn btn-outline btn-danger'>
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

export default Dashboard;
