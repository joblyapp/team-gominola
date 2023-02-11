import React, { useEffect } from 'react';
import "../../styles/scss/home/home.scss"
import presentation from "../../resources/background1.jpg"
import Presentation from './presentation';
import Navbar from "../pure/navbar"
import Marcas from './marcas';
import About from './about';
import Form from './form';
import Footer from './footer';
import Hours from './hours';

const Home = ({ getCategories }) => {

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className='div-home'>
            <div className='home' id="home" style={{ backgroundImage: `url(${presentation})`, backgroundSize: "cover" }}>
                <Navbar></Navbar>
                <Presentation ></Presentation>
            </div>
            <About ></About>
            <Form></Form>
            <Hours></Hours>
            <Footer></Footer>
        </div>
    );
}

export default Home;
