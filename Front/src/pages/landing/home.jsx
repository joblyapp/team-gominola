import React, { useEffect } from 'react';
import "../../styles/scss/home/home.scss"
import presentation from "../../resources/background1.jpg"
import Presentation from '../../components/containers/presentation';
import Navbar from "../../components/pure/navbar"
import Marcas from '../../components/containers/marcas';
import About from '../../components/containers/about';
import Form from '../../components/containers/form';
import Footer from '../../components/containers/footer';
import Hours from '../../components/containers/hours';

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
        </div>
    );
}

export default Home;
