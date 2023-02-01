import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as yup from "yup"
import "../../../styles/scss/admin/createCategory.scss"
import { config, configForm, configSimple } from '../../../utils/axios';
import axios from "axios"
import previewImage from "../../../resources/admin/preview.jpg"
import MultiSelectEdit from './formsDispatch/multiSelectEdit';
import { useNavigate, useParams } from 'react-router-dom';
import NavbarAdmin from "../../../components/pure/navbarAdmin"

const EditCategory = ({ token, categories, getCategories }) => {

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

    useEffect(() => {
        getCategories()
        verifyId()
        getProducts()
    }, [])

    

    const [error, setError] = useState(false);
    const [errorImage, setErrorImage] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState()
    const [products, setProducts] = useState()
    const [categorySelect, setCategorySelect] = useState()
    const [errorCategory, setErrorCategory] = useState()

    const { id } = useParams()

    const verifyId = () => {
        axios.get(`${API_URL}/category/${id}`, configSimple(token))
            .then((res) => {
                setCategorySelect(res.data)
                setPreview(res.data.imageId.url)
            }).catch((e) => {
                setCategorySelect(false)
                setErrorCategory(true)
            })
    }
    const categorySchema = yup.object().shape(
        {
            name: yup.string().required("Ponle un nombre a la categoria"),
            isFood: yup.boolean(),
            products: yup.array()
        })

    const navigate = useNavigate()

    let initialValues = {}

    if (categorySelect) {
        initialValues = {
            name: categorySelect.name,
            isFood: categorySelect.isFood,
            products: categorySelect.products
        }
    } else {
        initialValues = {
            name: "",
            isFood: false,
            products: []
        }
    }

    const getProducts = async () => {
        axios.get(`${API_URL}/product`, config(token))
            .then((res) => {
                setProducts(res.data)
            }).catch(error => {
                setProducts(error)
            })
    }

    let productSelections = []

    if (products) {
        products.map((product) => {
            productSelections.push({
                value: product._id,
                label:
                    (<div>
                        <h6 style={{ color: "black" }}>{product.name} <img style={{ width: "2rem", height: "2rem" }} src={product.imageId.url} alt="Not Found" /></h6>
                    </div>)
            })
        })
    }

    let defaultSelections = []


    if (categorySelect) {
        categorySelect.products.map((product) => {
            defaultSelections.push({
                value: product._id,
                label:
                    (<div style={{display:"flex"}}>
                        <h6 style={{ color: "black" }}>{product.name} <img style={{ width: "2rem", height: "2rem" }} src={product.imageId.url} alt="Not Found" /></h6>
                    </div>)
            })
        })
        console.log(defaultSelections)
        console.log(categorySelect.products)
    }
    let body = {}
    const createStorage = async (values) => {
        console.log(values.products)
        if (file !== null) {
            const formData = new FormData()
            formData.append("myfile", file)
            const peticion = axios.post(`${API_URL}/storage/`, formData, configForm(token))
            peticion.then((res) => {
                body = {
                    "name": values.name,
                    "isFood": values.isFood,
                    "products": values.products,
                    "imageId": res.data._id
                }
                axios.put(`${API_URL}/category/${id}`, body, config(token))
                    .then((res) => {
                        setSubmitting(true)
                        setTimeout(() => {
                            navigate("../admin/categorias")
                        }, 1000)
                    })
                    .catch((e) => {
                        console.log(e)
                        setError(true)
                    })
            })
        } else {
            console.log(categorySelect.imageId._id)
            body = {
                "name": values.name,
                "isFood": values.isFood,
                "products": values.products,
                "imageId": categorySelect.imageId._id
            }
            axios.put(`${API_URL}/category/${id}`, body, config(token))
                .then((res) => {
                    setSubmitting(true)
                    setTimeout(() => {
                        navigate("../admin/categorias")
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
                categorySelect
                    ?
                    <div>
                        <div className="navbarCreateCategory">
                            <NavbarAdmin></NavbarAdmin>
                        </div>
                        <h2 className='createCTitle'>Ingresa los datos para editar tu categoria</h2>
                        <div className='forms'>
                            <h2 className='createCTitle'>Icono de la categoria</h2>
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


                                            <Field id="name" name="name" type="text" placeholder="Nombre de la categoria" className="form-control" />
                                            {
                                                errors.name && touched.name && (
                                                    <div>
                                                        <ErrorMessage component="p" name="name" className='text-error' ></ErrorMessage>
                                                    </div>
                                                )
                                            }

                                            <div className="check">
                                                <label class="form-check-label" htmlFor="isFood">
                                                    Es comida?
                                                </label>
                                                <Field
                                                    id="isFood"
                                                    name="isFood"
                                                    placeholder="isFood"
                                                    type="checkbox"
                                                    className="form-check-input"
                                                />
                                            </div>

                                            <Field
                                                name="products"
                                                id="products"
                                                placeholder="Selecciona los productos para esta categoria"
                                                isMulti={true}
                                                component={MultiSelectEdit}
                                                options={productSelections}
                                                optionsDefault={defaultSelections}
                                            />

                                            {
                                                errors.isFood && touched.isFood && (
                                                    <div>
                                                        <ErrorMessage component="p" name="isFood" className='text-error' ></ErrorMessage>
                                                    </div>
                                                )
                                            }
                                            <button button type="submit" className='btn btn-dark'>Actualizar Categoria</button>
                                            {submitting ? (<p style={{ color: "black" }}>Editando Categoria</p>) : null}
                                            {errorImage ? (<p style={{ color: "red" }}>La categoria debe tener una imagen</p>) : <></>}
                                            {error ? (<p style={{ color: "red" }}>Opps, hubo un error</p>) : <></>}
                                        </Form>)
                                }}
                            </Formik>
                        </div>

                    </div>
                    :
                    errorCategory
                        ?
                        <p style={{ color: "black", fontSize: "3rem" }}>Esta categoria no existe</p>
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

export default EditCategory;
