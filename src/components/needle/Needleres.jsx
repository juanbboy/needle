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
        // 1. Agrupar códigos únicos y asociarles un nombre (si existe)
        const codMap = new Map();
        res.forEach(item => {
            if (!codMap.has(item.cod)) {
                codMap.set(item.cod, item.name || '');
            }
        });
        const codigos = Array.from(codMap.keys()); // Lista de códigos únicos
        const nombres = Array.from(codMap.values()); // Lista de nombres asociados

        // 2. Inicializar matriz de sumas: una fila por código
        let suma = Array.from({ length: codigos.length }, () => Array(11).fill(0));

        // 3. Sumar los valores de cada campo por código
        codigos.forEach((cod, idx) => {
            // Filtrar los registros que corresponden a este código
            const items = res.filter(nombre => nombre.cod === cod);
            // Sumar los campos numéricos
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
            // Calcular el total de la fila (suma de los campos anteriores)
            suma[idx][10] = suma[idx][2] + suma[idx][3] + suma[idx][4] + suma[idx][5] + suma[idx][6] + suma[idx][7] + suma[idx][8] + suma[idx][9];
            // Asignar código y nombre a la fila
            suma[idx][0] = cod;
            suma[idx][1] = nombres[idx] || '';
        });

        // 4. Ordenar las filas de mayor a menor por el total, dejando el código 900 siempre al final
        const suma900 = suma.find(row => row[0] === 900); // Buscar la fila con código 900
        suma = suma.filter(row => row[0] !== 900); // Eliminar la fila 900 del arreglo principal
        suma.sort((a, b) => b[10] - a[10]); // Ordenar de mayor a menor por total
        if (suma900) suma.push(suma900); // Agregar la fila 900 al final si exi
        // ste

        // 5. Calcular la fila de totales por columna (última fila)
        const totalRow = Array(11).fill(0);
        for (let col = 2; col <= 10; col++) {
            for (let row = 0; row < suma.length; row++) {
                totalRow[col] += suma[row][col];
            }
        }
        totalRow[0] = '';
        totalRow[1] = 'TOTAL';
        suma.push(totalRow); // Agregar la fila de totales al final

        // 6. Actualizar el estado para renderizar la tabla
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
