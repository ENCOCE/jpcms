import { Link } from "react-router-dom";

export default function Header() {
    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <>
            <div className="header">
                <Link className="link-home" to='/'>
                    <h1>로고</h1>
                </Link>
                <ul>
                    <li><button onClick={refreshPage}>Refresh DB</button></li>
                </ul>
            </div>
        </>
    );
}