import React, { useEffect, useState } from 'react';
import "../../styles/scss/carta/carta.scss"
import presentation from "../../resources/background-01.jpg"
import NavbarHeight from '../../components/pure/navbarHeight';
import SectionProduct from '../../components/containers/sectionProduct';

const Carta = ({ categories, getCategories }) => {

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className='div-carta'>
            <div className='carta' id="carta" style={{ backgroundImage: `url(${presentation})`, }}>
                <NavbarHeight></NavbarHeight>
                <div className='carta-blur' style={{ backgroundImage: `url(${presentation})`, }}>
                    <h1 className='text-center title' > ¿Qué deseas tomar? </h1>
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

export default Carta;
