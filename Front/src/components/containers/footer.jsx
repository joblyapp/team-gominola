import React from 'react';
import "../../styles/scss/footer.scss"
import logo from "../../resources/logo-transparente.png"
const Footer = () => {
    return (
        <div className='div-footer'>
            <div className="footer">
                <div className="row row-footer">
                    <div className="col-12 col-lg-3 col-footer">
                        <div className="text">
                            <a href="#home">
                                <h7>2023 Limes & Limones / All right reserved</h7>
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
                    <div className="col-12 col-lg-3 col-footer">
                        <div className="text">
                            <a href="mailto:support@limesylimones.com">
                                <h7>support@limesylimones.com</h7>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Footer;
