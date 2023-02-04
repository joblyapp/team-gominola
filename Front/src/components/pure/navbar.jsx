import React, { useState, useEffect } from 'react'
import '../../styles/scss/navbar.scss'
import logo from "../../resources/logo-transparente.png"
import { useNavigate } from 'react-router-dom'


export default function Navbar() {

    const navigate = useNavigate()

    const [toggleMenu, setToggleMenu] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    const toggleNav = () => {
        setToggleMenu(!toggleMenu)
    }

    useEffect(() => {

        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener('resize', changeWidth)

        return () => {
            window.removeEventListener('resize', changeWidth)
        }

    }, [])

    return (
        <div>
            {toggleMenu && screenWidth < 768
                ?
                (<div class="nav" style={{}}>
                    {(toggleMenu || screenWidth > 768) && (
                        <ul className="list" >
                            <div className="logo-div">
                                <li onClick={() => {
                                    navigate("../home",)
                                }}>
                                    <a href=""><img className='logo' src={logo} alt="" /></a>
                                </li>
                            </div>
                            <div className="list-items">
                                <li className="items" onClick={() => {
                                    navigate("../home",)
                                }}>
                                    <a href="#home" onClick={() => {
                                    }}>Inicio</a>
                                </li>
                                <li className="items" onClick={() => {
                                    navigate("../carta",)
                                }}>
                                    <a href="">Carta</a>
                                </li>
                                <li className="items" onClick={() => {
                                    navigate("../home#about",)
                                }}>
                                    <a href="#about">Quienes Somos</a>
                                </li>
                                <li className="items" onClick={() => {
                                    navigate("../home#form",)
                                }}>
                                    <a href="#form">Contacto</a>
                                </li>

                            </div>
                        </ul>
                    )}
                    <img className='logo-menu' src={logo} alt="" />
                    <button onClick={toggleNav} className="btn">
                        <img src="https://cdn-icons-png.flaticon.com/512/458/458594.png" alt="" />
                    </button>
                </div>)
                :
                (<div class="nav">
                    {(toggleMenu || screenWidth > 768) && (
                        <ul className="list">
                            <div className="logo-div">
                                <li onClick={() => {
                                    navigate("../home",)
                                }}>
                                    <a href=""><img className='logo' src={logo} alt="" /></a>
                                </li>
                            </div>
                            <div className="list-items">
                                <li className="items" onClick={() => {
                                    navigate("../home",)
                                }}>
                                    <a href="#home" onClick={() => {
                                    }}>Inicio</a>
                                </li>
                                <li className="items"
                                    onClick={() => {
                                        navigate("../carta",)
                                    }}>
                                    <a href="">Carta</a>
                                </li>
                                <li className="items" onClick={() => {
                                    navigate("../home#about",)
                                }}>
                                    <a href="#about">Quienes Somos</a>
                                </li>
                                <li className="items" onClick={() => {
                                    navigate("../home#form",)
                                }}>
                                    <a href="#form">Contacto</a>
                                </li>

                            </div>
                        </ul>
                    )}
                    <a href=""><img className='logo-menu' src={logo} alt="" onClick={() => {
                        navigate("../home",)
                    }} /></a>
                    <button onClick={toggleNav} className="btn">
                        <img src="https://cdn-icons-png.flaticon.com/512/660/660376.png" alt="" />
                    </button>
                </div>)
            }
        </div>
    )
}