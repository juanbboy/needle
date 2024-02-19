import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { useForm } from '../../hooks/useForm';

const Needleresentr = () => {
    // const [date, setdate] = useState({
    //     date: {
    //         type: Date,
    //         default: Date.now
    //     }
    // })
    // const timeElapsed = Date.now()
    // const today = new Date(timeElapsed);
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
    const [Valuesres, setValuesres] = useState({
        g05: '',
        g09: '',
        a75: '',
        a76: '',
        a06: '',
        a09: '',
        a12: '',
        a16: ''
    });
    const [Valuestot, setValuestot] = useState({
        g05: '',
        g09: '',
        a75: '',
        a76: '',
        a06: '',
        a09: '',
        a12: '',
        a16: ''
    });
    const [Valuesdif, setValuesdif] = useState({
        g05: '',
        g09: '',
        a75: '',
        a76: '',
        a06: '',
        a09: '',
        a12: '',
        a16: ''
    });

    const [formValues, handleInputChange] = useForm({
        g05: '',
        g09: '',
        a75: '',
        a76: '',
        a06: '',
        a09: '',
        a12: '',
        a16: ''
    });

    const { g09, g05, a76, a75, a06, a09, a12, a16 } = formValues;

    useEffect(() => {
        conexion();
    }, []);

    useEffect(() => {
        total();
    }, [Valuesres, Values])

    const event = (e) => {
        handleInputChange(e)
    }

    // const Dat = () => {
    //     console.log(today.toDateString())
    //     console.log(date)
    //     console.log(Date.now)
    // }

    const conexion = () => {
        axios.get('https://bakend.vercel.app/api/needleentr').then((res) => {
            suma(res.data);
        })
        axios.get('https://bakend.vercel.app/api/needle').then((res) => {
            sumares(res.data)
        })
    }

    const suma = (res) => {
        let g05 = ''
        let g09 = ''
        let a75 = ''
        let a76 = ''
        let a06 = ''
        let a09 = ''
        let a12 = ''
        let a16 = ''

        res.filter(res => res.g09).map(needle => (
            g09 = (Number(g09) + needle.g09)
        ))
        res.filter(res => res.g05).map(needle => (
            g05 = (Number(g05) + needle.g05)
        ))
        res.filter(res => res.a75).map(needle => (
            a75 = (Number(a75) + needle.a75)
        ))
        res.filter(res => res.a76).map(needle => (
            a76 = (Number(a76) + needle.a76)
        ))
        res.filter(res => res.a06).map(needle => (
            a06 = (Number(a06) + needle.a06)
        ))
        res.filter(res => res.a09).map(needle => (
            a09 = (Number(a09) + needle.a09)
        ))
        res.filter(res => res.a12).map(needle => (
            a12 = (Number(a12) + needle.a12)
        ))
        res.filter(res => res.a16).map(needle => (
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

    const sumares = (res) => {
        let g05 = ''
        let g09 = ''
        let a75 = ''
        let a76 = ''
        let a06 = ''
        let a09 = ''
        let a12 = ''
        let a16 = ''

        res.filter(res => res.g09).map(needle => (
            g09 = (Number(g09) + needle.g09)
        ))
        res.filter(res => res.g05).map(needle => (
            g05 = (Number(g05) + needle.g05)
        ))
        res.filter(res => res.a75).map(needle => (
            a75 = (Number(a75) + needle.a75)
        ))
        res.filter(res => res.a76).map(needle => (
            a76 = (Number(a76) + needle.a76)
        ))
        res.filter(res => res.a06).map(needle => (
            a06 = (Number(a06) + needle.a06)
        ))
        res.filter(res => res.a09).map(needle => (
            a09 = (Number(a09) + needle.a09)
        ))
        res.filter(res => res.a12).map(needle => (
            a12 = (Number(a12) + needle.a12)
        ))
        res.filter(res => res.a16).map(needle => (
            a16 = (Number(a16) + needle.a16)
        ))

        setValuesres({
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

    const total = () => {
        setValuestot({
            g05: Values.g05 - Valuesres.g05,
            g09: Values.g09 - Valuesres.g09,
            a75: Values.a75 - Valuesres.a75,
            a76: Values.a76 - Valuesres.a76,
            a06: Values.a06 - Valuesres.a06,
            a09: Values.a09 - Valuesres.a09,
            a12: Values.a12 - Valuesres.a12,
            a16: Values.a16 - Valuesres.a16,
        })
    }

    const Diferencia = () => {
        setValuesdif({
            g05: formValues.g05 - Valuestot.g05,
            g09: formValues.g09 - Valuestot.g09,
            a75: formValues.a75 - Valuestot.a75,
            a76: formValues.a76 - Valuestot.a76,
            a06: formValues.a06 - Valuestot.a06,
            a09: formValues.a09 - Valuestot.a09,
            a12: formValues.a12 - Valuestot.a12,
            a16: formValues.a16 - Valuestot.a16
        })
    }

    return (
        <div>
            <Table striped hover size="sm" responsive="sm">
                <thead >
                    <tr>
                        <th>Estado</th>
                        <th>G09</th>
                        <th>G05</th>
                        <th>1975</th>
                        <th>1976</th>
                        <th>7606</th>
                        <th>7909</th>
                        <th>0012</th>
                        <th>0016</th>
                    </tr>
                </thead>
                <tbody>
                    < tr >
                        <th>Entrada</th>
                        <td>{Values.g09}</td>
                        <td>{Values.g05}</td>
                        <td>{Values.a75}</td>
                        <td>{Values.a76}</td>
                        <td>{Values.a06}</td>
                        <td>{Values.a09}</td>
                        <td>{Values.a12}</td>
                        <td>{Values.a16}</td>
                        {/* <td>{render[11]}</td> */}
                    </tr>
                    < tr >
                        <th>Salida</th>
                        <td>{Valuesres.g09}</td>
                        <td>{Valuesres.g05}</td>
                        <td>{Valuesres.a75}</td>
                        <td>{Valuesres.a76}</td>
                        <td>{Valuesres.a06}</td>
                        <td>{Valuesres.a09}</td>
                        <td>{Valuesres.a12}</td>
                        <td>{Valuesres.a16}</td>

                        {/* <td>{render[11]}</td> */}
                    </tr>
                    < tr >
                        <th>Total</th>
                        <td>{Valuestot.g09}</td>
                        <td>{Valuestot.g05}</td>
                        <td>{Valuestot.a75}</td>
                        <td>{Valuestot.a76}</td>
                        <td>{Valuestot.a06}</td>
                        <td>{Valuestot.a09}</td>
                        <td>{Valuestot.a12}</td>
                        <td>{Valuestot.a16}</td>
                        {/* <td>{render[11]}</td> */}
                    </tr>

                </tbody>
            </Table>
            <div className='text-center m-5'>
                <h4 >INVENTARIO FISICO</h4>
            </div>
            <Table striped hover size="sm" responsive="sm">
                <thead >
                    <tr className='text-center'>
                        <th>Estado</th>
                        <th>G09</th>
                        <th>G05</th>
                        <th>1975</th>
                        <th>1976</th>
                        <th>7606</th>
                        <th>7909</th>
                        <th>0012</th>
                        <th>0016</th>
                    </tr>
                </thead>
                <tbody>
                    < tr >
                        <th>Fisico</th>
                        <td> <input
                            type="text"
                            className="form-control text-center"
                            id="field1"
                            name="g09"
                            value={g09}
                            onChange={event}
                            required={true}
                        /></td>
                        <td> <input
                            type="text"
                            className="form-control text-center"
                            id="field2"
                            name="g05"
                            value={g05}
                            onChange={event}
                            required={true}
                        /></td>
                        <td> <input
                            type="text"
                            className="form-control text-center"
                            id="field3"
                            name="a75"
                            value={a75}
                            onChange={event}
                            required={true}
                        /></td>
                        <td> <input
                            type="text"
                            className="form-control text-center"
                            id="field4"
                            name="a76"
                            value={a76}
                            onChange={event}
                            required={true}
                        /></td>
                        <td> <input
                            type="text"
                            className="form-control text-center"
                            id="field5"
                            name="a06"
                            value={a06}
                            onChange={event}
                            required={true}
                        /></td>
                        <td> <input
                            type="text"
                            className="form-control text-center"
                            id="field6"
                            name="a09"
                            value={a09}
                            onChange={event}
                            required={true}
                        /></td>
                        <td> <input
                            type="text"
                            className="form-control text-center"
                            id="field7"
                            name="a12"
                            value={a12}
                            onChange={event}
                            required={true}
                        /></td>
                        <td> <input
                            type="text"
                            className="form-control text-center"
                            id="field8"
                            name="a16"
                            value={a16}
                            onChange={event}
                            required={true}
                        /></td>
                    </tr>
                    < tr className='text-center' >
                        <th>Diferencia</th>
                        <td>{Valuesdif.g09}</td>
                        <td>{Valuesdif.g05}</td>
                        <td>{Valuesdif.a75}</td>
                        <td>{Valuesdif.a76}</td>
                        <td>{Valuesdif.a06}</td>
                        <td>{Valuesdif.a09}</td>
                        <td>{Valuesdif.a12}</td>
                        <td>{Valuesdif.a16}</td>
                    </tr>
                </tbody>
            </Table>
            <div className='text-center'>
                <button className="btn btn-lg btn-primary" onClick={Diferencia} >Calcular</button>
            </div>

            {/* <div className='text-center'>
                <button className="btn btn-lg btn-primary" onClick={Dat} >dat</button>
            </div> */}

        </div>
    )
}

export default Needleresentr
