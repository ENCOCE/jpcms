import styles from './Was.module.css';
import { Link } from "react-router-dom";

export default function Was() {
    return (
        <div className={styles.Was}>
            <Link className={styles.link} to='/'>
                Home
            </Link>
            <div style={{color:'white', textAlign:'center'}}>WAS 화면입니다.</div>
        </div>
    );
}