import styles from "./ServicesGallery.module.css"
import parallaxStyles from "../../styles/AdditionalStyles/ParallaxStyles/ParallaxStyles.module.css"
import ParallaxContainer from "../../components/ParallaxSection"
import Link from "next/link"
// import Image from "next/image"
// import img1 from "../../public/images/gallery/01.jpg";
// import img2 from "../../public/images/gallery/02.jpg";
// import img3 from "../../public/images/gallery/03.jpg";
// import img4 from "../../public/images/gallery/04.jpg";


// const gallery = [
//   { id: 1, imageSrc: img1, gallerySubtitle: "Taking dogs care to the next level" },
//   { id: 2, imageSrc: img2, gallerySubtitle: "We value the best health of your pets" },
//   { id: 3, imageSrc: img3, gallerySubtitle: "Trust us with your pet’s vacation" },
//   { id: 4, imageSrc: img4, gallerySubtitle: "We treat cats with utmost care" },
// ];
const gallery = [
  { id: 1, imageSrc: "/images/gallery/01.jpg", gallerySubtitle: "Taking dogs care to the next level" },
  { id: 2, imageSrc: "/images/gallery/02.jpg", gallerySubtitle: "We value the best health of your pets" },
  { id: 3, imageSrc: "/images/gallery/03.jpg", gallerySubtitle: "Trust us with your pet’s vacation" },
  { id: 4, imageSrc: "/images/gallery/04.jpg", gallerySubtitle: "We treat cats with utmost care" },
];


export default function ServicesGallery() {
    return (
        <section className={styles["gallery"]}>
            <ParallaxContainer className={parallaxStyles["parallax-item"]}>
                <div className={styles["gallery__container"]}>
                    {gallery.map((galleryItem) => 
                        <div className={styles["gallery__item"]} key={galleryItem.id}>
                            <Link href="/" className={styles["gallery__link"]}>
                                {/* <Image className={styles["gallery__img"]} src={galleryItem.imageSrc} alt={galleryItem.gallerySubtitle}/> */}
                                <img className={styles["gallery__img"]} src={galleryItem.imageSrc} alt={galleryItem.gallerySubtitle} />
                            </Link>
                            <Link href="/" className={styles["gallery__subtitle"]}>
                                <span>{galleryItem.gallerySubtitle}</span>
                                <svg width="53" height="24" viewBox="0 0 53 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M53 11.7391V12.2609C47.9959 14.8695 43.7868 18.8206 42.2426 24C42.2416 24.0034 41.8884 23.7868 41.8695 23.7804C41.8505 23.774 41.8904 23.7837 41.8916 23.7797C43.0619 19.8175 47.4955 15.118 50.7404 12.2609C34.8781 12.6298 15.8487 12.0746 0 12.5217V11.4782L50.7404 11.7391C47.4955 8.88198 43.1601 4.00577 41.9802 1.96311e-05L42.5244 4.55638e-06C44.0551 5.18957 47.318 8.34781 53 11.7391Z" fill="#9D875C" />
                                </svg>
                            </Link>
                        </div>
                    )}
                </div>
            </ParallaxContainer>
        </section>
    )
}