import React from 'react';
import "../../styles/scss/home/form.scss"
import formBackground from "../../resources/background-04.jpg"
const Form = () => {
    return (
        <div className='div-form' id="form">
            <div className="form" style={{ backgroundImage: `url(${formBackground})` }}>
                <div className="form-background-color">
                    <h1 className='title-form' id="form-title">!Reserva tu mesa!</h1>
                    <div className="row form-contact">
                        <div className="col-12 col-md-6 col-form">
                            <form action="" method="post" className='form' onSubmit={(e) => {

                            }}>
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
                                <input type="submit" className='btn' value={"Hacer mi reserva"} />
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
                                    <h1>Valeluya  Nostra, 1122</h1>
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
                                    <a href="">
                                        <i class="bi bi-instagram"></i>
                                    </a>
                                    <a href="">
                                        <i class="bi bi-twitter"></i>
                                    </a>
                                    <a href="">
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
