import React from 'react';
import "../../styles/scss/home/form.scss"
import formBackground from "../../resources/background-04.jpg"
import { useNavigate } from "react-router-dom"
const Form = () => {

    const MY_URL = process.env.REACT_APP_MY_URL || "http://localhost:3001/api";
    const EMAIL = process.env.REACT_APP_EMAIL || "http://localhost:3001/api";
    const navigate = useNavigate()

    return (
        <div className='div-form' id="form">
            <div className="form" style={{ backgroundImage: `url(${formBackground})` }}>
                <div className="form-background-color">
                    <h1 className='title-form' id="form-title">!Reserva tu mesa!</h1>
                    <div className="row form-contact">
                        <div className="col-12 col-md-6 col-form">
                            <form action={`https://formsubmit.co/${EMAIL}`} method="POST" class="form">
                                <h5>Nombre de orden: </h5>
                                <input className="input-form" type="text" placeholder='Su nombre' name="name" />
                                <h5>Telefono: </h5>
                                <input className="input-form" type="text" placeholder='+57' name="phone" />
                                <h5>Fecha: </h5>
                                <input className="date-form" type="date" name="date" />
                                <h5>Horario: </h5>
                                <input className="date-form" type="time" min="00:00" max="23:59" name="time" />
                                <h5>Personas: </h5>
                                <input type="number" className="date-form" name="people" min="1" defaultValue={1} />
                                <input type="submit" className='btn' value="Hacer mi reserva" data-bs-toggle="modal" data-bs-target="#exampleModal" />
                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5 text-black" id="exampleModalLabel" >Gracias por hacer tu reversa</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <input type="hidden" name="_next" value={`${MY_URL}`} />
                                <input type="hidden" name="_captcha" value="false"></input>

                            </form>
                        </div>

                        <div className="col-12 col-md-6 col-form">
                            <div className="sec-form">
                                <div className="title">
                                    <div className="line"></div>
                                    <div className="text">
                                        <h3>Direccion:</h3>
                                    </div>
                                </div>
                                <div className="text-form">
                                    <h1>Argentina</h1>
                                </div>
                            </div>
                            <div className="sec-form">
                                <div className="title">
                                    <div className="line"></div>
                                    <div className="text">
                                        <h3>Número:</h3>
                                    </div>
                                </div>
                                <div className="text-form">
                                    <h1>+52 (987) 4443-2233</h1>
                                </div>
                            </div>
                            <div className="sec-form">
                                <div className="title">
                                    <div className="line"></div>
                                    <div className="text">
                                        <h5>!Siguenos en nuestras redes!</h5>
                                    </div>
                                </div>
                                <div className="icons">
                                    <a href="https://www.instagram.com/identikit_app/">
                                        <i class="bi bi-instagram"></i>
                                    </a>
                                    <a href="https://www.instagram.com/identikit_app/">
                                        <i class="bi bi-twitter"></i>
                                    </a>
                                    <a href="https://www.facebook.com/IDentiKITapp">
                                        <i class="bi bi-facebook"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Form;
