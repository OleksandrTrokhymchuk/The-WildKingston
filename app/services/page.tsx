import styles from "./(styles)/StylesPage.module.css"
import buttonStyles from "../../styles/AdditionalStyles/ButtonStyles/ButtonStyles.module.css"
import blockStyles from "../../styles/AdditionalStyles/BlockStyles/BlockStyles.module.css"
import parallaxStyles from "../../styles/AdditionalStyles/ParallaxStyles/ParallaxStyles.module.css"
import ParallaxContainer from "../../components/ParallaxSection"
import ServicesGallery from "../../components/ServicesGallery/ServicesGallery"
import Link from "next/link"

export default function ServicesPage() {
    return(
        <>
            <section className={styles["services"]}>
                <ParallaxContainer additionalStyles="" className={`${parallaxStyles["parallax-item"]} ${parallaxStyles["parallax-item--top"]} ${parallaxStyles["parallax-item--services"]}`}>
                    <div className={styles["services__container"]}>
                        <div className={styles["services__img"]}>
                            <img src="/images/services/cat.jpg" alt="Cat Image" />
                        </div>
                        <div className={styles["services__content"]}>
                        <div className={`${blockStyles["block-header"]} ${styles["services__block-header"]}`}>
                            <div className={blockStyles["block-block-header__label"]}>Our Services</div>
                            <h2 className={`${blockStyles["block-header__title"]} ${blockStyles["block-header__title--services"]}`}>Quality Things for Loving Pets</h2>
                            <div className={blockStyles["block-header__text"]}>
                                <blockquote>“More than a Pet Store…”</blockquote>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquam mi id 
                                    augue ultrices, in tempus elit tristique. Aliquam ultrices sem non.
                                </p>
                            </div>
                            <Link href="/" className={`${buttonStyles["block-header__button"]} ${buttonStyles["button"]} ${buttonStyles["button--services"]} ${buttonStyles["button--border"]}`}>
                                <span>Explore</span>
                            </Link>
                        </div>
                        </div>
                    </div>
                </ParallaxContainer>
            </section>
            <ServicesGallery/>
        </>
    )
}