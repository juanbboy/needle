import React from 'react'
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import './navbar.css';

const Navbar = () => {

    const dispatch = useDispatch()
    const { name } = useSelector(state => state.auth)

    const handleLogout = () => {
        dispatch(startLogout());
    }

    return (
        <header className="site-header sticky-sm-top">
            <nav className="navbar navbar-expand-sm">
                <div className="container-fluid">
                    <button className="navbar-toggler mx-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <a className="py-0" href="/" aria-label="Product">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="d-block mx-auto" role="img" viewBox="0 0 24 24"><title>Product</title><circle cx="12" cy="12" r="10" /><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94" /></svg>
                        </a>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarText">
                        <ul className="navbar-nav">
                            <NavLink className={({ isActive }) => 'nav-link padding-0px' + (isActive ? 'active' : '')} to="/needle" >
                                Reg Agujas
                            </NavLink>
                            <NavLink className={({ isActive }) => 'nav-link padding-0px' + (isActive ? 'active' : '')} to="/needlelist" >
                                List Agujas
                            </NavLink>
                            <NavLink className={({ isActive }) => 'nav-link padding-0px' + (isActive ? 'active' : '')} to="/needleres" >
                                Consumo
                            </NavLink>
                        </ul>
                        <div className=" navbar-collapse justify-content-end">
                            <span className="text-info">
                                {name}
                            </span>
                            <button onClick={handleLogout} className="btn btn-dark">Salir</button>
                        </div>
                    </div>
                </div>
            </nav>
        </header >
    )
}

export default Navbar
