"use client"

import styles from "./(styles)/AboutPage.module.css"
import buttonStyles from "../../styles/AdditionalStyles/ButtonStyles/ButtonStyles.module.css"
import blockStyles from "../../styles/AdditionalStyles/BlockStyles/BlockStyles.module.css"
import parallaxStyles from "../../styles/AdditionalStyles/ParallaxStyles/ParallaxStyles.module.css"
import ParallaxContainer from "../../components/ParallaxSection"
import ContactsPage from "../../components/Contacts/ContactsPage"
import { useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"
// import { fetchAnimalInfo } from "../../../store/animalRandomFactSlice"

export default function AboutPage() {

    const contactsRef = useRef(null);
    const dispatch = useDispatch()

    useEffect(() => {
        if (window.location.hash === "#contacts") {
            // contactsRef.current?.scrollIntoView({ behavior: "smooth" })
        }
    }, [])

    // const animalInfo = useSelector(state => state.animalRandomFactSlice.animalInfo)
    // const status = useSelector(state => state.animalRandomFactSlice.status)
    
    useEffect(() => {
        // dispatch(fetchAnimalInfo())
    }, [])
    

    return (
        <>
            <section className={styles["about-us"]} id="contacts">
                <ParallaxContainer additionalStyles="" className={`${parallaxStyles["parallax-item"]} ${parallaxStyles["parallax-item--about"]} ${parallaxStyles["parallax-item--top"]}`}>
                    <div className={styles["about-us__container"]}>
                        <div className={styles["about-us__body"]}>
                        <div className={styles["about-us__image"]}>
                            <img src="/images/about-us/dog.jpg" alt="Image"/>
                        </div>
                        <div className={styles["about-us__content"]}>
                            <div className={blockStyles["block-header"]}>
                                <div className={blockStyles["block-header__label"]}>About us</div>
                                <h2 className={blockStyles["block-header__title"]}>Treating pet like Royalty</h2>
                                <div className={blockStyles["block-header__text"]}>
                                    <blockquote>“They’re not just pets, they’re family”</blockquote>
                                    <p>
                                        {/* {animalInfo} */}
                                    </p>
                                </div>
                                <Link href="/" className={`${buttonStyles["block-header__button"]} ${buttonStyles["button"]} ${buttonStyles["button--withBg"]}`}><span>Explore</span></Link>
                            </div>
                        </div>
                        </div>
                        <div className={`${styles["about-us__services"]} ${styles["services-about-us"]}`}>
                        <div className={styles["services-aobut-us__item"]}>
                            <div className={styles["services-about-us__icon"]}>
                                <img src="/images/icons/about-us-services/pet-food.svg" alt="Image"/>
                            </div>
                            <div className={styles["services-about-us__label"]}>Pet Food</div>
                        </div>
                        <div className={styles["services-aobut-us__item"]}>
                            <div className={styles["services-about-us__icon"]}>
                                <img src="/images/icons/about-us-services/pet-care.svg" alt="Image"/>
                            </div>
                            <div className={styles["services-about-us__label"]}>Pet Care</div>
                        </div>
                        <div className={styles["services-aobut-us__item"]}>
                            <div className={styles["services-about-us__icon"]}>
                                <img src="/images/icons/about-us-services/pet-accessories.svg" alt="Image"/>
                            </div>
                            <div className={styles["services-about-us__label"]}>Pet Accessories</div>
                        </div>
                        </div>
                    </div>
                </ParallaxContainer>
            </section>
            <section ref={contactsRef}>
                <ContactsPage />
            </section>
        </>
    )
}