import Logo from '../LogoHorizontal.svg';
import Spinner from '../Spinner-1s-200px.gif';

function BasicNavbar({accountAddress, loading}) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarTogglerDemo01"
                aria-controls="navbarTogglerDemo01"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
            
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <a className="navbar-brand" href="https://matechstudios.com/" target='_blank' rel="noreferrer">
                    <img src={Logo} alt="Matech Logo" height='45px' />
                </a>
                {loading && <div>
                    <img src={Spinner} height='64px' />
                </div>}
            </div>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                    <a className="nav-link" href="#">
                    Account: {accountAddress}
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default BasicNavbar;