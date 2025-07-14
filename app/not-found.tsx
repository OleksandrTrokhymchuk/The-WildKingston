import buttonStyles from "../styles/AdditionalStyles/ButtonStyles/ButtonStyles.module.css"
import ParallaxContainer from "@/components/ParallaxSection"
import parallaxStyles from "../styles/AdditionalStyles/ParallaxStyles/ParallaxStyles.module.css"
import Link from "next/link"
import styles from "../styles/NotFoundPageStyles/NotFoundPageStyles.module.css"

export default function NotFoundPage() {
    return(
        <ParallaxContainer additionalStyles="" className={`${parallaxStyles["parallax-item"]} ${parallaxStyles["parallax-item--top"]}`}>
            <div className={styles["notfoundpage"]}>
                <img className={styles["cat-image"]} src="/images/not-found-page/sad-cat.jpg" alt="Sad cat" />
                <h5 className={styles["title"]}>
                    Something went wrong...
                </h5>
                <p className={styles["text"]}>
                    Sorry, the page you visited does not exist.
                </p>
                <Link href="/" replace>
                    <button 
                        className={`${buttonStyles["button"]} ${buttonStyles["button--withBg"]}`}
                        style={{display: "flex", justifyContent: "center", margin: "0 auto", marginBottom: "50px"}}
                        >
                        <span>Back Home</span>
                    </button>
                </Link>
            </div>
        </ParallaxContainer>
    )
}