import React from "react";

import { useState, useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.min.css'
import Api from "./api";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Redirect, useHistory } from "react-router-dom";
function Login(){

    const [id_card, setid_card] = useState('');
    const [password, setpassword] = useState('');
    const [Loading, setLoading] = useState(false);
    const [validation, setValidation] = useState({});
    const history = useHistory();

    const fetchData = async (event) => {
        event.preventDefault();

        setLoading(true)

        await Api.post('api/v1/auth/login', {id_card, password}, {
            id_card: id_card,
            password: password,
        })
        .then((response) => {
            setLoading(false);

            toast.success('Login Successfully.', {
                duration: 4000,
                position: 'top-right',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#FFF'
                }
            });

            Cookies.set('token', response.data.token);
            Cookies.set('id_card', response.data.data.id_card)
            Cookies.set('name', response.data.data.name);
            Cookies.set('role', response.data.data.role);
            Cookies.set('region', response.data.data.region)

            history.push('/dashboard')
        })
        .catch((error) => {
            setLoading(false);
            setValidation(error.response.data);
        });
    }

    if(Cookies.get('token')){
        return <Redirect to={"/dashboard"}></Redirect>
    }



    return(
        <React.Fragment>
            <div className="container">
            <div className="row justify-content-center">
                <div className="col-4">
                    <h4 className="text-center mb-5">Login</h4>
                </div>
            </div>
                <div className="row justify-content-center">
                    <div className="col-4">
                        <div className="card shadow py-3 px-2">
                            <div className="card-body">
                            <h5 className="text-center mb-3">Login</h5>
                            <hr/>
                            <form className="mt-3"  onSubmit={fetchData}>
                            <label>ID CARD</label>
                            <div className="input-group mb-3">
                                <input className="form-control" type={"text"} placeholder={"ID CARD..."} onChange={(e) => setid_card(e.target.value)}/>
                            </div>
                                {validation.id_card &&(
                                        <div className="alert alert-danger">
                                            {validation.id_card[0]}
                                        </div>
                                    )
                                }
                            <label>PASSWORD</label>
                            <div className="input-group mb-3">
                                <input className="form-control" type={"text"} placeholder={"PASSWORD..."} onChange={(e) => setpassword(e.target.value)}/>
                            </div>
                                {validation.password &&(
                                        <div className="alert alert-danger">
                                            {validation.password[0]}
                                        </div>
                                    )
                                }

                            <button className="btn btn-success w-100" disabled={Loading}>{Loading ? "LOADING..." : "LOGIN"}</button>
                        </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )


}

export default Login;