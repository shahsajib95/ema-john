import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faSearch, faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import { CartInfo, CartsData, ProductsData } from '../../../App';
import { Link } from 'react-router-dom';
import logo from '../../../images/favicon.ico'

const Navbar = () => {
    const [products, setProducts] = useContext(ProductsData)
    const [cart] = useContext(CartInfo)
    const [search, setSeacrh] = useState('')
    const [valueText, setValueText] = useState('');

    useEffect(() => {
        (async() => {
            fetch(`http://localhost:5000/products?search=` + search)
            .then(res => res.json())
            .then(result => setProducts(result))
        })()
    }, [search])

    const handleBlur = (e) => {
        const searchData = e.target.value
        setValueText(searchData)
        
    }
    const handleSubmit = () => {
        setSeacrh(valueText)
        setValueText()
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light p-3">
                <Link className="navbar-brand" to="/"><img className="w-25" src={logo} alt=""/></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Features</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Pricing</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown link
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <Link className="dropdown-item" to="/">Action</Link>
                                <Link className="dropdown-item" to="/">Another action</Link>
                                <Link className="dropdown-item" to="/">Something else here</Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                <FontAwesomeIcon icon={faUserCircle} />
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                <input onBlur={handleBlur} placeholder="search" />
                                <FontAwesomeIcon className="ml-2" icon={faSearch} onClick={handleSubmit} />
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/cart"><FontAwesomeIcon icon={faCartArrowDown} /><span className="ml-2 text-warning">{cart.length}</span></a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;