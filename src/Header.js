export default Header;

function Header(props) {
    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <>
            <div className="header">
                <h1>로고</h1>
                <ul>
                    <li><button onClick={refreshPage}>Refresh DB</button></li>
                </ul>
            </div>
        </>
    );
}