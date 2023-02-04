import React, { useEffect, useState } from 'react';
import "../../styles/scss/carta/carta.scss"
import presentation from "../../resources/fondo-carta.jpg"
import SectionProduct from '../../components/containers/sectionProduct';
import Navbar from '../../components/pure/navbar';

const CartaBebidas = ({ categories, getCategories }) => {

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className='div-carta'  style={{ backgroundImage: `url(${presentation})`}}>
        <Navbar></Navbar>
            <div className='carta' id="carta" style={{ backgroundImage: `url(${presentation})`}}>
                <div className='carta-blur' style={{ backgroundImage: `url(${presentation})`}}>
                    <h1 className='text-center title'>¿Qué deseas tomar?</h1>
                    <div className="row row-carta">
                        {categories
                            ?
                            categories.map((category) => {
                                return ((
                                    !category.isFood ? <SectionProduct category={category}></SectionProduct> : <></>
                                ))
                            })
                            :
                            <div class="spinner-border text-light" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartaBebidas;
