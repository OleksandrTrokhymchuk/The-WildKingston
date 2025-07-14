"use client"

import styles from "./Header.module.css"
import HeaderLogo from "./Logo/HeaderLogo"
import buttonStyles from "../../styles/AdditionalStyles/ButtonStyles/ButtonStyles.module.css"
import { useEffect, useState } from "react"
import BasketModal from "./BasketModal/BasketModal"
// import PageTransition from "../Pages/PageTransition/PageTransition"
import { useSelector } from "react-redux"
import type { RootState } from "../../app/store/store"
import Link from "next/link"
import NavLink from "./NavLink/NavLink"

export default function Header() {
    
    const [isModalOpen, setIsModalOpen] = useState(0)

    const [isBurgerMenuActive, setIsBurgerMenuActive] = useState(false)
    const [isHeaderScrolled, setIsHeaderScrolled] = useState(false)

    const cartItems = useSelector((state: RootState) => state.productsSlice.cartItems)

    useEffect(() => {
        const handleScroll = () => {
            requestAnimationFrame(() => {
                setIsHeaderScrolled(document.body.scrollTop > window.innerHeight * 0.04);
            })
        }
    
        document.body.addEventListener("scroll", handleScroll);
        return () => document.body.removeEventListener("scroll", handleScroll);
    }, [])
    

    useEffect(() => {
        document.body.style.overflow = isBurgerMenuActive ? "hidden" : "auto"
    }, [isBurgerMenuActive]);

    const toggleBurgerMenu = () => {
        setIsBurgerMenuActive(prev => !prev)
    }

    return (
        <>
        {/* <PageTransition/> */}
        <header className={`${styles["header"]} ${isHeaderScrolled && !isBurgerMenuActive ? styles['header--scroll'] : ''}`}>
            <div className={styles["header__container"]}>
                <div className={`${styles["header__menu"]} ${styles["menu"]}`}>
                    <nav className={`${styles["menu__body"]} ${isBurgerMenuActive ? styles['menu__body--active'] : ''}`}>
                        <ul className={styles["menu__list"]}>
                            <li className={styles["menu__item"]}>
                                {/* <NavLink
                                    to="/" 
                                    className={styles.menu__link} 
                                    style={({isActive}) => ({color: isActive && "white"})}
                                    onClick={() => {isBurgerMenuActive && setIsBurgerMenuActive(false)}}
                                >
                                    Home
                                </NavLink> */}
                                <NavLink href="/">Home</NavLink>
                            </li>
                            <li className={styles["menu__item"]}>
                                {/* <NavLink
                                    to="/about" 
                                    className={styles.menu__link} 
                                    style={({isActive}) => ({color: isActive && "white"})}
                                    onClick={() => {isBurgerMenuActive && setIsBurgerMenuActive(false)}}
                                >
                                    About
                                </NavLink> */}
                                <NavLink href="/about">About</NavLink>
                            </li>
                            <li className={styles["menu__item"]}>
                                {/* <NavLink
                                    to="/products" 
                                    className={styles.menu__link} 
                                    style={({isActive}) => ({color: isActive && "white"})}
                                    onClick={() => {isBurgerMenuActive && setIsBurgerMenuActive(false)}}
                                >
                                    Products
                                </NavLink> */}
                                <NavLink href="/products">Products</NavLink>
                            </li>
                            <li className={styles["menu__item"]}>
                                {/* <NavLink
                                    to="/services" 
                                    className={styles.menu__link} 
                                    style={({isActive}) => ({color: isActive && "white"})}
                                    onClick={() => {isBurgerMenuActive && setIsBurgerMenuActive(false)}}
                                >
                                    Services
                                </NavLink> */}
                                <NavLink href="/services">Services</NavLink>
                            </li>
                        </ul>
                        <div className={styles["action-header--burger"]}>
                            <Link href="/" className={styles["action-header__link"]}>Login</Link>
                            <Link href="/" className={styles["action-header__link"]}>Register</Link>
                            <Link 
                                href="/about#contacts" 
                                className={`${buttonStyles["button"]} ${buttonStyles["button--border"]} ${buttonStyles["button--border-burger"]}`}
                                onClick={() => {isBurgerMenuActive && setIsBurgerMenuActive(false)}}
                            >
                                <span>Contact</span>
                            </Link>
                        </div>
                    </nav>
                </div>
                <Link href="/" onClick={() => {isBurgerMenuActive && setIsBurgerMenuActive(false)}}>
                    <HeaderLogo isBurgerMenuActive={isBurgerMenuActive}/>
                </Link>
                <div className={`${styles["header__action"]} ${styles["action-header"]}`}>
                    <Link href="/" className={styles["action-header__link"]}>Login</Link>
                    <Link href="/" className={styles["action-header__link"]}>Register</Link>
                    <Link href="/about#contacts" className={`${buttonStyles["button"]} ${buttonStyles["button--border"]} ${styles["button"]}`}>
                        <span>Contact</span>
                    </Link>
                    <div className={styles["basket-box"]} onClick={() => {setIsModalOpen(prev => prev + 1)}}>
                        <svg className={styles["basket"]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.468 15.426.943 9h14.114l-1.525 6.426a.75.75 0 0 1-.729.574H3.197a.75.75 0 0 1-.73-.574z"/> 
                        </svg>
                        <span className={styles["basket-number"]}>
                            {cartItems.reduce((accumulator, currentQuantity: any) => {
                                return accumulator + currentQuantity.quantity
                            }, 0)}
                        </span>
                    </div>
                    <BasketModal isOpen={isModalOpen}/>
                </div>
                <button 
                    className={`${styles["icon-menu"]} ${isBurgerMenuActive ? styles["icon-menu--active"] : ''}`} 
                    onClick={toggleBurgerMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
        </>
    )
}
