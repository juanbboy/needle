import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import './navbar.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Navbarr = () => {

    const dispatch = useDispatch()
    const { name } = useSelector(state => state.auth)

    const handleLogout = () => {
        dispatch(startLogout());
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className='justify-content-center'>
            {/* <Container > */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="d-block mx-auto" role="img" viewBox="0 0 24 24"><title>Product</title><circle cx="12" cy="12" r="10" /><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94" /></svg>
            </Navbar.Toggle >
            <Navbar.Collapse id="basic-navbar-nav">

                <Nav className="mx-auto justify-content-center">
                    <Nav.Link href="needle">Reg Agujas</Nav.Link>
                    <Nav.Link href="needlelist">List Agujas</Nav.Link>
                    <Nav.Link href="needleres">Consumo</Nav.Link>

                </Nav>
                <div className=" navbar-collapse justify-content-end">
                    <span className="text-info">
                        {name}
                    </span>
                    <button onClick={handleLogout} className="btn btn-dark">Salir</button>
                </div>
            </Navbar.Collapse>

            {/* </Container> */}
        </Navbar >



    )
}

export default Navbarr
