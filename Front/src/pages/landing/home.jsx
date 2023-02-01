import React,{useEffect} from 'react';
import "../../styles/scss/home/home.scss"
import presentation from "../../resources/background-01.jpg"
import Navbar from '../../components/pure/navbar';
import Presentation from '../../components/containers/presentation';
import MorePurchased from '../../components/containers/morePurchased';
import Marcas from '../../components/containers/marcas';
import About from '../../components/containers/about';
import Form from '../../components/containers/form';
import Footer from '../../components/containers/footer';

const Home = ({ getCategories }) => {

    useEffect(()=> {
        getCategories()
    },[])

    return (
        <div className='div-home'>
            <div className='home' id="home" style={{ backgroundImage: `url(${presentation})`, }}>
                <Navbar></Navbar>
                <Presentation ></Presentation>
            </div>
            <MorePurchased></MorePurchased>
            <Marcas></Marcas>
            <About ></About>
            <Form></Form>
            <Footer></Footer>
        </div>
    );
}

export default Home;
