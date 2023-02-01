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
                        <div className="text">
                            <a href="">
                                <h3>Términos de servicio.</h3>
                            </a>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 col-footer">
                        <div className="img">
                            <img src={logo} className="img-fluid" alt="" />
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 col-footer">
                        <div className="hours">
                            <h7 className='golden'>Lun - Jue:</h7>
                            <p> 10.00pm - 00.00 am</p>
                            <h7 className='golden'>Vie:</h7>
                            <p> 12.00pm - 01.00 am</p>
                            <h7 className='golden'>Sab:</h7>
                            <p> 15.00pm - 03.00 am</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
