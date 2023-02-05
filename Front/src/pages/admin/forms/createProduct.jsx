import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as yup from "yup"
import "../../../styles/scss/admin/createCategory.scss"
import { config, configForm } from '../../../utils/axios';
import axios from "axios"
import previewImage from "../../../resources/admin/preview.jpg"
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from "../../../components/pure/navbarAdmin"
import backgroundImage from "../../../resources/background1.jpg"
import MultiSelect from './formsDispatch/multiSelect';
import { configSimple } from '../../../utils/axios';
const CreateProduct = ({ token, categories, getCategories }) => {

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

    const navigate = useNavigate()

    useEffect(() => {
        getCategories()
    }, []);

    const [error, setError] = useState(false);
    const [errorImage, setErrorImage] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState()

    const productSchema = yup.object().shape(
        {
            name: yup.string().required("Ponle un nombre al producto"),
            description: yup.string().max(200, "La descripción de un producto debe ser de maximo 200 caracteres"),
            price: yup.number().required().max(10000000, "El precio maximo de un producto puede ser 10000000"),
            category: yup.string()
        }
    )

    const initialValues = {
        name: "",
        description: "",
        price: "00.00",
        categories: categories
    }

    let categoriesSelections = []

    if (categories) {
        categories.map((product) => {
            categoriesSelections.push({
                value: product._id,
                label:
                    (<div>
                        <h6 style={{ color: "black" }}>{product.name} <img style={{ width: "2rem", height: "2rem" }} src={product.imageId.url} alt="Not Found" /></h6>
                    </div>)
            })
        })
    }




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
                axios.post(`${API_URL}/product/`, body, config(token))
                    .then((res) => {
                        setSubmitting(true)
                        
                        let productIdd = res.data._id

                        if (values.category) {
                            setSubmitting(false)
                            axios.get(`${API_URL}/category/${values.category}`, configSimple(token))
                                .then((res) => {

                                    let productsCategory = []
                                    if (res.data.products) {
                                        res.data.products.map((product) => {
                                            productsCategory.push(product._id)
                                        })
                                      
                                        const body = {
                                            "name": res.data.name,
                                            "isFood": res.data.isFood,
                                            "products": [...productsCategory, productIdd],
                                            "imageId": res.data.imageId._id,
                                        }
                                       
                                        axios.put(`${API_URL}/category/${values.category}`, body, config(token))
                                            .then((res) => {
                                                setSubmitting(true)
                                                setTimeout(() => {
                                                    navigate("../admin/productos")
                                                }, 1000)
                                                
                                            })
                                            .catch((e) => {
                                              
                                                setError(true)
                                            })
                                    }
                                }).catch((e) => {
                                    setError(true)
                                })
                        } else {
                            setSubmitting(true)
                            setTimeout(() => {
                                navigate("../admin/productos")
                            }, 1000)
                        }
                    })
                    .catch((e) => {
                        
                        setError(true)
                    })
            })
        } else {
            setErrorImage(true)
        }
    }

    return (
        <div className='createCategory' style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="navbarCreateCategory">
                <NavbarAdmin></NavbarAdmin>
            </div>
            <h2 className='createCTitle'>Ingresa los datos para crear tu categoria</h2>
            <div className='forms'>

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

                                <h2 className=''>Foto del producto</h2>
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
                                    <div className='preview m-2'>
                                        {preview ? <img className='img-profile img-fluid' src={preview} alt="x" /> : <img className='img-profile img-fluid' src={previewImage} alt="x" />}
                                    </div>
                                </form>

                                <Field id="price" name="price" type="number" step="0.1" min="0" placeholder="precio del producto" className="form-control" />
                                {
                                    errors.price && touched.price && (
                                        <div>
                                            <ErrorMessage component="p" name="price" className='text-error' ></ErrorMessage>
                                        </div>
                                    )
                                }

                                <Field
                                    name="category"
                                    id="category"
                                    placeholder="Selecciona la categoria para este producto"
                                    isMulti={false}
                                    component={MultiSelect}
                                    options={categoriesSelections}
                                />

                                <Field id="description" name="description" as="textarea" placeholder="Descripcion del producto" className="form-control" />
                                {
                                    errors.description && touched.description && (
                                        <div>
                                            <ErrorMessage component="p" name="description" className='text-error' ></ErrorMessage>
                                        </div>
                                    )
                                }
                                {submitting ? (<h5 style={{ color: "white" }}>Creando Producto</h5>) : null}
                                {errorImage ? (<h5 style={{ color: "red" }}>El producto debe tener una imagen</h5>) : <></>}
                                {error ? (<h5 style={{ color: "red" }}>Opps, hubo un error</h5>) : <></>}

                                <button type="submit" className='btn btn-dark'>Crear Producto</button>

                            </Form>)
                    }}
                </Formik>
            </div>

        </div>
    );
}

export default CreateProduct;
