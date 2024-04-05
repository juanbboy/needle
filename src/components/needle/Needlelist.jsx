import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from '../../hooks/useForm';
import { Next } from 'react-bootstrap/esm/PageItem';

const Needlelist = () => {
    const [results, setresults] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [formValues, handleInputChange] = useForm()
    const { cod, name, g09, g05, a76, a75, a06, a09, a12, a16, obs } = formValues;
    const [id, setid] = useState()
    const [needle, setneedle] = useState([])
    const [search, setSearch] = useState([])
    const [Values, setValues] = useState({
        g05: '',
        g09: '',
        a75: '',
        a76: '',
        a06: '',
        a09: '',
        a12: '',
        a16: ''
    });

    useEffect(() => {
        conexion()
        // searcher()
    }, []);

    useEffect(() => {
        suma()

    }, [search, needle]);


    const conexion = () => {
        axios.get('https://bakend.vercel.app/api/needle').then((res) => {
            setneedle(res.data)
            setSearch(res.data.reverse())

        })
    }

    const handleSubmit = (id) => {
        // await axios.delete(`https://needlecpd.herokuapp.com/api/delneedle/${id}`)
        Swal.fire({
            title: 'Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`https://bakend.vercel.app/api/delneedle/${id}`)
                    .then(res => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Your file has been deleted.',
                            showConfirmButton: false,
                            timer: 1200
                        })
                    })
                conexion()
            }
        })
    }

    // const searcher = (e) => {
    //     setSearch(e.target.value)
    // }

    const searcher = (e) => {
        // setresults(needle.filter((dato) => dato.name.toLowerCase().includes(e.target.value.toLocaleLowerCase()) || dato.obs.toLowerCase().includes(e.target.value.toLocaleLowerCase()) || dato.date.toLowerCase().includes(e.target.value.toLocaleLowerCase())))
        setSearch(needle.filter((dato) => dato.name.toLowerCase().includes(e.target.value.toLocaleLowerCase()) || dato.obs.toLowerCase().includes(e.target.value.toLocaleLowerCase()) || dato.date.toLowerCase().includes(e.target.value.toLocaleLowerCase())))

    }

    const searcher2 = (e) => {
        setSearch(search.filter((dato) => dato.name.toLowerCase().includes(e.target.value.toLocaleLowerCase()) || dato.obs.toLowerCase().includes(e.target.value.toLocaleLowerCase()) || dato.date.toLowerCase().includes(e.target.value.toLocaleLowerCase())))

    }




    // const results = !search ? needle : needle.filter((dato) => dato.name.toLowerCase().includes(search.toLocaleLowerCase()) || dato.obs.toLowerCase().includes(search.toLocaleLowerCase()) || dato.date.toLowerCase().includes(search.toLocaleLowerCase()))
    // const results = !search ? needle : needle.filter((dato) => dato.name.toLowerCase().includes(search.toLocaleLowerCase()) & dato.date.toLowerCase().includes(search.toLocaleLowerCase()))

    // setresults(!search ? needle : needle.filter((dato) => dato.name.toLowerCase().includes(search.toLocaleLowerCase()) || dato.obs.toLowerCase().includes(search.toLocaleLowerCase()))
    // )
    //results.reverse()
    const suma = () => {
        console.log('entro')
        let g05 = ''
        let g09 = ''
        let a75 = ''
        let a76 = ''
        let a06 = ''
        let a09 = ''
        let a12 = ''
        let a16 = ''

        search.filter(res => res.g09).map(needle => (
            g09 = (Number(g09) + needle.g09)
        ))
        search.filter(res => res.g05).map(needle => (
            g05 = (Number(g05) + needle.g05)
        ))
        search.filter(res => res.a75).map(needle => (
            a75 = (Number(a75) + needle.a75)
        ))
        search.filter(res => res.a76).map(needle => (
            a76 = (Number(a76) + needle.a76)
        ))
        search.filter(res => res.a06).map(needle => (
            a06 = (Number(a06) + needle.a06)
        ))
        search.filter(res => res.a09).map(needle => (
            a09 = (Number(a09) + needle.a09)
        ))
        search.filter(res => res.a12).map(needle => (
            a12 = (Number(a12) + needle.a12)
        ))
        search.filter(res => res.a16).map(needle => (
            a16 = (Number(a16) + needle.a16)
        ))

        setValues({
            g05: g05,
            g09: g09,
            a75: a75,
            a76: a76,
            a06: a06,
            a09: a09,
            a12: a12,
            a16: a16
        })
    }

    const update = async (e) => {
        e.preventDefault();
        await axios.put(`https://bakend.vercel.app/api/update-needle/${id}`, formValues)
            .then(res => {
                console.log(res);
                console.log(res.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Actualizado',
                    showConfirmButton: false,
                    timer: 1200
                })
            })
        conexion()
        setShow(false)
    }


    const obtener = async (id) => {
        setid(id)
        // await axios.get(`https://bakend.vercel.app/api/edit-needle/${id}`)
        await axios.get(`https://bakend.vercel.app/api/edit-needle/${id}`)
            .then(res => {
                formValues.cod = res.data.cod
                formValues.name = res.data.name
                formValues.g09 = res.data.g09
                formValues.g05 = res.data.g05
                formValues.a76 = res.data.a76
                formValues.a75 = res.data.a75
                formValues.a06 = res.data.a06
                formValues.a09 = res.data.a09
                formValues.a12 = res.data.a12
                formValues.a16 = res.data.a16
                formValues.obs = res.data.obs
            })
        setShow(true)
    }


    if (!needle) return null;

    return (
        <div>
            <form >
                <div className='caja p-1'>
                    <div className="row mb-3 justify-content-start">
                        <div className="col-2">
                            <label htmlFor="search" className="col-form-label"><h5>Search</h5></label>
                        </div>
                        <div className="row ">
                            <div className="col-2">
                                <input onChange={searcher} id="search" type="text" placeholder='Search' className='form-control col-sm-4' />
                            </div>
                            <div className="col-2">
                                <input onChange={searcher2} id="search2" type="text" placeholder='Search' className='form-control col-sm-4' />
                            </div>
                        </div>
                    </div>
                </div>
            </form >
            <Table striped hover size="sm" responsive="sm" >
                <thead >
                    <tr>
                        <th>Fecha</th>
                        <th>Codigo</th>
                        <th>Tejedor</th>
                        <th>G09</th>
                        <th>G05</th>
                        <th>1976</th>
                        <th>1975</th>
                        <th>7606</th>
                        <th>7909</th>
                        <th>0012</th>
                        <th>0016</th>
                        <th>Observaciones</th>
                    </tr>
                </thead>
                <tbody>
                    < tr >
                        <td>Total</td>
                        <td></td>
                        <td></td>
                        <td>{Values.g09}</td>
                        <td>{Values.g05}</td>
                        <td>{Values.a76}</td>
                        <td>{Values.a75}</td>
                        <td>{Values.a06}</td>
                        <td>{Values.a09}</td>
                        <td>{Values.a12}</td>
                        <td>{Values.a16}</td>
                        <td></td>
                        <td></td>
                        {/* <td>{render[11]}</td> */}
                    </tr>
                    {search.map((needle) =>
                        <tr key={needle._id}>
                            <td>{needle.date}</td>
                            <td>{needle.cod}</td>
                            <td>{needle.name}</td>
                            <td>{needle.g09}</td>
                            <td>{needle.g05}</td>
                            <td>{needle.a76}</td>
                            <td>{needle.a75}</td>
                            <td>{needle.a06}</td>
                            <td>{needle.a09}</td>
                            <td>{needle.a12}</td>
                            <td>{needle.a16}</td>
                            <td>{needle.obs}</td>
                            <td><button className="btn-dark" onClick={obtener.bind(this, needle._id)}>Editar</button></td>
                            <td><button className="btn-danger" onClick={handleSubmit.bind(this, needle._id)}>Elimina</button></td>
                        </tr>
                    )}

                </tbody>
            </Table >

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edita Salida</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="mb-1 contenedor">
                        <label htmlFor="cod" className="form-label">Cod Tejedor</label>
                        <input
                            type="text"
                            className="form-control"
                            id="cod"
                            name="cod"
                            value={cod}
                            onChange={handleInputChange}
                            required={true}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={name}
                            onChange={handleInputChange}
                            required={true}
                            autoComplete='on'
                        />
                    </div>

                    <div className="row mb-3 justify-content-center">
                        <div className="col-2">
                            <label htmlFor="g09" className="col-form-label">G09 </label>
                        </div>
                        <div className="col-3">
                            <input
                                type="text"
                                className="form-control"
                                id="g09"
                                name="g09"
                                value={g09}
                                onChange={handleInputChange}

                            />
                        </div>

                        <div className="col-2">
                            <label htmlFor="g05" className="col-form-label">G05 </label>
                        </div>
                        <div className="col-3">
                            <input
                                type="text"
                                className="form-control"
                                id="g05"
                                name="g05"
                                value={g05}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="row mb-3 justify-content-center">
                        <div className="col-2">
                            <label htmlFor="a76" className="col-form-label">1976 </label>
                        </div>
                        <div className="col-3">
                            <input
                                type="text"
                                className="form-control"
                                id="a76"
                                name="a76"
                                value={a76}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="col-2" >
                            <label htmlFor="a75" className="col-form-label">1975 </label>
                        </div>
                        <div className="col-3">
                            <input
                                type="text"
                                className="form-control"
                                id="a75"
                                name="a75"
                                value={a75}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="row mb-3 justify-content-center">
                        <div className="col-2">
                            <label htmlFor="a06" className="col-form-label">7906</label>
                        </div>
                        <div className="col-3">
                            <input
                                type="text"
                                className="form-control"
                                id="a06"
                                name="a06"
                                value={a06}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="col-2">
                            <label htmlFor="a09" className="col-form-label">7909 </label>
                        </div>
                        <div className="col-3">
                            <input
                                type="text"
                                className="form-control"
                                id="a09"
                                name="a09"
                                value={a09}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="row mb-1 justify-content-center">
                        <div className="col-2">
                            <label htmlFor="a12" className="col-form-label">0012</label>
                        </div>
                        <div className="col-3">
                            <input
                                type="text"
                                className="form-control"
                                id="a12"
                                name="a12"
                                value={a12}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="col-2">
                            <label htmlFor="a16" className="col-form-label">0016 </label>
                        </div>
                        <div className="col-3">
                            <input
                                type="text"
                                className="form-control"
                                id="a16"
                                name="a16"
                                value={a16}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="row mb-3 justify-content-center">
                        <div>
                            <label htmlFor="obs" className="col-form-label">Observaciones </label>
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                id="obs"
                                name="obs"
                                value={obs}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={update}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>

    );
}
export default Needlelist