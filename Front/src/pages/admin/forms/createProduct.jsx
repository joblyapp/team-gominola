import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as yup from "yup"
import "../../../styles/scss/admin/createCategory.scss"
import { config, configForm } from '../../../utils/axios';
import axios from "axios"
import previewImage from "../../../resources/admin/preview.jpg"
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from "../../../components/pure/navbarAdmin"

const CreateProduct = ({ token }) => {

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

    const navigate = useNavigate()

    const [error, setError] = useState(false);
    const [errorImage, setErrorImage] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState()

    const categorySchema = yup.object().shape(
        {
            name: yup.string().required("Ponle un nombre a la categoria"),
            description: yup.string(),
            price: yup.number().required(),
        }
    )

    const initialValues = {
        name: "",
        description:"",
        price:"00.00"
    }

    const createStorage = async (values) => {
        console.log(values.products)
        if (file !== null) {
            const formData = new FormData()
            formData.append("myfile", file)
            const peticion = axios.post(`${API_URL}/storage/`, formData, configForm(token))
            peticion.then((res) => {
                const body = {
                    "name": values.name,
                    "description": values.description,
                    "price": values.price,
                    "imageId": res.data._id,
                }
                axios.post(`${API_URL}/product/`, body, config(token))
                    .then((res) => {
                        setSubmitting(true)
                        setTimeout(() => {
                            navigate("../admin/productos")
                        }, 1000)
                    })
                    .catch((e) => {
                        console.log(e)
                        setError(true)
                    })
            })
        } else {
            setErrorImage(true)
        }
    }

    return (
        <div className='createCategory'>
            <div className="navbarCreateCategory">
                <NavbarAdmin></NavbarAdmin>
            </div>
            <h2 className='createCTitle'>Ingresa los datos para crear tu categoria</h2>
            <div className='forms'>
                <h2 className='createCTitle'>Foto del producto</h2>
                <form action="" className='form-edit-image'>
                    <input
                        filename={file}
                        onChange={e => {
                            setFile(e.target.files[0])
                            setPreview(URL.createObjectURL(e.target.files[0]))
                        }}
                        type="file"
                        accept="image/*"
                        className='form-control'
                    >
                    </input>
                    <div className='preview'>
                        {preview ? <img className='img-profile img-fluid' src={preview} alt="x" /> : <img className='img-profile img-fluid' src={previewImage} alt="x" />}
                    </div>
                </form>

                <Formik
                    initialValues={
                        initialValues
                    }
                    validationSchema={categorySchema}
                    onSubmit={async (values) => {
                        createStorage(values)
                    }}
                >
                    {/** We obtain props from Formik */}
                    {({ errors, touched, isSubmitting }) => {

                        return (
                            <Form className='form-form'>
                                <Field id="name" name="name" type="text" placeholder="Nombre del producto" className="form-control" />
                                {
                                    errors.name && touched.name && (
                                        <div>
                                            <ErrorMessage component="p" name="name" className='text-error' ></ErrorMessage>
                                        </div>
                                    )
                                }
                                <Field id="description" name="description" type="text" placeholder="Descripcion del producto" className="form-control" />
                                {
                                    errors.description && touched.description && (
                                        <div>
                                            <ErrorMessage component="p" name="description" className='text-error' ></ErrorMessage>
                                        </div>
                                    )
                                }
                                <Field id="price" name="price" type="number" step="0.1"  min="0" placeholder="precio del producto" className="form-control" />
                                {
                                    errors.price && touched.price && (
                                        <div>
                                            <ErrorMessage component="p" name="price" className='text-error' ></ErrorMessage>
                                        </div>
                                    )
                                }
                                <button type="submit" className='btn btn-dark'>Crear Producto</button>
                                {submitting ? (<p style={{ color: "black" }}>Creando Producto</p>) : null}
                                {errorImage ? (<p style={{ color: "red" }}>El producto debe tener una imagen</p>) : <></>}
                                {error ? (<p style={{ color: "red" }}>Opps, hubo un error</p>) : <></>}
                            </Form>)
                    }}
                </Formik>
            </div>

        </div>
    );
}

export default CreateProduct;
