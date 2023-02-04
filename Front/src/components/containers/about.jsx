import React from 'react';
import "../../styles/scss/home/about.scss"
import aboutImage from "../../resources/quienessomos.jpg"
const About = () => {
    return (
        <div className='div-about' id="about">
            <div className="about">
                <div className="row row-about" >
                    <div className="col-0 col-xl-6 col-about-img">
                        <img src={aboutImage} className="img-about img-fluid" alt="" />
                    </div>
                    <div className="col-12 col-sm-10 col-md-8 col-xl-5 col-about">
                        <div className="about-text">
                            <h1 className='about-title'>¿Quiénes Somos?</h1>
                            <p className='about-text-text'>Limes&Limones es un bar con con un espíritu jóven, donde se encuentra buena música, buena comida y buena bebida.
                                No se trata de un bar más, la intención es que aquellos que vengan a Limes&Limones, mexicanos y turistas vivan una experiencia única e inolvidable colmada de fiesta y diversión.
                                Nuestro equipo de trabajo, el cual es escencial para lograr el éxito, está capacitado y en constante capacitación para brindarle la mejor atención. </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
