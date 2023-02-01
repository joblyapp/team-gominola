import React from 'react';
import "../../styles/scss/home/about.scss"
import aboutBackground from "../../resources/background-03.jpg"
const About = () => {
    return (
        <div className='div-about' id="about">
            <div className="about">
                <div className="row row-about" style={{ backgroundImage: `url(${aboutBackground})` }}>
                    <div className="col-9 col-sm-7 col-xl-5 col-about">
                        <div className="about-text">
                            <h1 className='about-title'>¿Quiénes Somos?</h1>
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
