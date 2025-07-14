import styles from "./ContactsPage.module.css"
import buttonStyles from "../../styles/AdditionalStyles/ButtonStyles/ButtonStyles.module.css"
import blockStyles from "../../styles/AdditionalStyles/BlockStyles/BlockStyles.module.css"
import parallaxStyles from "../../styles/AdditionalStyles/ParallaxStyles/ParallaxStyles.module.css"
import ParallaxContainer from "../ParallaxSection"
import Link from "next/link"

export default function ContactsPage() {
    return (
        <section className={styles["contacts"]}>
            <ParallaxContainer className={`${parallaxStyles["parallax-item"]} ${parallaxStyles["parallax-item--bottom"]}`}>
                <div className={styles["contacts__container"]}>
                    <div className={styles["contacts__media"]}>
                        <div className={styles["contacts__images"]}>
                            <img src="/images/contacts/01.jpg" alt="Image" className={styles["media-contacts__image"]}/>
                            <a href="#" target="_blank" className={styles["contacts-images__play"]}>
                                <img src="/images/icons/play.svg" alt="play"/>
                            </a>
                            <img src="/images/contacts/02.jpg" alt="Image" className={styles["media-contacts__image"]}/>
                        </div>
                    </div>
                    <div className={styles["contacts__content"]}>
                        <div className={`${styles["contacts__block-header"]} ${blockStyles["block-header"]}`}>
                            <div className={blockStyles["block-header__label"]}>Contact us</div>
                            <h2 className={blockStyles["block-header__title"]}>Come for the care, leave with a smile</h2>
                            <address className={`${styles["block-header__contacts"]} ${styles["contacts-items"]}`}>
                                <ul className={styles["contacts-items__item"]}>
                                    <li>Monday/Friday 9:00-23:00</li>
                                    <li>Saturday 10:00-21:00</li>
                                </ul>
                                <ul className={styles["contacts-items__item"]}>
                                    <li>
                                        <a href="tel:0123456789">+012-345-6789</a>
                                    </li>
                                    <li>
                                        <a href="mailto:">TheWildKingdom@contact.com</a>
                                    </li>
                                    <li>9889 Lorem Ipsum street, Pellentesque, CA, USA</li>
                                </ul>
                            </address>
                            <Link href="/" className={`${buttonStyles["block-header__button"]} ${buttonStyles["button"]} ${buttonStyles["button--withBg"]}`}>
                                <span>Contact</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </ParallaxContainer>
        </section>
    )
}