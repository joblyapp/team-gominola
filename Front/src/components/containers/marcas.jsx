import React from 'react';
import "../../styles/scss/home/marcas.scss"
import bohemia from "../../resources/bohemia.jpg"
import corona from "../../resources/corona.jpg"
import martini from "../../resources/martini.jpg"
const Marcas = () => {
    return (
        <div className='div-marcas'>
            <div className="marcas">
                <h1 className='text-center marcas-text'>Marcas auspiciantes</h1>
                <div className="row row-marcas">
                    <div className="col-12 col-sm-4 col-marcas">
                        <img className='img-fluid' src={bohemia} alt="x" />
                    </div>

                    <div className="col-12 col-sm-4 col-marcas">
                        <img className='img-fluid' src={corona} alt="x" />
                    </div>

                    <div className="col-12 col-sm-4 col-marcas">
                        <img className='img-fluid' src={martini} alt="x" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Marcas;
