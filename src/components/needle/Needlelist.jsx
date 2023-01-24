import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { Table } from 'react-bootstrap';


const Needlelist = () => {
    const [needle, setneedle] = useState([])

    useEffect(() => {
        conexion()
    }, [needle]);

    const conexion = () => {
        //axios.get('http://localhost:4002/api/needle').then((res) => {
        // axios.get('https://needlecpd.herokuapp.com/api/needle').then((res) => {
        axios.get('https://bakend.vercel.app/api/needle').then((res) => {
            setneedle(res.data)
        })
    }

    const handleSubmit = async (id) => {
        // await axios.delete(`https://needlecpd.herokuapp.com/api/delneedle/${id}`)
        await axios.delete(`https://needle23.netlify.app/api/delneedle/${id}`)
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

    if (!needle) return null;

    return (
        <div className="row">
            <div className="col-md-12">
                <Table className="table table-striped table-xs">
                    <thead className="thead-dark">
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
                        {needle.map(needle =>
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
            </div >
        </div >
    );
}
export default Needlelist