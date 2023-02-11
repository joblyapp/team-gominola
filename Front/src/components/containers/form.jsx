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

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

    var now = new Date()
    var minDate = now.toISOString().substring(0, 10);
    const [HorarioError, setHorarioError] = useState();
    const [HorarioPastError, setHorarioPastError] = useState();
    const [SundayError, setSundayError] = useState();


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
                    <h1 className='title-form' id="form-title">¡Reserva tu mesa!</h1>
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
                                    const horarioNewMinutes = horarioPrev.split(":").pop()
                                    const horarioNumber = parseInt(horarioNew)
                                    const minsNumber = parseInt(horarioNewMinutes)
                                    const month = now.getMonth() + 1
                                    const day = now.getDate()
                                    const fechaReservation = values.fecha
                                    const dayName = new Date(fechaReservation).getDay() + 1
                                    const monthReservation = values.fecha.split("-").slice(1, 2).toString()
                                    const dayReservation = values.fecha.split("-").pop()

                                    if (horarioNumber >= 17) {
                                        setHorarioError(false)
                                        if (dayName != 7) {
                                            if (month == monthReservation && day == dayReservation) {
                                                if ((horarioNumber == now.getHours() && minsNumber > now.getMinutes())
                                                    || horarioNumber > now.getHours()) {
                                                    setHorarioError(false)
                                                    setHorarioPastError(false)
                                                    setSundayError(false)
                                                    axios.defaults.headers.post['Content-Type'] = 'application/json';
                                                    axios.post(`${API_URL}/reservation/`, {
                                                        name: values.name,
                                                        phone: values.telefono,
                                                        dateR: values.fecha.split("T").pop(),
                                                        hourR: values.horario.toString(),
                                                        people: values.personas,
                                                    })
                                                } else {
                                                    setHorarioPastError(true)
                                                }
                                            } else {
                                                setSundayError(false)
                                                setHorarioError(false)
                                                setHorarioPastError(false)
                                                console.log(values.fecha.split("T").pop())
                                                console.log(values.horario.toString())
                                                axios.post(`${API_URL}/reservation/`, {
                                                    name: values.name,
                                                    phone: values.telefono,
                                                    dateR: values.fecha.split("T").pop(),
                                                    hourR: values.horario.toString(),
                                                    people: values.personas,
                                                }).then().catch(e => console.log(e))
                                            }
                                        } else if (dayName == 7) {
                                            setSundayError(true)
                                        }
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
                                                <Field id="name" name="name" type="text" placeholder="Nombre para la reserva" maxlength="30" className="input-form" />
                                                {
                                                    errors.name && touched.name && (
                                                        <div>
                                                            <ErrorMessage component="p" name="name" className='text-error' ></ErrorMessage>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className="field">
                                                <Field id="telefono" name="telefono" type="number" placeholder="Telefono para la reserva"
                                                    onInput={
                                                        (e) => {
                                                            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10);
                                                        }}
                                                    className="input-form phone" />
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
                                                <Field id="horario" name="horario" type="time" className="form-date__input" />
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
                                                        <p>El horario de reserva es de 17:00 a 23:59 Horas.</p>
                                                        :
                                                        <></>
                                                }
                                                {
                                                    HorarioPastError
                                                        ?
                                                        <p>Las reservas para hoy deben ser en un horario futuro</p>
                                                        :
                                                        <></>
                                                }
                                                {
                                                    SundayError
                                                        ?
                                                        <p>Los domingos no abre nuestro bar</p>
                                                        :
                                                        <></>
                                                }
                                            </div>
                                            <div className="field form-date">
                                                <Field name="personas" as="select" className="form-select__input">
                                                    <option className="option" value="1 Persona" selected>1 persona</option>
                                                    <option className="option" value="2 Personas">2 personas</option>
                                                    <option value="3 Personas">3 personas</option>
                                                    <option value="4 Personas">4 personas</option>
                                                    <option value="5 Personas">5 personas</option>
                                                    <option value="De 6 a 10 Personas">Entre 6 y 10 personas</option>
                                                    <option value="De 11 a 15 Personas">Entre 11 y 15 personas</option>
                                                    <option value="De 16 a 20 Personas">Entre 16 y 20 personas</option>
                                                    <option value="Más de 20 Personas">Más de 20 personas</option>
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
                                            {errors.name || errors.telefono || errors.fecha || errors.horario || errors.personas || HorarioError || HorarioPastError || SundayError
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
                                        <h3>Dirección:</h3>
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
                                        <h5>¡Siguenos en nuestras redes!</h5>
                                    </div>
                                </div>
                                <div className="icons text-center">
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
