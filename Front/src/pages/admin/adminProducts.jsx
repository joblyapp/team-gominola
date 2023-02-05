import React, { useEffect, useState } from 'react';
import "../../styles/scss/admin/categories.scss"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { config } from '../../utils/axios';
import NavbarAdminDispatch from '../../components/pure/navbarAdminDispatch';
import backgroundImage from "../../resources/background1.jpg"
const AdminProducts = ({ token,getCategories }) => {

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

    const [products, setProducts] = useState()

    useEffect(() => {
        getProducts()
        getCategories()
    }, [])

    const navigate = useNavigate()

    const reload = () => {
        window.location.reload(true);
    }

    const getProducts = async () => {
        axios.get(`${API_URL}/product`, config(token))
            .then((res) => {
                setProducts(res.data)
            }).catch(error => {
                setProducts(error)
            })
    }

    return (
        <div className='div-admin' style={{ backgroundImage:`url(${backgroundImage})`}}>
            <NavbarAdminDispatch></NavbarAdminDispatch>
            <div className="container">
                <div className='section-title'>
                    <h3>Productos</h3>
                    <button className='btn btn-light' onClick={() => {
                        navigate(`../admin/crear/producto/`)
                    }}> Crear Producto</button>
                </div>
                <div className="admin-categories">
                    <div className="row row-categories-admin">
                        {products
                            ?
                            products.map((product) => {
                                return ((
                                    <div className="categories col-12 col-md-5 col-xxl-3">
                                        <div>
                                            <p style={{ fontSize: "2rem" }} >{product.name}  ${product.price.$numberDecimal} </p>
                                        </div>
                                        <img className='img-product' src={product.imageId.url} alt="" />
                                        <div className='categories-buttons'>
                                            <button className='btn btn-light' onClick={() => {
                                                navigate(`../admin/editar/producto/${product._id}`)
                                            }}> Editar</button>
                                            <button className='btn btn-danger' onClick={() => {
                                                axios.delete(`${API_URL}/product/${product._id}`, config(token))
                                                setTimeout(() => {
                                                    reload()
                                                }, 1500)
                                            }} > Eliminar</button>

                                        </div>
                                    </div>
                                ))
                            })
                            :
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw" }}>
                                <div class="spinner-border text-light" style={{ width: "10rem", height: "10rem" }} role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminProducts;
