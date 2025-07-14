import buttonStyles from "./../styles/AdditionalStyles/ButtonStyles/ButtonStyles.module.css"
import styles from "./../styles/HeroStyles/HeroStyles.module.css"
import Link from 'next/link';
import HeroSwiper from "../components/HeroSwiper/HeroSwiper"
import HeroBackgroundImage from "../public/images/hero/hero-background.jpg"
import Image from 'next/image';
import HeroNews from "../components/HeroNews/HeroNews"

export default function Home() {

    return (
        <>
            <section className={styles["hero"]}>
                <div className={styles["hero__container"]}>
                    <div className={styles["hero__content"]}>
                        <h1 className={styles["hero__title"]}>A better world for pets</h1>
                        <Link href="/" className={`${buttonStyles["hero__button"]} ${buttonStyles["button"]} ${buttonStyles["button--border"]}`}><span>Explore</span></Link>
                    </div>
                    <HeroSwiper/>
                </div>
                <Image className={styles["hero__bg"]} src={HeroBackgroundImage} alt="Hero Background" priority quality={100}/>
            </section>
            <HeroNews/>
        </>
    )   
}   