import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';

const Needleres = () => {
    const [need, setNeed] = useState()
    const [needle, setNeedle] = useState([])
    const [search, setsearch] = useState([])
    const name = ["Javier Medina", "Yeimi Calderon", "Luz Dary Monroy", "Luz Dary paez", "Mirella Gomez", "Ruben Salinas", "Lesma Ibargüen", "Sandra Tilano", "Luis Rodriguez", "Claudia Vargas", "Windy Ramirez", "Mantenimiento", "TOTAL"]
    const code = [602, 615, 603, 605, 608, 632, 606, 624, 636, 637, 601, 900]
    let i = 0

    useEffect(() => {
        conexion();
    }, []);


    const conexion = () => {
        axios.get('https://bakend.vercel.app/api/needle').then((res) => {
            setNeed(res.data);
            suma(res.data)
        })
    }

    const searcher = (e) => {
        if (!e.target.value) {
            suma(need)
        } else {
            suma(need.filter((dato) => dato.date.toLowerCase().includes(e.target.value.toLocaleLowerCase()) || dato.obs.toLowerCase().includes(e.target.value.toLocaleLowerCase())))
            setsearch(need.filter((dato) => dato.date.toLowerCase().includes(e.target.value.toLocaleLowerCase()) || dato.obs.toLowerCase().includes(e.target.value.toLocaleLowerCase())))
        }
    }

    const searcher2 = (e) => {
        suma(search.filter((dato) => dato.date.toLowerCase().includes(e.target.value.toLocaleLowerCase()) || dato.obs.toLowerCase().includes(e.target.value.toLocaleLowerCase()))
        )
    }



    //setNeedle(!search ? need : need.filter((dato) => dato.date.toLowerCase().includes(search.toLocaleLowerCase())))

    const suma = (res) => {
        const suma = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
        for (let i = 0; i < code.length; i++) {
            res.filter(nombre => nombre.cod === code[i]).map(needle => (
                suma[i][0] = suma[i][0] + needle.g09
            ))
            res.filter(nombre => nombre.cod === code[i]).map(needle => (
                suma[i][1] = suma[i][1] + needle.g05
            ))
            res.filter(nombre => nombre.cod === code[i]).map(needle => (
                suma[i][2] = suma[i][2] + needle.a75
            ))
            res.filter(nombre => nombre.cod === code[i]).map(needle => (
                suma[i][3] = suma[i][3] + needle.a76
            ))
            res.filter(nombre => nombre.cod === code[i]).map(needle => (
                suma[i][4] = suma[i][4] + needle.a06
            ))
            res.filter(nombre => nombre.cod === code[i]).map(needle => (
                suma[i][5] = suma[i][5] + needle.a09
            ))
            res.filter(nombre => nombre.cod === code[i]).map(needle => (
                suma[i][6] = suma[i][6] + needle.a12
            ))
            res.filter(nombre => nombre.cod === code[i]).map(needle => (
                suma[i][7] = suma[i][7] + needle.a16
            ))
            res.filter(nombre => nombre.cod === code[i]).map(needle => (
                suma[i][8] = suma[i][0] + suma[i][1] + suma[i][2] + suma[i][3] + suma[i][4] + suma[i][5] + suma[i][6] + suma[i][7]
            ))
        }
        for (let i = 0; i < suma.length; i++) {
            suma[12][i] = suma[0][i] + suma[1][i] + suma[2][i] + suma[3][i] + suma[4][i] + suma[5][i] + suma[6][i] + suma[7][i] + suma[8][i]
        }
        suma.map(sum => (
            (sum.unshift(code[i], name[i]), i++)
        ))
        setNeedle(suma)
    }

    return (
        <div>
            <form >
                <div className='caja'>
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

            <Table striped hover size="sm" responsive="sm">
                <thead >
                    <tr>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>G09</th>
                        <th>G05</th>
                        <th>1976</th>
                        <th>1975</th>
                        <th>7606</th>
                        <th>7909</th>
                        <th>0012</th>
                        <th>0016</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {needle.map((render) => (
                        <tr>
                            <td>{render[0]}</td>
                            <td>{render[1]}</td>
                            <td>{render[2]}</td>
                            <td>{render[3]}</td>
                            <td>{render[4]}</td>
                            <td>{render[5]}</td>
                            <td>{render[6]}</td>
                            <td>{render[7]}</td>
                            <td>{render[8]}</td>
                            <td>{render[9]}</td>
                            <td>{render[10]}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default Needleres
