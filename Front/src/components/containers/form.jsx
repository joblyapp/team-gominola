import React, { useState } from 'react';
import "../../styles/scss/home/form.scss"
import formBackground from "../../resources/background-04.jpg"
import { useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import axios from "axios"
import * as yup from "yup"

const FormContact = () => {

    const MY_URL = process.env.REACT_APP_MY_URL || "http://localhost:3001/api";
    const EMAIL = process.env.REACT_APP_EMAIL || "carlosjose445566@gmail.com";
    const navigate = useNavigate()

    var now = new Date()
    var minDate = now.toISOString().substring(0, 10);
    const [HorarioError, setHorarioError] = useState();

    const ContactSchema = yup.object().shape(
        {
            name: yup.string()
                .min(3, "Tú nombre debe tener minimo 3 caracteres")
                .required("Indicanos tú nombre para hacer la reservación"),
            telefono: yup.string()
                .max(10, "Ingresa un numero de telefono valido")
                .min(10, "Ingresa un numero de telefono valido")
                .required("Indícanos un número de teléfono para comunicarnos contigo"),
            fecha: yup.date()
                .required("Indícanos el día de la reservación"),
            horario: yup.string()
                .required("Indícanos la hora para la reservación"),
            personas: yup.string()
                .required("Indícanos la cantidad de persona para la reservación"),
        })

    const initialValues = {
        name: "",
        telefono: "",
        fecha: "",
        horario: "",
        personas: "1",
    }

    return (
        <div className='div-form' id="form">
            <div className="form" style={{ backgroundImage: `url(${formBackground})` }}>
                <div className="form-background-color">
                    <h1 className='title-form' id="form-title">!Reserva tu mesa!</h1>
                    <div className="row form-contact">
                        <div className="col-12 col-md-6 col-form">
                            <Formik
                                initialValues={
                                    initialValues
                                }
                                validationSchema={ContactSchema}
                                onSubmit={async (values) => {
                                    const horarioPrev = values.horario
                                    const horarioNew = horarioPrev.split(":").shift()
                                    const horarioNumber = parseInt(horarioNew)
                                    console.log(horarioNumber)
                                    if (horarioNumber > 17 && horarioNumber < 24) {
                                        setHorarioError(false)
                                        axios.defaults.headers.post['Content-Type'] = 'application/json';
                                        axios.post(`https://formsubmit.co/ajax/${EMAIL}`, {
                                            name: values.name,
                                            telefono: values.telefono,
                                            fecha: values.fecha,
                                            horario: values.horario,
                                            personas: values.personas,
                                        })
                                            .then(response => console.log(response))
                                            .catch(error => console.log(error));
                                    } else {
                                        setHorarioError(true)
                                    }
                                }}
                            >
                                {/** We obtain props from Formik */}
                                {({ errors, touched, isSubmitting }) => {

                                    return (
                                        <Form className='form' action={`https://formsubmit.co/${EMAIL}`} method="POST">
                                            <div className="field">
                                                <Field id="name" name="name" type="text" placeholder="Nombre para la reserva" className="input-form" />
                                                {
                                                    errors.name && touched.name && (
                                                        <div>
                                                            <ErrorMessage component="p" name="name" className='text-error' ></ErrorMessage>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className="field">
                                                <Field id="telefono" name="telefono" type="number" placeholder="Telefono para la reserva" className="input-form" />
                                                {
                                                    errors.telefono && touched.telefono && (
                                                        <div>
                                                            <ErrorMessage component="p" name="telefono" className='text-error' ></ErrorMessage>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className="field form-date">
                                                <label class="form-date__label">Fecha </label>
                                                <Field id="fecha" name="fecha" type="date" className="form-date__input" min={minDate} />
                                                {
                                                    errors.fecha && touched.fecha && (
                                                        <div>
                                                            <ErrorMessage component="p" name="fecha" className='text-error' ></ErrorMessage>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className="field form-date">
                                                <label class="form-date__label">Hora</label>
                                                <Field id="horario" name="horario" type="time" className="form-date__input" min="14:00:00" />
                                                {
                                                    errors.horario && touched.horario && (
                                                        <div>
                                                            <ErrorMessage component="p" name="horario" className='text-error' ></ErrorMessage>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    HorarioError
                                                        ?
                                                        <p>El horario disponible para reservar es de 5 a 11:59 pm</p>
                                                        :
                                                        <></>
                                                }
                                            </div>
                                            <div className="field form-date">
                                                <Field name="personas" as="select" className="form-select__input">
                                                    <option className="option" value="1" selected>1 persona</option>
                                                    <option className="option" value="2">2 personas</option>
                                                    <option value="3">3 personas</option>
                                                    <option value="4">4 personas</option>
                                                    <option value="5">5 personas</option>
                                                    <option value="6-10">Entre 6 y 10 personas</option>
                                                    <option value="11-15">Entre 11 y 15 personas</option>
                                                    <option value="16-20">Entre 16 y 20 personas</option>
                                                    <option value="+20">Más de 20 personas</option>
                                                </Field>
                                                {
                                                    errors.personas && touched.personas && (
                                                        <div>
                                                            <ErrorMessage component="p" name="personas" className='text-error' ></ErrorMessage>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <input type="submit" className='btn' value="Reservar" data-bs-toggle="modal" data-bs-target="#exampleModal" />
                                            {errors.name || errors.telefono || errors.fecha || errors.horario || errors.personas || HorarioError
                                                ?
                                                <div className="">
                                                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                        <div class="modal-dialog">
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <h1 class="modal-title fs-5 text-black" id="exampleModalLabel" >Te falta algun dato o algun dato esta mal, porfavor corrigelo</h1>
                                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                <div className="">
                                                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                        <div class="modal-dialog">
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <h1 class="modal-title fs-5 text-black" id="exampleModalLabel">Gracias por hacer tú reserva, te esperamos</h1>
                                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>}
                                        </Form>)
                                }}
                            </Formik>
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

export default FormContact;
