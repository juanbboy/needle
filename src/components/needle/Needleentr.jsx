import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import axios from 'axios';
import Swal from 'sweetalert2';


const Needleentr = () => {
    const navigate = useNavigate()
    // const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui);
    const [formValues, handleInputChange, reset] = useForm({
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
    // const [nam, setNam] = useState("");
    const { g09, g05, a76, a75, a06, a09, a12, a16, obs } = formValues;


    const handleRegister = (e) => {
        e.preventDefault();
        axios.post(`https://bakend.vercel.app/api/regneedleentr`, formValues)
            // axios.post(`http://localhost:4002/api/regneedleentr`, formValues)
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'correcto',
                    showConfirmButton: false,
                    timer: 1200
                })
                reset();
                navigate("/needleresentr")
            })
    }

    return (
        <div className="row justify-content-center ">
            <div className="col-md-5 px-5 ">
                <h4 className="text-center p-3">Registro de Entrada</h4>
                <form onSubmit={handleRegister}>
                    {
                        msgError && (
                            <div className="alert alert-danger" role="alert">
                                {msgError}
                            </div>
                        )
                    }
                    <div className='caja'>
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
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit" >Registrar</button>
                </form>
            </div >
        </div >
    )
}

export default Needleentr
