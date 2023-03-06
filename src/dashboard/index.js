/* eslint-disable no-unused-vars */
//import react  
import React, { useEffect, useState } from "react";

import NavBar from "./navbar";

import "bootstrap/dist/js/bootstrap"
import Cookies from "js-cookie";
import Api from "../api";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";

function Dashboard() {

    // =================================== Fungsi Consultation ===================================

        const token = Cookies.get('token');

        const [disease_history, setDiease_History] = useState('');
        const [current_symptoms, setCurrent_Symptoms] = useState('');
        const [user_id, setUser_Id] = useState('');
        const [name, setName] = useState('');
        const [validation, setValidation] = useState({});
        const history = useHistory();
        const [Loading, setLoading] = useState(false);

        const request = async (e) => {
            e.preventDefault();

            setLoading(true);
            await Api.post('api/v1/auth/consultations', {disease_history , current_symptoms , user_id , name}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                toast.success("Consultations Successful Send", {
                    duration: 400,
                    position: "top-right",
                    style: {
                        borderRadius: "10px",
                        background: '#333',
                        color: '#fff'
                    }
                });
                history.push('/dashboard')
            })
            .catch(error => {
                setLoading(false)

                setValidation(error.response.data);
            });
        }

    // =================================== Fungsi Consultation ===================================








    return(
        <React.Fragment>
            <NavBar></NavBar>
            <div className="container">
                <div className="row">
                    <div className="col-5">
                        <div className="card">
                            <div className="card-header">
                                <h4>Request Vaccination</h4>
                            </div>
                            <div className="card-body">
                            <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">+Request Consultations</a>


                            {/* Modal */}
                            
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Request Consultation</h1>
                                </div>
                                <div class="modal-body">
                                    <form onSubmit={request}>
                                    <div class="mb-3">
                                        <label for="recipient-name" class="col-form-label">Disease History:</label>
                                        <input type="hidden" class="form-control" onChange={(e) => setName(e.target.value)} value={Cookies.get('name')}/>
                                        <input type="hidden" class="form-control" onChange={(e) => setUser_Id(e.target.value)} value={Cookies.get('id_card')}/>
                                        <input type="text" class="form-control" value={disease_history} onChange={(e) => setDiease_History(e.target.value)} placeholder="Disease History..."/>
                                        {validation.disease_history &&(
                                        <div className="alert alert-danger">
                                            {validation.disease_history[0]}
                                        </div>
                                    )
                                }
                                    </div>
                                    <div class="mb-3">
                                        <label for="message-text" class="col-form-label">Current Symptoms</label>
                                        <input type={"text"} class="form-control" value={current_symptoms} onChange={(e) => setCurrent_Symptoms(e.target.value)} placeholder="Current Symptoms..."></input>
                                        {validation.current_symptoms &&(
                                        <div className="alert alert-danger">
                                            {validation.current_symptoms[0]}
                                        </div>
                                    )
                                }
                                    </div>
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary" disabled={Loading}>{Loading ? "Send..." : "Send"}</button>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                </div>
                                </div>
                            </div>
                            </div>

                            {/* modal */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}

export default Dashboard