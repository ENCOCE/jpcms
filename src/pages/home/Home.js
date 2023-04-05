import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
    return (
        <div className='Home'>
            <nav>
                <Link className='link-work' to='/cms'>CMS</Link>
                <Link className='link-work' to='/was'>WAS</Link>
            </nav>
        </div>
    );
}