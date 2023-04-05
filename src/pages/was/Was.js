import './Was.css';
import { Link } from "react-router-dom";

export default function Was() {
    return (
        <div className='Was'>
            <Link className='link-home' to='/'>
                Home                
            </Link>
            <div style={{color:'white', textAlign:'center'}}>WAS 화면입니다.</div>
        </div>
    );
}