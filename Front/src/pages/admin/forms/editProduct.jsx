import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as yup from "yup"
import "../../../styles/scss/admin/createCategory.scss"
import { config, configForm } from '../../../utils/axios';
import axios from "axios"
import previewImage from "../../../resources/admin/preview.jpg"
import { useNavigate, useParams } from 'react-router-dom';
import NavbarAdmin from "../../../components/pure/navbarAdmin"
import backgroundImage from "../../../resources/background1.jpg"
import MultiSelectEdit2 from './formsDispatch/multiSelectEdit2';
import { configSimple } from '../../../utils/axios';
const EditProduct = ({ token, categories, getCategories }) => {

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

    const navigate = useNavigate()
    const { id } = useParams()

    let defaultSelections;

    const [error, setError] = useState(false);
    const [errorImage, setErrorImage] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState()
    const [product, setProduct] = useState()
    const [errorProduct, setErrorProduct] = useState()
    const [category, setCategory] = useState(defaultSelections)
    const [lastCategory, setLastCategory] = useState(defaultSelections)

    useEffect(() => {
        getProduct()
        getCategories()
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
            category: yup.string()
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

    let categoriesSelections = []

    if (categories) {
        categories.map((category) => {
            categoriesSelections.push({
                value: category._id,
                label:
                    (<div>
                        <h6 style={{ color: "black" }}>{category.name} <img style={{ width: "2rem", height: "2rem" }} src={category.imageId.url} alt="Not Found" /></h6>
                    </div>)
            })
        })
    }

    function myCategory() {
        if (categories) {
            categories.map(categoryMap => {
                categoryMap.products.map(product => {
                    if (product._id == id) {
                        setCategory({ value: categoryMap._id })
                        setLastCategory(categoryMap)
                    }
                })
            })
        }
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
                        if (values.category) {
                            setSubmitting(false)
                            axios.get(`${API_URL}/category/${values.category}`, configSimple(token))
                                .then((res) => {
                                    console.log(res.data)
                                    let productsCategory = []
                                    if (res.data.products) {
                                        res.data.products.map((product) => {
                                            productsCategory.push(product._id)
                                        })
                                        console.log(productsCategory)
                                        const body = {
                                            "name": res.data.name,
                                            "isFood": res.data.isFood,
                                            "products": [...productsCategory, id],
                                            "imageId": res.data.imageId._id,
                                        }
                                        console.log(values.category)
                                        axios.put(`${API_URL}/category/${values.category}`, body, config(token))
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

                                        const newProducts = lastCategory.products.filter((item) => item == product._id)

                                        const bodyLastCategory = {
                                            "name": lastCategory.name,
                                            "isFood": lastCategory.isFood,
                                            "products": newProducts,
                                            "imageId": lastCategory.imageId._id,
                                        }
                                        console.log(newProducts)

                                        axios.put(`${API_URL}/category/${category.value}`, bodyLastCategory, config(token))
                                            .then((res) => {
                                                setSubmitting(true)
                                                console.log(res)
                                                setTimeout(() => {
                                                    navigate("../admin/productos")
                                                }, 1000)

                                            })
                                            .catch((e) => {
                                                console.log(e)
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
                    if (values.category) {
                        setSubmitting(false)
                        axios.get(`${API_URL}/category/${values.category}`, configSimple(token))
                            .then((res) => {
                                console.log(res.data)
                                let productsCategory = []
                                if (res.data.products) {
                                    res.data.products.map((product) => {
                                        productsCategory.push(product._id)
                                    })
                                    console.log(productsCategory)
                                    const body = {
                                        "name": res.data.name,
                                        "isFood": res.data.isFood,
                                        "products": [...productsCategory, id],
                                        "imageId": res.data.imageId._id,
                                    }
                                    console.log(values.category)
                                    axios.put(`${API_URL}/category/${values.category}`, body, config(token))
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

                                    const newProducts = lastCategory.products.filter((item) => item == product._id)

                                    const bodyLastCategory = {
                                        "name": lastCategory.name,
                                        "isFood": lastCategory.isFood,
                                        "products": newProducts,
                                        "imageId": lastCategory.imageId._id,
                                    }
                                    console.log(newProducts)

                                    axios.put(`${API_URL}/category/${category.value}`, bodyLastCategory, config(token))
                                        .then((res) => {
                                            setSubmitting(true)
                                            console.log(res)
                                            setTimeout(() => {
                                                navigate("../admin/productos")
                                            }, 1000)

                                        })
                                        .catch((e) => {
                                            console.log(e)
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
                    console.log(e)
                    setError(true)
                })
        }
    }

    return (
        <div className='createCategory' style={{ backgroundImage: `url(${backgroundImage})` }}>
            {
                product
                    ?
                    <div>
                        <div className="navbarCreateCategory">
                            <NavbarAdmin></NavbarAdmin>
                        </div>
                        <h2 className='createCTitle'>Ingresa los datos para editar tu producto</h2>
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

                                            <Field id="description" name="description" type="text" as="textarea" placeholder="Descripcion del producto" className="form-control" />
                                            {
                                                errors.description && touched.description && (
                                                    <div>
                                                        <ErrorMessage component="p" name="description" className='text-error' ></ErrorMessage>
                                                    </div>
                                                )
                                            }

                                            {category
                                                ?
                                                <Field
                                                    name="category"
                                                    id="category"
                                                    placeholder="Selecciona los productos para esta categoria"
                                                    isMulti={false}
                                                    component={MultiSelectEdit2}
                                                    options={categoriesSelections}
                                                    optionsDefault={category}
                                                />
                                                :
                                                <div>
                                                    <Field
                                                        name="category"
                                                        id="category"
                                                        placeholder="Selecciona los productos para esta categoria"
                                                        isMulti={false}
                                                        component={MultiSelectEdit2}
                                                        options={categoriesSelections}
                                                        optionsDefault={{ value: "x" }}
                                                    />
                                                    {myCategory()}
                                                </div>


                                            }


                                            <Field id="price" name="price" type="number" step="0.1" min="0" placeholder="precio del producto" className="form-control" />
                                            {
                                                errors.price && touched.price && (
                                                    <div>
                                                        <ErrorMessage component="p" name="price" className='text-error' ></ErrorMessage>
                                                    </div>
                                                )
                                            }

                                            {submitting ? (<h5 style={{ color: "black" }}>Creando Producto</h5>) : null}
                                            {errorImage ? (<h5 style={{ color: "red" }}>El producto debe tener una imagen</h5>) : <></>}
                                            {error ? (<h5 style={{ color: "red" }}>Opps, hubo un error</h5>) : <></>}

                                            <button type="submit" className='btn btn-dark'>Crear Producto</button>

                                        </Form>)
                                }}
                            </Formik>
                        </div>
                    </div>
                    :
                    errorProduct
                        ?
                        <p style={{ color: "white", fontSize: "3rem" }}>Este producto no existe</p>
                        :
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw" }}>
                            <div class="spinner-border text-white" style={{ width: "10rem", height: "10rem" }} role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
            }

        </div>
    );
}

export default EditProduct;
