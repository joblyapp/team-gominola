import React, { useState, useEffect } from 'react';

const SectionProduct = ({ category }) => {


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



    return (
        <div className='col-carta'>
            {screenWidth < 768
                ?
                <div className="section">
                    <div className="title-section">
                        <h3>{category.name}</h3>
                        <div className="line"></div>
                    </div>
                    <div className="products-section nav-pills" id={`v-pills-tab${category.name}`} role="tablist" aria-orientation="vertical" >
                        {
                            category.products.map((product, key) => {
                                return ((
                                    <div>
                                        {key === 0
                                            ?
                                            <div>
                                                <button class="nav-link active div-product" id={`${product._id}`} data-bs-toggle="pill" data-bs-target={`#v-pills-${product._id}`} type="button" role="tab" aria-controls={`v-pills-${product._id}`} aria-selected="true">
                                                    <div className="title-product">
                                                        <div className='titleP'>
                                                            <img src={category.imageId.url} alt="x" />
                                                            <h3>{product.name}</h3>
                                                        </div>
                                                        <div className="priceP">
                                                            ${product.price.$numberDecimal}
                                                        </div>
                                                    </div>
                                                    <div className="description">
                                                        <p>{product.description}</p>
                                                    </div>
                                                </button>
                                                <div class="tab-content" id={`v-pills${category.name}`}>
                                                    <div class="tab-pane fade show active " id={`v-pills-${product._id}`} role="tabpanel" aria-labelledby={`${product._id}`} tabIndex="0">
                                                        <img src={product.imageId.url} alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            <div>
                                                <button class="nav-link  div-product" id={`${product._id}`} data-bs-toggle="pill" data-bs-target={`#v-pills-${product._id}`} type="button" role="tab" aria-controls={`v-pills-${product._id}`} aria-selected="true">
                                                    <div className="title-product">
                                                        <div className='titleP'>
                                                            <img src={category.imageId.url} alt="x" />
                                                            <h3>{product.name}</h3>
                                                        </div>
                                                        <div className="priceP">
                                                            ${product.price.$numberDecimal}
                                                        </div>
                                                    </div>
                                                    <div className="description">
                                                        <p>{product.description}</p>
                                                    </div>
                                                </button>
                                                <div class="tab-content" id={`v-pills${category.name}`}>
                                                    <div class="tab-pane fade " id={`v-pills-${product._id}`} role="tabpanel" aria-labelledby={`${product._id}`} tabIndex="0">
                                                        <img src={product.imageId.url} alt="" />
                                                    </div>
                                                </div>
                                            </div>}
                                    </div>
                                ))
                            })
                        }
                    </div>
                </div>
                :
                <div className='row row-carta'>
                    <div className="col-12 col-md-6 col-carta">
                        <div className="section">
                            <div className="title-section">
                                <h3>{category.name}</h3>
                                <div className="line"></div>
                            </div>
                            <div class="products-section flex-column nav-pills me-3" id={`v-pills-tab${category.name}`} role="tablist" aria-orientation="vertical">
                                {
                                    category.products.map((product, key) => {
                                        return ((
                                            <div>
                                                {key === 0
                                                    ?
                                                    <button class="nav-link active div-product" id={`${product._id}`} data-bs-toggle="pill" data-bs-target={`#v-pills-${product._id}`} type="button" role="tab" aria-controls={`v-pills-${product._id}`} aria-selected="true">
                                                        <div className="title-product">
                                                            <div className='titleP'>
                                                                <img src={category.imageId.url} alt="x" />
                                                                <h3>{product.name}</h3>
                                                            </div>
                                                            <div className="priceP">
                                                                ${product.price.$numberDecimal}
                                                            </div>
                                                        </div>
                                                        <div className="description">
                                                            <p>{product.description}</p>
                                                        </div>
                                                    </button>
                                                    :
                                                    <button class="nav-link  div-product" id={`${product._id}`} data-bs-toggle="pill" data-bs-target={`#v-pills-${product._id}`} type="button" role="tab" aria-controls={`v-pills-${product._id}`} aria-selected="true">
                                                        <div className="title-product">
                                                            <div className='titleP'>
                                                                <img src={category.imageId.url} alt="x" />
                                                                <h3>{product.name}</h3>
                                                            </div>
                                                            <div className="priceP">
                                                                ${product.price.$numberDecimal}
                                                            </div>
                                                        </div>
                                                        <div className="description">
                                                            <p>{product.description}</p>
                                                        </div>
                                                    </button>
                                                }
                                            </div>
                                        ))
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-carta">
                        <div class="tab-content" id={`v-pills${category.name}`}>
                            {
                                category.products.map((product, key) => {
                                    return ((
                                        <div>
                                            {key === 0
                                                ?
                                                <div class="tab-content" id={`v-pills${category.name}`}>
                                                    <div class="tab-pane fade show active " id={`v-pills-${product._id}`} role="tabpanel" aria-labelledby={`${product._id}`} tabIndex="0">
                                                        <img src={product.imageId.url} alt="" />
                                                    </div>
                                                </div>
                                                :
                                                <div class="tab-content" id={`v-pills${category.name}`}>
                                                    <div class="tab-pane fade " id={`v-pills-${product._id}`} role="tabpanel" aria-labelledby={`${product._id}`} tabIndex="0">
                                                        <img src={product.imageId.url} alt="" />
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    ))
                                })
                            }
                        </div>
                    </div>
                </div>
            }
        </div>

    );
}

export default SectionProduct;
