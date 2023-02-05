import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as yup from "yup"
import "../../../styles/scss/admin/createCategory.scss"
import { config, configForm } from '../../../utils/axios';
import axios from "axios"
import previewImage from "../../../resources/admin/preview.jpg"
import MultiSelect from './formsDispatch/multiSelect';
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from "../../../components/pure/navbarAdmin"
import backgroundImage from "../../../resources/background1.jpg"

const CreateCategory = ({ token }) => {

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

    const [error, setError] = useState(false);
    const [errorImage, setErrorImage] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [file, setFile] = useState(null)
    const [fileid, setFileiD] = useState(null)
    const [preview, setPreview] = useState()
    const [products, setProducts] = useState()

    const categorySchema = yup.object().shape(
        {
            name: yup.string().required("Ponle un nombre a la categoria"),
            isFood: yup.string().required(),
            products: yup.array()
        })

    const navigate = useNavigate()

    const initialValues = {
        name: "",
        isFood: false,
        products: []
    }

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        axios.get(`${API_URL}/product`, config(token))
            .then((res) => {
                setProducts(res.data)
            }).catch(error => {
                setError(error)
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

    const createStorage = async (values) => {
      
        if (file !== null) {
            const formData = new FormData()
            formData.append("myfile", file)
            const peticion = axios.post(`${API_URL}/storage/`, formData, configForm(token))
            peticion.then((res) => {
                let isFood;

                if (values.isFood === "bebida") {
                    isFood = false;
                } else {
                    isFood = true;
                }

                const body = {
                    "name": values.name,
                    "isFood": isFood,
                    "products": values.products,
                    "imageId": res.data._id
                }
                axios.post(`${API_URL}/category/`, body, config(token))
                    .then((res) => {
                        setSubmitting(true)
                        setTimeout(() => {
                            navigate("../admin/categorias")
                        }, 1000)
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
            <h2 className='createCTitle'>Ingresa los datos para crear la categoria</h2>
            <div className='forms'>
                <h2 className=''>Icono de la categoria</h2>

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
                                    <div className='preview m-3'>
                                        {preview ? <img className='img-profile img-fluid' src={preview} alt="x" /> : <img className='img-profile img-fluid' src={previewImage} alt="x" />}
                                    </div>
                                </form>
                                
                                <div class="check">
                                    <Field class="form-check-input" type="radio" name="isFood" id="exampleRadios1" value="comida" checked />
                                    <label class="form-check-label" for="exampleRadios1">
                                        Comida
                                    </label>
                                </div>
                                <div class="check">
                                    <Field class="form-check-input" type="radio" name="isFood" id="exampleRadios2" value="bebida" />
                                    <label class="form-check-label" for="exampleRadios2">
                                        Bebida
                                    </label>
                                </div>

                                <Field
                                    name="products"
                                    id="products"
                                    placeholder="Selecciona los productos para esta categoria"
                                    isMulti={true}
                                    component={MultiSelect}
                                    options={productSelections}
                                />

                                {
                                    errors.isFood && touched.isFood && (
                                        <div>
                                            <ErrorMessage component="p" name="isFood" className='text-error' ></ErrorMessage>
                                        </div>
                                    )
                                }
                                {submitting ? (<h5 style={{ color: "white" }}>Creando Categoria</h5>) : null}
                                {errorImage ? (<h5 style={{ color: "red" }}>La categoria debe tener una imagen</h5>) : <></>}
                                {error ? (<h5 style={{ color: "red" }}>Opps, hubo un error</h5>) : <></>}
                                <button type="submit" className='btn btn-dark'>Crear categoria</button>
                            </Form>)
                    }}
                </Formik>
            </div>
        </div>
    );
}

export default CreateCategory;
