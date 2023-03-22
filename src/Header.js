export default Header;

function Header(props) {
    return (
        <div>{props.connectedDB.toString()}</div>
    );
}