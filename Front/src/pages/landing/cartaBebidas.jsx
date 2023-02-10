import React, { useEffect, useState } from 'react';
import "../../styles/scss/carta/carta.scss"
import presentation from "../../resources/fondo-carta.jpg"
import SectionProduct from '../../components/containers/sectionProduct';
import Navbar from '../../components/pure/navbar';

const CartaBebidas = ({ categories, getCategories }) => {

    useEffect(() => {
        getCategories()
        if (categories) {
            seeMoreArray(categories)
        }
    }, [])

    let array = []

    const [seeMore, setSeeMore] = useState([]);

    function seeMoreFunction(keyProduct, product) {
        seeMore.forEach((elementMore, keySee) => {

            if (elementMore.id === product._id) {
                array.push({ id: product._id, valor: true })
            } else{
                array.push({ id: elementMore.id, valor:false})
            }
        })
        setSeeMore(array)
    }

    function seeMoreArray(categories) {
        categories.map((category) => {
            category.products.forEach((element, key) => {
                array.push({ id: element._id, valor: false })
            });
        })
        setSeeMore(array)

    }


    return (
        <div className='div-carta' style={{ backgroundImage: `url(${presentation})` }}>
            <Navbar></Navbar>
            <div className='carta' id="carta" style={{ backgroundImage: `url(${presentation})` }}>
                <div className='carta-blur' style={{ backgroundImage: `url(${presentation})` }}>
                    <h1 className='text-center title'>¿Qué deseas tomar?</h1>
                    <div className="row row-carta">
                        <div className="nav-pills" id={`v-pills-tab`} role="tablist" aria-orientation="vertical" >
                            {categories
                                ?
                                categories.map((category) => {
                                    return ((
                                        !category.isFood ? <SectionProduct category={category} seeMoreFunction={seeMoreFunction} seeMore={seeMore}></SectionProduct> : <></>
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
        </div>
    );
}

export default CartaBebidas;
