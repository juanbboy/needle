import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { Table } from 'react-bootstrap';


const Needlelist = () => {
    const [needle, setneedle] = useState([])
    const [search, setSearch] = useState()
    useEffect(() => {
        conexion()
    }, []);

    const conexion = () => {
        //axios.get('http://localhost:4002/api/needle').then((res) => {
        // axios.get('https://needlecpd.herokuapp.com/api/needle').then((res) => {
        axios.get('https://bakend.vercel.app/api/needle').then((res) => {
            setneedle(res.data)
        })
    }

    const handleSubmit = async (id) => {

        // await axios.delete(`https://needlecpd.herokuapp.com/api/delneedle/${id}`)
        await axios.delete(`https://bakend.vercel.app/api/delneedle/${id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado',
                    showConfimButton: false,
                    timer: 1200
                })
            })
    }


    const searcher = (e) => {
        setSearch(e.target.value)
    }

    const results = !search ? needle : needle.filter((dato) => dato.name.toLowerCase().includes(search.toLocaleLowerCase()) || dato.obs.toLowerCase().includes(search.toLocaleLowerCase()))



    if (!needle) return null;

    return (
        <div>
            <form >
                <div className='caja'>
                    <div className="row mb-3 justify-content-center">
                        <div className="col-2">
                            <label htmlFor="inputext" className="col-form-label"><h5>Search</h5></label>
                        </div>

                        <input value={search} onChange={searcher} type="text" placeholder='Search' className='form-control' />
                        {/* <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputname"
                                name="g09"
                                value={g09}
                                onChange={handleInputChange}

                            />
                        </div> */}
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
                    {results.map(needle =>
                        <tr>
                            <td>{needle.date}</td>
                            <td>{needle.cod}</td>
                            <td>{needle.name}</td>
                            <td>{needle.g09}</td>
                            <td>{needle.g05}</td>
                            <td>{needle.a75}</td>
                            <td>{needle.a76}</td>
                            <td>{needle.a06}</td>
                            <td>{needle.a09}</td>
                            <td>{needle.a12}</td>
                            <td>{needle.a16}</td>
                            <td>{needle.obs}</td>
                            <td><button className="btn-danger" onClick={handleSubmit.bind(this, needle._id)}>Elimina</button></td>
                        </tr>
                    )}
                </tbody>
            </Table >
        </div>

    );
}
export default Needlelist