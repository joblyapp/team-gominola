import React, { useState, useEffect } from 'react';

const SectionProduct = ({ category, seeMoreFunction, seeMore }) => {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    useEffect(() => {
        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener('resize', changeWidth)


        return () => {
            window.removeEventListener('resize', changeWidth)
        }

    }, [])



    function cutDescription(description) {
        return description.substr(0, 40).concat(" ....")
    }

    function comprobar(product) {
        let valor = false
        seeMore.forEach((elementMore, keySee) => {
            if (elementMore.id == product._id && elementMore.valor) {
                valor = true
            }
        })
        return valor

    }







    return (
        <div className='col-carta'>
            {screenWidth < 768
                ?
                <div className="section">
                    <div className="title-section">
                        <h3>{category.name}</h3>
                        <div className="line"></div>
                    </div>
                    <div className="products-section" >
                        {
                            category.products.map((product, key) => {
                                return ((
                                    <div key={key}>
                                        <div>
                                            <button class="nav-link  div-product" onClick={() => {
                                                seeMoreFunction(key, product)
                                            }} id={`${product._id}${category._id}`} data-bs-toggle="pill" data-bs-target={`#v-pills-${product._id}${category._id}`} type="button" role="tab" aria-controls={`v-pills-${product._id}${category._id}`} aria-selected="true">
                                                <div className="title-product">
                                                    <div className='titleP'>
                                                        <img src={category.imageId.url} alt="x" />
                                                        <h3 className='titleP-name text-start'>{product.name}</h3>
                                                    </div>
                                                    <div className="priceP">
                                                        ${product.price.$numberDecimal}
                                                    </div>
                                                </div>
                                                <div className="description">
                                                    {
                                                        product.description.length > 40
                                                            ?
                                                            comprobar(product)
                                                                ?
                                                                <div>
                                                                    <p class="text-description">{product.description}</p>
                                                                    <p class="ver-mas"> Ver menos </p>
                                                                </div>
                                                                :
                                                                <div>
                                                                    <p class="text-description">{cutDescription(product.description)}</p>
                                                                    <p class="ver-mas" > Ver más </p>
                                                                </div>
                                                            :
                                                            <p>{product.description}</p>
                                                    }
                                                </div>
                                            </button>
                                            <div class="tab-content" id={`v-pills${category.name}`}>
                                                <div class="tab-pane fade " id={`v-pills-${product._id}${category._id}`} role="tabpanel" aria-labelledby={`${product._id}${category._id}`} tabIndex="0">
                                                    <img src={product.imageId.url} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            })
                        }
                    </div>
                </div>
                :
                <div className='row row-carta-big'>
                    <div className="section">
                        <div className="title-section">
                            <h3>{category.name}</h3>
                            <div className="line"></div>
                        </div>
                    </div>
                    <div className="col-12 col-md-7 col-carta">
                        <div className="section">
                            <div className="products-section" >
                                {
                                    category.products.map((product, key) => {
                                        return ((
                                            <div key={key}>
                                                <button class="nav-link div-product" onClick={() => {
                                                    seeMoreFunction(key, product)
                                                }} id={`${product._id}${category._id}`} data-bs-toggle="pill" data-bs-target={`#v-pills-${product._id}${category._id}`} type="button" role="tab" aria-controls={`v-pills-${product._id}${category._id}`} aria-selected="true">
                                                    <div className="title-product">
                                                        <div className='titleP'>
                                                            <img src={category.imageId.url} alt="x" />
                                                            <h3 className='titleP-name text-start'>{product.name}</h3>
                                                        </div>
                                                        <div className="priceP">
                                                            ${product.price.$numberDecimal}
                                                        </div>
                                                    </div>
                                                    <div className="description">
                                                        {
                                                            product.description.length > 40
                                                                ?
                                                                comprobar(product)
                                                                    ?
                                                                    <div>
                                                                        <p class="text-description">{product.description}</p>
                                                                        <p class="ver-mas"> Ver menos </p>
                                                                    </div>
                                                                    :
                                                                    <div>
                                                                        <p class="text-description">{cutDescription(product.description)}</p>
                                                                        <p class="ver-mas" > Ver más </p>
                                                                    </div>
                                                                :
                                                                <p>{product.description}</p>
                                                        }
                                                    </div>
                                                </button>
                                            </div>
                                        ))
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-5 col-carta">
                        <div class="tab-content" id={`v-pills${category.name}`}>
                            {
                                category.products.map((product, key) => {
                                    return ((
                                        <div>
                                            <div class="tab-content" id={`v-pills${category.name}`}>
                                                <div class="tab-pane fade " id={`v-pills-${product._id}${category._id}`} role="tabpanel" aria-labelledby={`${product._id}${category._id}`} tabIndex="0">
                                                    <img src={product.imageId.url} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                })
                            }
                        </div>
                    </div>
                </div>
            }
        </div >

    );
}

export default SectionProduct;
