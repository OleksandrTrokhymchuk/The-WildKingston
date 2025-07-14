import styles from "./Footer.module.css"
import FooterLogo from "./Logo/FooterLogo"
import FooterMenu from "./FooterMenu/FooterMenu"
import FooterSocialLinks from "./FooterSocialLinks/FooterSocialLinks"
import FooterSubscribeForm from "./FooterSubscribeForm/FooterSubscribeForm"

export default function Footer() {
    return (
        <footer className={styles["footer"]}>
            <div className="footer__container">
                <div className={styles["footer__body"]}>
                    <div className={styles["footer__content"]}>
                        <FooterMenu/>
                        <FooterSocialLinks/>
                    </div>
                    <FooterLogo/>
                    <FooterSubscribeForm/>
                </div>
                <div className={styles["footer__bottom"]}>
                    <p className={styles["footer__copyright"]}>
                        Copyright Dotcreativemarket
                    </p>
                </div>
            </div>
        </footer>
    )
}
