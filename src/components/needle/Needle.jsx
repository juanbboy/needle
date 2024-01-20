import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { setError, removeError } from '../../actions/ui';
import axios from 'axios';
import Swal from 'sweetalert2';
import './needle.css';

const Needle = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui);
    const [formValues, handleInputChange, reset] = useForm({
        cod: '',
        name: '',
        g05: '',
        g09: '',
        a75: '',
        a76: '',
        a06: '',
        a09: '',
        a12: '',
        a16: '',
        obs: ''
    });
    const code = ["601", "602", "603", "605", "608", "609", "900", "615", "606"]
    const nombre = ["Johan", "Javier Medina", "Luz Dary Monroy", "Luz Dary paez", "Mirella Gomez", "Ruben", "Mantenimiento", "Yeimi Calderon", "Lesma Ibargüen"]
    const { cod, name, g09, g05, a76, a75, a06, a09, a12, a16, obs } = formValues;

    const isFormValid = () => {
        if (name.trim().length < 2) {
            // console.log('nombre requerido');
            dispatch(setError('Nombre Requerido'));
            return false;
        }
        else if (cod.trim().length < 2) {
            // console.log('nombre requerido');
            dispatch(setError('Cod Requerido'));
            return false;
        }
        dispatch(removeError());
        return true;
    }

    const handleRegister = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            // dispatch(startRegisterEmailPassword(name));

            // axios.post(`http://localhost:4002/api/regneedle`, formValues)
            // axios.post(`https://needlecpd.herokuapp.com/api/regneedle`, formValues)
            axios.post(`https://bakend.vercel.app/api/regneedle`, formValues)
                .then(res => {
                    Swal.fire({
                        icon: 'success',
                        title: 'correcto',
                        showConfirmButton: false,
                        timer: 1200
                    })
                    reset();
                    navigate("/needlelist")
                })
        }
    }


    const event = (e) => {
        for (let i = 0; i < code.length; i++) {
            if (e.target.value === code[i]) {
                formValues.name = nombre[i]
            }
        }
        handleInputChange(e)
    }

    return (
        <div className="row justify-content-center cont">
            <div className="col-sm-5 px-3 p-2 ">
                <h4 className="text-center mb-2">Registro de Agujas</h4>
                <form onSubmit={handleRegister}>
                    {
                        msgError && (
                            <div className="alert alert-danger" role="alert">
                                {msgError}
                            </div>
                        )
                    }

                    <div className="mb-1 contenedor">
                        <label htmlFor="inputext" className="form-label">Cod Tejedor</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputname"
                            name="cod"
                            value={cod}
                            onChange={event}
                            required={true}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputext" className="form-label">Nombre </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputname"
                            name="name"
                            value={name}
                            onChange={handleInputChange}
                            required={true}
                        />
                    </div>

                    <div className="row mb-3 justify-content-center">
                        <div className="col-2">
                            <label htmlFor="inputext" className="col-form-label">G09 </label>
                        </div>
                        <div className="col-3">
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputname"
                                name="g09"
                                value={g09}
                                onChange={handleInputChange}

                            />
                        </div>

                        <div className="col-2">
                            <label htmlFor="inputext" className="col-form-label">G05 </label>
                        </div>
                        <div className="col-3">
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputname"
                                name="g05"
                                value={g05}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="row mb-3 justify-content-center">
                        <div className="col-2">
                            <label htmlFor="inputext" className="col-form-label">1976 </label>
                        </div>
                        <div className="col-3">
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputname"
                                name="a76"
                                value={a76}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="col-2" >
                            <label htmlFor="inputext" className="col-form-label">1975 </label>
                        </div>
                        <div className="col-3">
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputname"
                                name="a75"
                                value={a75}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="row mb-3 justify-content-center">
                        <div className="col-2">
                            <label htmlFor="inputext" className="col-form-label">7906</label>
                        </div>
                        <div className="col-3">
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputname"
                                name="a06"
                                value={a06}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="col-2">
                            <label htmlFor="inputext" className="col-form-label">7909 </label>
                        </div>
                        <div className="col-3">
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputname"
                                name="a09"
                                value={a09}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="row mb-1 justify-content-center">
                        <div className="col-2">
                            <label htmlFor="inputext" className="col-form-label">0012</label>
                        </div>
                        <div className="col-3">
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputname"
                                name="a12"
                                value={a12}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="col-2">
                            <label htmlFor="inputext" className="col-form-label">0016 </label>
                        </div>
                        <div className="col-3">
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputname"
                                name="a16"
                                value={a16}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="row mb-3 justify-content-center">
                        <div>
                            <label htmlFor="inputext" className="col-form-label">Observaciones </label>
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputname"
                                name="obs"
                                value={obs}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit" >Registrar</button>
                </form>
            </div >
        </div >
    )
}

export default Needle
