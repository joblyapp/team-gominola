import React from 'react';
import logo from "../../resources/logo-transparente2.png"
import { useNavigate } from 'react-router-dom';
const Presentation = () => {

    const navigate  = useNavigate();

    return (
        <div className="row">
            <div className="col-12 col-lg-5 columns">
                <div className="presentation">
                    <div className='presentation-text'>
                        <img src={logo} className="img-fluid" alt="" />
                        <div className='title-presentation'>
                            <div className="line"></div>
                            <h1 className='presentation-name text-center'>LIMES & LIMONES</h1>
                            <div className="line"></div>
                        </div>
                        <div className="buttons-presentation">
                            <a className='btn' href='#form'>Reservar Ahora</a>
                            <button className='btn' onClick={()=>{
                                navigate("../carta")
                            }}>Ver Carta</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Presentation;
