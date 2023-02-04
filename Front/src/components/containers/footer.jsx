import React from 'react';
import "../../styles/scss/footer.scss"
import logo from "../../resources/logo.png"
const Footer = () => {
    return (
        <div className='div-footer'>
            <div className="footer">
                <div className="row row-footer">
                    <div className="col-12 col-lg-3 col-footer">
                        <div className="text">
                            <a href="#home">
                                <h3>Inicio</h3>
                            </a>

                        </div>
                    </div>
                    <div className="col-12 col-lg-3 col-footer">
                        <div className="img">
                            <a href="#home">
                                <img src={logo} className="img-fluid" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
