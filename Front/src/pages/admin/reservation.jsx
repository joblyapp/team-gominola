import React from 'react';

const Reservation = ({ reservations, title, deleteReservation }) => {
    return (
        <div>
            <h1 className='text-center m-3'>{title}</h1>
            <div class="table-responsive">
                <table class="table table-dark table-striped text-center">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Hora</th>
                            <th scope="col">Personas</th>
                            <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reservation, key) => {
                            return ((
                                <tr>
                                    <td>{reservation.name}</td>
                                    <td>{reservation.phone}</td>
                                    <td>{reservation.dateR.split("T").shift()}</td>
                                    <td>{reservation.hourR}</td>
                                    <td>{reservation.people}</td>
                                    <td scope="col"><i class="bi bi-trash-fill btn" onClick={()=> {
                                        deleteReservation(reservation._id)
                                    }} style={{ color: "red" }}></i></td>
                                </tr>))
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Reservation;
