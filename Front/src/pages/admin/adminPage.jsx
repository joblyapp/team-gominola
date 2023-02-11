import React from 'react';
import "../../styles/scss/admin/admin.scss"
import categoriesImage from "../../resources/categories.png"
import productsImage from "../../resources/products.png"
import { useNavigate } from 'react-router-dom';
import NavbarAdminDispatch from '../../components/pure/navbarAdminDispatch';
import backgroundImage from "../../resources/background1.jpg"
const AdminPage = () => {

    const navigate = useNavigate();

    return (
        <div className='admin' style={{ backgroundImage: `url(${backgroundImage})` }}>
            <NavbarAdminDispatch></NavbarAdminDispatch>
            <div className="title">
                <h2 className='admin-title'>Panel de administracion Limes y limones</h2>
                <h6 className='admin-title'>Elige si quieres ver, crear, editar o eliminar un producto o una categoria</h6>
            </div>
            <div className="container">
                <button className="reservation"
                    onClick={() => {
                        navigate("../admin/reservaciones");
                    }}>
                    <h1>Reservaciones</h1>
                </button>
                <div className="row row-admin">
                    <button className="col-12 col-md-6 col-admin categories"
                        onClick={() => {
                            navigate("../admin/categorias");
                        }}>
                        <h1>Categorias</h1>
                        <img src={categoriesImage} className="img-fluid" alt="Not Found Image" />
                    </button>
                    <button className="col-12 col-md-6 col-admin products"
                        onClick={() => {
                            navigate("../admin/productos");
                        }}>
                        <h1>Productos</h1>
                        <img src={productsImage} className="img-fluid" alt="Not Found Image" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
