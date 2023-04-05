import styles from './Home.module.css';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className={styles.Home}>
            <nav>
                <Link className={styles.link} to='/cms'>CMS</Link>
                <Link className={styles.link} to='/was'>WAS</Link>
            </nav>
        </div>
    );
}