import React,{useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as yup from "yup"
import "../../styles/scss/admin/login.scss"
import { useNavigate } from 'react-router-dom';

const Login = ({ token, getting, errorState, loginAction }) => {

    const loginSchema = yup.object().shape(
        {
            email: yup.string()
                .email("El formato del Email es invalido")
                .required("El email es necesario"),
            password: yup.string().required("La contraseña es requerida").min(6, "La contraseña es demasiado Corta")
        }
    );


    const initialCredentials = {
        email: "",
        password: "",
    }

    const navigate = useNavigate()

    useEffect(() => {
        if (token){
            navigate("../admin/admin")
        }
    },[token])




    return (
        <div className='login'>
            <h2 className='login-title'>Login para admin de Limes y Limones</h2>
            <div className='forms'>

                <Formik
                    initialValues={
                        initialCredentials
                    }
                    validationSchema={loginSchema}
                    onSubmit={async (values) => {
                        loginAction(values.email, values.password)
                    }}
                >
                    {/** We obtain props from Formik */}
                    {({ errors, touched, isSubmitting }) => {

                        return (
                            <Form className='form-form'>


                                <Field id="email" name="email" type="email" placeholder="Email" className="form-control" />
                                {
                                    errors.email && touched.email && (
                                        <div>
                                            <ErrorMessage component="p" name="email" className='text-error' ></ErrorMessage>
                                        </div>
                                    )
                                }


                                <Field
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    className="form-control"
                                />
                                {
                                    errors.password && touched.password && (
                                        <div>
                                            <ErrorMessage component="p" name="password" className='text-error' ></ErrorMessage>
                                        </div>
                                    )
                                }
                                <button type="submit" className='btn btn-dark'>Login</button>
                                {getting ? (<p>Iniciando Sesion</p>) : null}
                                {errorState === null ? <></> : (<p style={{ color: "red" }}>La contraseña o el usuario son incorrectos</p>)}
                            </Form>)
                    }}
                </Formik>
            </div>

        </div>
    );
}

export default Login;
