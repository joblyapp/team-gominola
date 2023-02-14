import React, { useEffect, useState } from 'react';
import { configSimple } from '../../utils/axios';
import axios from "axios"
import Reservation from './reservation';
import NavbarAdminDispatch from "../../components/pure/navbarAdminDispatch"
import background from "../../resources/background1.jpg"
import "../../styles/scss/admin/reservations.scss"
const ReservationPage = ({ token }) => {

    const API_URL = process.env.REACT_APP_API_URL || "localhost:3000"

    useEffect(() => {
        obtainReservationFuture()
        obtainReservationPast()
        obtainReservationToday()
    }, []);

    const [today, setToday] = useState();
    const [future, setFuture] = useState();
    const [past, setPast] = useState();

    const obtainReservationToday = () => {
        axios.get(`${API_URL}/reservation/`, configSimple(token))
            .then(res => {
                let list = []
                var d = new Date();
                console.log(d)
                d = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
                var yyyymmdd = d.toISOString().slice(0, 10);
                let x = new Date(yyyymmdd)
                x.setUTCHours(0, 0, 0, 0)
                console.log(x)
                res.data.forEach(reservation => {
                    let day = new Date((reservation.dateR))
                    day.setUTCHours(0, 0, 0, 0)
                    if ((x.getTime() == day.getTime())) {
                        list.push(reservation)
                    }
                })
                setToday(list)
            })
    }

    const obtainReservationFuture = () => {
        axios.get(`${API_URL}/reservation/beforedays`, configSimple(token))
            .then(res => {
                let list = []
                var d = new Date();
                console.log(d)
                d = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
                var yyyymmdd = d.toISOString().slice(0, 10);
                let today = new Date(yyyymmdd)
                today.setUTCHours(0, 0, 0, 0)
                res.data.forEach(reservation => {
                    let resFecha = new Date(reservation.dateR)
                    resFecha.setHours(0, 0, 0, 0)
                    if ((today.getTime() < resFecha.getTime())) {
                        list.push(reservation)
                    }
                })
                setFuture(list)
            })
    }

    const obtainReservationPast = () => {
        axios.get(`${API_URL}/reservation/pastdays`, configSimple(token))
            .then(res => {
                let list = []
                var d = new Date();
                d = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
                var yyyymmdd = d.toISOString().slice(0, 10);
                let today = new Date(yyyymmdd)
                today.setUTCHours(0, 0, 0, 0)
                res.data.forEach(reservation => {
                    let day = new Date((reservation.dateR))
                    day.setUTCHours(0, 0, 0, 0)
                    if ((today.getTime() > day.getTime())) {
                        list.push(reservation)
                    }
                })
                setPast(list)
            })
    }

    const deleteReservation = (id) => {
        axios.delete(`${API_URL}/reservation/${id}`, configSimple(token))
        setToday([])
        setPast([])
        setToday([])
        obtainReservationFuture()
        obtainReservationPast()
        obtainReservationToday()
    }

    return (
        <div className='div-reservations' style={{ backgroundImage: `url(${background})` }}>
            <NavbarAdminDispatch></NavbarAdminDispatch>
            <div className="reservations">
                <div className="container">
                    {today
                        ?
                        <Reservation reservations={today} title={"Reservaciones de Hoy"} deleteReservation={deleteReservation} ></Reservation>
                        :
                        <></>
                    }
                    {future
                        ?
                        <Reservation reservations={future} title={"Reservaciones Futuras"} deleteReservation={deleteReservation}></Reservation>
                        :
                        <></>
                    }
                    {past
                        ?
                        <Reservation reservations={past} title={"Reservaciones pasadas"} deleteReservation={deleteReservation}></Reservation>
                        :
                        <></>
                    }
                </div>
            </div>
        </div>
    );
}

export default ReservationPage;
