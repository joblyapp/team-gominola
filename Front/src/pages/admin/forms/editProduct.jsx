import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as yup from "yup"
import "../../../styles/scss/admin/createCategory.scss"
import { config, configForm } from '../../../utils/axios';
import axios from "axios"
import previewImage from "../../../resources/admin/preview.jpg"
import { useNavigate, useParams } from 'react-router-dom';
import NavbarAdmin from "../../../components/pure/navbarAdmin"

const EditProduct = ({ token }) => {

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

    const navigate = useNavigate()
    const { id } = useParams()

    const [error, setError] = useState(false);
    const [errorImage, setErrorImage] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState()
    const [product, setProduct] = useState()
    const [errorProduct, setErrorProduct] = useState()

    useEffect(() => {
        getProduct()
    }, [])

    const getProduct = async () => {
        axios.get(`${API_URL}/product/${id}`, config(token))
            .then((res) => {
                setProduct(res.data)
                setPreview(res.data.imageId.url)
            }).catch(error => {
                setErrorProduct(true)
            })
    }

    const productSchema = yup.object().shape(
        {
            name: yup.string().required("Ponle un nombre a la categoria"),
            description: yup.string(),
            price: yup.number().required(),
        }
    )

    let initialValues = {}

    if (product) {
        initialValues = {
            name: product.name,
            description: product.description,
            price: product.price.$numberDecimal
        }
    } else {
        initialValues = {}
    }

    let body = {}

    const createStorage = async (values) => {
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
                axios.put(`${API_URL}/product/${id}`, body, config(token))
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
            console.log(product.imageId._id)
            body = {
                "name": values.name,
                "description": values.description,
                "price": values.price,
                "imageId": product.imageId._id,
            }
            axios.put(`${API_URL}/product/${id}`, body, config(token))
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
        }
    }

    return (
        <div className='createCategory'>
            {
                product
                    ?
                    <div>
                        <div className="navbarCreateCategory">
                            <NavbarAdmin></NavbarAdmin>
                        </div>
                        <h2 className='createCTitle'>Ingresa los datos para editar tu producto</h2>
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
                                validationSchema={productSchema}
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
                                            <Field id="price" name="price" type="number" step="0.1" min="0" placeholder="precio del producto" className="form-control" />
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
                    :
                    errorProduct
                        ?
                        <p style={{ color: "black", fontSize: "3rem" }}>Este producto no existe</p>
                        :
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw" }}>
                            <div class="spinner-border text-dark" style={{ width: "10rem", height: "10rem" }} role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
            }

        </div>
    );
}

export default EditProduct;
