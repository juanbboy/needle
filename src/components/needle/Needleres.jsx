import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Needleres = () => {
    const [needle, setNeedle] = useState([])
    const name = ["Marina Arias", "Jesus Hurtado", "Luz Dary Monroy", "Luz Dary paez", "Mirella Gomez", "Alexander Aroca ", "Mantenimiento", "TOTAL"]
    const code = [600, 601, 603, 605, 608, 609, 900]
    let i = 0

    useEffect(() => {
        conexion();
    });

    const conexion = () => {
        //axios.get('http://localhost:4002/api/needle').then((res) => {
        // axios.get('https://needlecpd.herokuapp.com/api/needle').then((res) => {
        axios.get('https://bakend.vercel.app/api/needle').then((res) => {
            suma(res.data);
        })
    }

    const suma = (res) => {
        const suma = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]
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
        for (let i = 0; i < 9; i++) {
            suma[7][i] = suma[0][i] + suma[1][i] + suma[2][i] + suma[3][i] + suma[4][i] + suma[5][i] + suma[6][i]
        }
        suma.map(sum => (
            (sum.unshift(code[i], name[i]), i++)
        ))
        setNeedle(suma)
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>Codigo</th>
                            <th>Nombre</th>
                            <th>G09</th>
                            <th>G05</th>
                            <th>1975</th>
                            <th>1976</th>
                            <th>7606</th>
                            <th>7909</th>
                            <th>0012</th>
                            <th>0016</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {needle.map(render =>
                            < tr >
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
                                <td>{render[11]}</td>
                            </tr>
                        )}

                    </tbody>
                </table >
            </div >
        </div >

    )
}

export default Needleres
