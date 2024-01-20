import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import './navbar.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';

const Navbarr = () => {

    const dispatch = useDispatch()
    const { name } = useSelector(state => state.auth)

    const handleLogout = () => {
        dispatch(startLogout());
    }

    return (
        <>
            {[false,].map((expand) => (
                <Navbar key={expand} bg="dark" variant="dark" expand={expand} fixed="top" sticky="top" >
                    <Container fluid>
                        <Navbar.Toggle aria-controls="basic-navbar-nav " >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="d-block mx-auto" role="img" viewBox="0 0 24 24"><title>Product</title><circle cx="12" cy="12" r="10" /><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94" /></svg>
                        </Navbar.Toggle >
                        <Navbar.Brand href="/">{name}</Navbar.Brand>
                        {/* <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} /> */}
                        <Navbar.Offcanvas
                            id="basic-navbar-nav"
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="start"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>
                                    <h2> {name}</h2>
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav >
                                    <h6>
                                        <Nav.Link href="needle">Reg Salida</Nav.Link>
                                        <Nav.Link href="needlelist">List Salidas</Nav.Link>
                                        <Nav.Link href="needleres">Consumo</Nav.Link>
                                        <Nav.Link href="needleentr">Reg Ingreso</Nav.Link>
                                        <Nav.Link href="needleresentr">Resumen</Nav.Link>
                                        <Nav.Link href="needlelistentr">List entradas</Nav.Link>
                                    </h6>
                                </Nav>

                            </Offcanvas.Body>
                            <div className='py-5 px-2'>
                                <button onClick={handleLogout} className="btn btn-dark px-5" >Salir</button>
                            </div>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    )
}

export default Navbarr
