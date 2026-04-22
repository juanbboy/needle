import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';

const Needleres = () => {
    const [need, setNeed] = useState()
    const [needle, setNeedle] = useState([])
    const [search, setsearch] = useState([])
    // const name = [...]
    // const code = [...]
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


    // Optimizado: función genérica para filtrar por texto
    const filterByText = (data, text) => {
        if (!text) return data;
        const lower = text.toLowerCase();
        return data.filter(dato =>
            (dato.date && dato.date.toLowerCase().includes(lower)) ||
            (dato.obs && dato.obs.toLowerCase().includes(lower))
        );
    };

    const searcher = (e) => {
        const value = e.target.value;
        const filtered = filterByText(need || [], value);
        setsearch(filtered);
        suma(filtered.length ? filtered : (need || []));
    };

    const searcher2 = (e) => {
        const value = e.target.value;
        const filtered = filterByText(search || [], value);
        suma(filtered.length ? filtered : (search || []));
    };



    //setNeedle(!search ? need : need.filter((dato) => dato.date.toLowerCase().includes(search.toLocaleLowerCase())))

    const suma = (res) => {
        // Obtener códigos únicos y nombres asociados
        const codMap = new Map();
        res.forEach(item => {
            if (!codMap.has(item.cod)) {
                codMap.set(item.cod, item.name || '');
            }
        });
        const codigos = Array.from(codMap.keys());
        const nombres = Array.from(codMap.values());

        // Inicializa matriz de sumas (filas dinámicas + 1 para total)
        const suma = Array.from({ length: codigos.length + 1 }, () => Array(11).fill(0));

        codigos.forEach((cod, idx) => {
            const items = res.filter(nombre => nombre.cod === cod);
            items.forEach(needle => {
                suma[idx][2] += needle.g09 || 0;
                suma[idx][3] += needle.g05 || 0;
                suma[idx][4] += needle.a75 || 0;
                suma[idx][5] += needle.a76 || 0;
                suma[idx][6] += needle.a06 || 0;
                suma[idx][7] += needle.a09 || 0;
                suma[idx][8] += needle.a12 || 0;
                suma[idx][9] += needle.a16 || 0;
            });
            suma[idx][10] = suma[idx][2] + suma[idx][3] + suma[idx][4] + suma[idx][5] + suma[idx][6] + suma[idx][7] + suma[idx][8] + suma[idx][9];
            suma[idx][0] = cod;
            suma[idx][1] = nombres[idx] || '';
        });

        // Suma total por columna (última fila)
        for (let col = 2; col <= 10; col++) {
            for (let row = 0; row < codigos.length; row++) {
                suma[codigos.length][col] += suma[row][col];
            }
        }
        suma[codigos.length][0] = '';
        suma[codigos.length][1] = 'TOTAL';

        setNeedle(suma);
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
