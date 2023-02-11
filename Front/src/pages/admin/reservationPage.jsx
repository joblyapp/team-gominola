import React,{useEffect,useState} from 'react';
import { configSimple } from '../../utils/axios';
import axios from "axios"
const ReservationPage = ({token}) => {

    const API_URL = process.env.REACT_APP_API_URL || "localhost:3000"

    useEffect(() => {
    }, []);

    const obtainReservationToday = ()=> {
        axios.get(`${API_URL}/reservation/day`,configSimple)
    }

    const obtainReservationFuture = ()=> {
        
    }

    const obtainReservationPast = ()=> {
        
    }

    return (
        <div>
            
        </div>
    );
}

export default ReservationPage;
