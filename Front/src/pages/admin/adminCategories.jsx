import React, { useEffect } from 'react';
import NavbarAdmin from '../../components/pure/navbarAdmin';
import "../../styles/scss/admin/categories.scss"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { config } from '../../utils/axios';
import NavbarAdminDispatch from '../../components/pure/navbarAdminDispatch';
import backgroundImage from "../../resources/background1.jpg"
const AdminCategories = ({ categories, getCategories, token }) => {

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

    useEffect(() => {
        getCategories()
        console.log(process.env.REACT_APP_API_URL)
    }, [])

    const navigate = useNavigate()

    const reload = () => {
        window.location.reload(true);
    }

    return (
        <div className='div-admin' style={{ backgroundImage:`url(${backgroundImage})`}}>
            <NavbarAdminDispatch></NavbarAdminDispatch>
            <div className="container">
                <div className='section-title'>
                    <h3>Categorias</h3>
                    <button className='btn btn-light' onClick={() => {
                        navigate(`../admin/crear/categoria/`)
                    }}> Crear Categoria </button>
                </div>
                <div className="admin-categories">
                    <div className="row row-categories-admin">
                        {categories
                            ?
                            categories.map((category) => {
                                return ((
                                    <div className="categories col-12 col-md-5 col-xxl-3">
                                        <h1>{category.name}</h1>
                                        <img src={category.imageId.url} alt=""  />
                                        {
                                            category.isFood
                                                ?
                                                <h3>Comidas</h3>
                                                :
                                                <h3>Bebidas</h3>
                                        }
                                        <div className='categories-buttons'>
                                            <button className='btn btn-light' onClick={() => {
                                                navigate(`../admin/editar/categoria/${category._id}`)
                                            }}>Editar </button>
                                            <button className='btn btn-danger' onClick={() => {
                                                axios.delete(`${API_URL}/category/${category._id}`, config(token))
                                                setTimeout(() => {
                                                    reload()
                                                }, 1500)
                                            }} > Eliminar </button>

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

export default AdminCategories;
