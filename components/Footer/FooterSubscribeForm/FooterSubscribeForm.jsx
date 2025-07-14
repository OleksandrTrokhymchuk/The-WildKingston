"use client"

import styles from "./FooterSubscribeForm.module.css"
import { useState } from "react"

export default function FooterSubscribeForm() {
    const [userEmail, setUserEmail] = useState("")
    
    const handleEnterEmail = (event) => {
        setUserEmail(event.target.value)
    }

    const submitEmail = (event) => {
        event.preventDefault()
        setUserEmail("")
    }

    return (
        <>
            <div className={`${styles["footer__subscribe"]} ${styles["subscribe"]}`}>
                <div className={styles["subscribe__body"]}>
                    <h4 className={styles["subscribe__title"]}>Treating all the pets present here like royalty.</h4>
                    <form action="#" className={styles["subscribe__form"]}>
                        <input 
                            className={styles["subscribe__input"]} 
                            value={userEmail} 
                            onChange={handleEnterEmail} 
                            type="email" 
                            data-required="email" 
                            placeholder="Enter email address"
                            data-error="error"
                        />
                        <button className={styles["subscribe__button"]} onClick={submitEmail}>Subscribe</button>
                    </form>
                </div>
                
            </div>
        </>   
    )
}