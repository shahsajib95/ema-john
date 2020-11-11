import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faSearch, faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import { CartsData } from '../../../App';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [finalCart, setFinalCart] = useContext(CartsData)
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light p-3">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active ml-3">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item ml-3">
                            <Link className="nav-link" to="/">Features</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link ml-3" to="/">Pricing</Link>
                        </li>
                        <li className="nav-item dropdown ml-3">
                            <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown link
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <Link className="dropdown-item" to="/">Action</Link>
                                <Link className="dropdown-item" to="/">Another action</Link>
                                <Link className="dropdown-item" to="/">Something else here</Link>
                            </div>
                        </li>
                        <li className="nav-item ml-3">
                            <Link className="nav-link" to="/"><FontAwesomeIcon icon={faUserCircle} /></Link>
                        </li>
                        <li className="nav-item ml-3">
                            <Link className="nav-link" to="/"><FontAwesomeIcon icon={faSearch} /></Link>
                        </li>
                        <li className="nav-item ml-3">
    <a className="nav-link" href="/cart"><FontAwesomeIcon icon={faCartArrowDown} /><span className="ml-2 text-warning">{finalCart.length}</span></a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;