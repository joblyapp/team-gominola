import React from 'react';
import morePurchasedImage from "../../resources/background-02.jpg"
import lomaspedido1 from "../../resources/lomaspedido-01.jpg"
import lomaspedido2 from "../../resources/lomaspedido-02.jpg"
import lomaspedido3 from "../../resources/lomaspedido-03.jpg"
import lomaspedido4 from "../../resources/lomaspedido-04.jpg"
import { useNavigate } from 'react-router-dom';
import "../../styles/scss/home/morePurchased.scss"
const MorePurchased = () => {

    const navigate = useNavigate();

    return (
        <div className='div-more'>
            <div className="more" style={{ backgroundImage: `url(${"https://media.admagazine.com/photos/62a3907026b4ad1ad6aa97f9/16:9/w_2560%2Cc_limit/drew-beamer-bTN-zKFy9uA-unsplash.jpg"})` }} >
                <div className="one-sec">
                    <h3>Lo más pedido</h3>
                    <button className='see-more' onClick={()=>{
                        navigate("../carta")
                    }}>Ver más</button>
                </div>
                <div className="two-sec">
                    <div className="row">
                        <div className="col-6 col-md-6 col-xl-3">
                            <div className='more-purchased'>
                                <img className="img-fluid up" src={lomaspedido1} alt="x" />
                            </div>
                        </div>
                        <div className="col-6 col-md-6 col-xl-3">
                            <div className='more-purchased'>
                                <img className="img-fluid down" src={lomaspedido2} alt="x" />
                            </div>
                        </div>
                        <div className="col-6 col-md-6 col-xl-3">
                            <div className='more-purchased'>
                                <img className="img-fluid up" src={lomaspedido3} alt="x" />

                            </div>
                        </div>
                        <div className="col-6 col-md-6 col-xl-3">
                            <div className='more-purchased'>
                                <img className="img-fluid down" src={lomaspedido4} alt="x" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MorePurchased;
