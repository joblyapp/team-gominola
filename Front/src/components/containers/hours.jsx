import React from 'react';
import "../../styles/scss/home/hours.scss"
import backgroundHours from "../../resources/visitanos.jpg"
const Hours = () => {
    return (
        <div className='div-hours'>
            <div className="hours" style={{backgroundImage:`url(${backgroundHours})`, backgroundSize:"cover"}}>
                <div className="row">
                    <div className="col-12 col-hours">
                        <h1 className='visit-title'>¡VISITANOS!</h1>
                        <h5 className='visit-day'>Lun  17.00 pm - 00.00 am</h5>
                        <h5 className='visit-day'>Mar  17.00 pm - 00.00 am</h5>
                        <h5 className='visit-day'>Mie  17.00 pm - 00.00 am</h5>
                        <h5 className='visit-day'>Jue  17.00 pm - 00.00 am</h5>
                        <h5 className='visit-day'>Vie  16.00 pm - 02.00 am</h5>
                        <h5 className='visit-day'>Lun  15.00 pm - 03.00 am</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hours;
