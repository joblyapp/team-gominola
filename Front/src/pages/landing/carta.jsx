import React from 'react';
import "../../styles/scss/carta/cartaP.scss"
import fondoCarta from "../../resources/fondo-carta.jpg"
import Navbar from "../../components/pure/navbar"
import comida from "../../resources/comida.jpg"
import bebidas from "../../resources/bebidas.jpg"
import { useNavigate } from 'react-router-dom';
const Carta = () => {

    const navigate = useNavigate()

    return (
        <div className='div-cartaP' style={{ backgroundImage: `url(${fondoCarta})` }}>
            <Navbar></Navbar>
            <div className="cartaHeight">
                <div className="cartaP">
                    <h1 className='text-center cartaP-title'>¿Qué desea eligir?</h1>
                    <div className="row row-cartaP">
                        <div className="col-12 col-xl-6 col-cartaP col-bebidas btn" onClick={()=>{
                            navigate("../carta/bebidas")
                        }} style={{ backgroundImage: `url(${bebidas})` }}>
                            <h1 className='col-carta-title'>Bebidas</h1>
                        </div>
                        <div className="col-12 col-xl-6 col-cartaP col-comida btn" onClick={()=>{
                            navigate("../carta/comida")
                        }} style={{ backgroundImage: `url(${comida})` }}>
                            <h1 className='col-carta-title'>Comida</h1>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carta;
