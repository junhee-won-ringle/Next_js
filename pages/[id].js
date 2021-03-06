import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'


export default function Id() {
    const router = useRouter()
    const { id } = router.query;

    return (
        <div className={styles.container}>
            <h1>
                Hello I am {id}!
            </h1>
        </div>
    )
}