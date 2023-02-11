import React, { useEffect, useState } from 'react';
import "../../styles/scss/carta/carta.scss"
import presentation from "../../resources/fondo-carta.jpg"
import Navbar from '../../components/pure/navbar';
import CartaLoadersBebidas from '../../pages/landing/cartaLoadersBebidas';
import Footer from '../../components/containers/footer';
const CartaBebidas = ({ categories, getCategories }) => {

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className='div-carta' style={{ backgroundImage: `url(${presentation})` }}>
            <Navbar></Navbar>
            <h1 className='text-center title-carta'>¿Qué deseas tomar?</h1>
            <div className="container" >
                <div className='carta-blur' >
                    <div className='row row-carta'>
                        <div className="nav-pills" id={`v-pills-tab`} role="tablist" aria-orientation="vertical" >
                            {categories
                                ?
                                <CartaLoadersBebidas categories={categories} ></CartaLoadersBebidas>
                                :
                                <div class="spinner-border text-light" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartaBebidas;