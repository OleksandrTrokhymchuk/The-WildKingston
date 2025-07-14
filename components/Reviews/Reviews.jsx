"use client"

import styles from "./Reviews.module.css"
import parallaxStyles from "../../styles/AdditionalStyles/ParallaxStyles/ParallaxStyles.module.css"
import ParallaxContainer from "../../components/ParallaxSection"
import { Navigation, A11y, EffectFlip } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { useRef, useEffect } from "react"


export default function Reviews() {
    const reviewsSwiperArrowRightRef = useRef(null)
    const reviewsSwiperArrowLeftRef = useRef(null)
    const swiperRef = useRef(null) 

    useEffect(() => {
        reviewsSwiperArrowLeftRef.current.style.transition = "transform 0.6s ease, opacity 0.6s ease"
        reviewsSwiperArrowLeftRef.current.style.opacity = "0.6"
        reviewsSwiperArrowLeftRef.current.style.pointerEvents = "none"
        reviewsSwiperArrowLeftRef.current.style.transform = "translateX(50%) translateY(-1px) scale(0.5)"

        reviewsSwiperArrowRightRef.current.style.transition = "transform 0.6s ease, opacity 0.6s ease"

        if (swiperRef.current) {
            swiperRef.current.params.navigation.prevEl = reviewsSwiperArrowLeftRef.current;
            swiperRef.current.params.navigation.nextEl = reviewsSwiperArrowRightRef.current;

            swiperRef.current.navigation.init();
            swiperRef.current.navigation.update();
        }
    }, [])

    
    return(
        <>
            <section className={styles["reviews"]}>
                <ParallaxContainer additionalStyles="" className={parallaxStyles["parallax-item"]}>
                <div className={styles["reviews__container"]}>
                    <div className={`${styles["reviews__slider"]} ${styles["swiper"]}`}>
                        <Swiper className={`${styles["reviews__wrapper"]} ${styles["swiper-wrapper"]}`}
                            modules={[Navigation, A11y, EffectFlip]}
                            speed={800}
                            centeredSlides
                            autoHeight={true}
                            grabCursor={true}
                            slidesPerView={1}
                            navigation={{
                                nextEl: reviewsSwiperArrowRightRef.current,
                                prevEl: reviewsSwiperArrowLeftRef.current,
                              }}
                            onSwiper={(blockquoteSwiper) => (swiperRef.current = blockquoteSwiper)}
                            onSlideChange={(blockquoteSwiper) => {
                                if (blockquoteSwiper.isBeginning) {
                                    reviewsSwiperArrowLeftRef.current.style.transform = "translateY(-1px) scale(0.5)"
                                    reviewsSwiperArrowLeftRef.current.style.opacity = "0.4"
                                    reviewsSwiperArrowLeftRef.current.style.pointerEvents = "none"
                                    
                                    reviewsSwiperArrowRightRef.current.style.transform = "scale(1)"
                                    reviewsSwiperArrowRightRef.current.style.opacity = "1"
                                    reviewsSwiperArrowRightRef.current.style.pointerEvents = "auto"
                                }   
                                else if (blockquoteSwiper.isEnd) {
                                    reviewsSwiperArrowLeftRef.current.style.transform = "scale(1)"
                                    reviewsSwiperArrowLeftRef.current.style.opacity = "1"
                                    reviewsSwiperArrowLeftRef.current.style.pointerEvents = "auto"
                                    
                                    reviewsSwiperArrowRightRef.current.style.transform = "scale(0.5) translateY(-1px)"
                                    reviewsSwiperArrowRightRef.current.style.opacity = "0.4"
                                    reviewsSwiperArrowRightRef.current.style.pointerEvents = "none"
                                } 
                                else {
                                    reviewsSwiperArrowLeftRef.current.style.transform = "scale(1)"
                                    reviewsSwiperArrowLeftRef.current.style.opacity = "1"
                                    reviewsSwiperArrowLeftRef.current.style.pointerEvents = "auto"
                              
                                    reviewsSwiperArrowRightRef.current.style.transform = "scale(1)"
                                    reviewsSwiperArrowRightRef.current.style.opacity = "1"
                                    reviewsSwiperArrowRightRef.current.style.pointerEvents = "auto"
                                }
                              }}
                              
                        >
                            <SwiperSlide className={styles["reviews__slide"]}>
                                <div className={styles["reviews__icon"]}>
                                    <svg width="72" height="67" viewBox="0 0 72 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.6946 45.1895C11.0448 44.7201 10.4193 44.2352 9.81794 43.7347M7.13673 41.1859C3.26473 37.0001 1 31.9272 1 26.4705C1.03721 -7.48577 70.946 -7.49458 70.9761 26.4705C71.4111 34.2762 65.8326 40.0022 60.6741 45.6789C58.9224 51.1795 49.3478 67.0153 45.7611 65.9486C43.2562 65.204 45.6964 51.8405 42.3055 52.2929C38.8393 52.7567 39.7511 52.4874 35.9854 52.4874C28.2609 52.4874 21.122 50.6259 15.3335 47.4708M49.7199 34.3387C49.7199 39.7953 43.5771 44.2188 35.9996 44.2188C28.422 44.2188 22.2792 39.7953 22.2792 34.3387C22.2792 28.8821 28.422 24.4586 35.9996 24.4586C43.5771 24.4586 49.7199 28.8821 49.7199 34.3387ZM26.3728 17.2351C27.4117 20.2542 26.2287 23.3892 23.7306 24.2373C21.2324 25.0854 18.3651 23.3255 17.3263 20.3064C16.2874 17.2874 17.4704 14.1524 19.9685 13.3042C22.4667 12.4561 25.334 14.216 26.3728 17.2351ZM52.0382 13.3161C54.5364 14.1642 55.7194 17.2992 54.6805 20.3183C53.6417 23.3374 50.7744 25.0973 48.2762 24.2491C45.7781 23.401 44.5951 20.266 45.6339 17.2469C46.6728 14.2279 49.5401 12.4679 52.0382 13.3161ZM40.7797 15.3231C40.7797 18.5137 38.6395 21.1001 35.9995 21.1001C33.3595 21.1001 31.2193 18.5137 31.2193 15.3231C31.2193 12.1325 33.3595 9.54607 35.9995 9.54607C38.6395 9.54607 40.7797 12.1325 40.7797 15.3231Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <blockquote className={styles["reviews__item"]}>
                                    <div className={styles["reviews__text"]}>
                                        <p>
                                            A fantastic toy for my cat! Not only is it fun to play with, but it also helps keep the claws in check. My cat loves it, although the price is a bit high, it's worth it for the quality.
                                        </p>
                                    </div>
                                    <cite className={styles["reviews__author"]}>James Miller</cite>
                                </blockquote>
                            </SwiperSlide>
                            <SwiperSlide className={styles["reviews__slide"]}>
                                <div className={styles["reviews__icon"]}>
                                    <svg width="72" height="67" viewBox="0 0 72 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.6946 45.1895C11.0448 44.7201 10.4193 44.2352 9.81794 43.7347M7.13673 41.1859C3.26473 37.0001 1 31.9272 1 26.4705C1.03721 -7.48577 70.946 -7.49458 70.9761 26.4705C71.4111 34.2762 65.8326 40.0022 60.6741 45.6789C58.9224 51.1795 49.3478 67.0153 45.7611 65.9486C43.2562 65.204 45.6964 51.8405 42.3055 52.2929C38.8393 52.7567 39.7511 52.4874 35.9854 52.4874C28.2609 52.4874 21.122 50.6259 15.3335 47.4708M49.7199 34.3387C49.7199 39.7953 43.5771 44.2188 35.9996 44.2188C28.422 44.2188 22.2792 39.7953 22.2792 34.3387C22.2792 28.8821 28.422 24.4586 35.9996 24.4586C43.5771 24.4586 49.7199 28.8821 49.7199 34.3387ZM26.3728 17.2351C27.4117 20.2542 26.2287 23.3892 23.7306 24.2373C21.2324 25.0854 18.3651 23.3255 17.3263 20.3064C16.2874 17.2874 17.4704 14.1524 19.9685 13.3042C22.4667 12.4561 25.334 14.216 26.3728 17.2351ZM52.0382 13.3161C54.5364 14.1642 55.7194 17.2992 54.6805 20.3183C53.6417 23.3374 50.7744 25.0973 48.2762 24.2491C45.7781 23.401 44.5951 20.266 45.6339 17.2469C46.6728 14.2279 49.5401 12.4679 52.0382 13.3161ZM40.7797 15.3231C40.7797 18.5137 38.6395 21.1001 35.9995 21.1001C33.3595 21.1001 31.2193 18.5137 31.2193 15.3231C31.2193 12.1325 33.3595 9.54607 35.9995 9.54607C38.6395 9.54607 40.7797 12.1325 40.7797 15.3231Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <blockquote className={styles["reviews__item"]}>
                                    <div className={styles["reviews__text"]}>
                                        <p>
                                            I recently bought the Luxury Pet Bed for my cat, and I couldn’t be happier with my choice. The design is elegant and fits perfectly with my home decor. The bed has a sturdy wooden frame and a soft, comfortable cushion that my cat loves. As soon as I set it up, she curled up in it and fell asleep right away, which is a first for her!
                                            The cushion is thick and supportive, providing just the right amount of comfort for her. I love that the cushion cover is removable and machine washable, which makes cleaning so much easier. The bed is also large enough to accommodate her as she grows, so I know it’ll last a while.
                                            Yes, it’s on the expensive side, but it’s definitely worth the price for the quality and comfort it offers. My cat seems to sleep more soundly and comfortably now. If you’re looking for a durable, stylish, and cozy bed for your pet, I highly recommend this one.
                                        </p>
                                    </div>
                                    <cite className={styles["reviews__author"]}>Emma Johnson</cite>
                                </blockquote>
                            </SwiperSlide>
                            <SwiperSlide className={styles["reviews__slide"]}>
                                <div className={styles["reviews__icon"]}>
                                    <svg width="72" height="67" viewBox="0 0 72 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.6946 45.1895C11.0448 44.7201 10.4193 44.2352 9.81794 43.7347M7.13673 41.1859C3.26473 37.0001 1 31.9272 1 26.4705C1.03721 -7.48577 70.946 -7.49458 70.9761 26.4705C71.4111 34.2762 65.8326 40.0022 60.6741 45.6789C58.9224 51.1795 49.3478 67.0153 45.7611 65.9486C43.2562 65.204 45.6964 51.8405 42.3055 52.2929C38.8393 52.7567 39.7511 52.4874 35.9854 52.4874C28.2609 52.4874 21.122 50.6259 15.3335 47.4708M49.7199 34.3387C49.7199 39.7953 43.5771 44.2188 35.9996 44.2188C28.422 44.2188 22.2792 39.7953 22.2792 34.3387C22.2792 28.8821 28.422 24.4586 35.9996 24.4586C43.5771 24.4586 49.7199 28.8821 49.7199 34.3387ZM26.3728 17.2351C27.4117 20.2542 26.2287 23.3892 23.7306 24.2373C21.2324 25.0854 18.3651 23.3255 17.3263 20.3064C16.2874 17.2874 17.4704 14.1524 19.9685 13.3042C22.4667 12.4561 25.334 14.216 26.3728 17.2351ZM52.0382 13.3161C54.5364 14.1642 55.7194 17.2992 54.6805 20.3183C53.6417 23.3374 50.7744 25.0973 48.2762 24.2491C45.7781 23.401 44.5951 20.266 45.6339 17.2469C46.6728 14.2279 49.5401 12.4679 52.0382 13.3161ZM40.7797 15.3231C40.7797 18.5137 38.6395 21.1001 35.9995 21.1001C33.3595 21.1001 31.2193 18.5137 31.2193 15.3231C31.2193 12.1325 33.3595 9.54607 35.9995 9.54607C38.6395 9.54607 40.7797 12.1325 40.7797 15.3231Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <blockquote className={styles["reviews__item"]}>
                                    <div className={styles["reviews__text"]}>
                                        <p>
                                            My dog adores this teddy bear! It's soft, durable, and perfect for playtime. He finds it much more fun to play with than other toys. Definitely worth the money!
                                        </p>
                                    </div>
                                    <cite className={styles["reviews__author"]}>Sarah Davis</cite>
                                </blockquote>
                            </SwiperSlide>
                            <SwiperSlide className={styles["reviews__slide"]}>
                                <div className={styles["reviews__icon"]}>
                                    <svg width="72" height="67" viewBox="0 0 72 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.6946 45.1895C11.0448 44.7201 10.4193 44.2352 9.81794 43.7347M7.13673 41.1859C3.26473 37.0001 1 31.9272 1 26.4705C1.03721 -7.48577 70.946 -7.49458 70.9761 26.4705C71.4111 34.2762 65.8326 40.0022 60.6741 45.6789C58.9224 51.1795 49.3478 67.0153 45.7611 65.9486C43.2562 65.204 45.6964 51.8405 42.3055 52.2929C38.8393 52.7567 39.7511 52.4874 35.9854 52.4874C28.2609 52.4874 21.122 50.6259 15.3335 47.4708M49.7199 34.3387C49.7199 39.7953 43.5771 44.2188 35.9996 44.2188C28.422 44.2188 22.2792 39.7953 22.2792 34.3387C22.2792 28.8821 28.422 24.4586 35.9996 24.4586C43.5771 24.4586 49.7199 28.8821 49.7199 34.3387ZM26.3728 17.2351C27.4117 20.2542 26.2287 23.3892 23.7306 24.2373C21.2324 25.0854 18.3651 23.3255 17.3263 20.3064C16.2874 17.2874 17.4704 14.1524 19.9685 13.3042C22.4667 12.4561 25.334 14.216 26.3728 17.2351ZM52.0382 13.3161C54.5364 14.1642 55.7194 17.2992 54.6805 20.3183C53.6417 23.3374 50.7744 25.0973 48.2762 24.2491C45.7781 23.401 44.5951 20.266 45.6339 17.2469C46.6728 14.2279 49.5401 12.4679 52.0382 13.3161ZM40.7797 15.3231C40.7797 18.5137 38.6395 21.1001 35.9995 21.1001C33.3595 21.1001 31.2193 18.5137 31.2193 15.3231C31.2193 12.1325 33.3595 9.54607 35.9995 9.54607C38.6395 9.54607 40.7797 12.1325 40.7797 15.3231Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <blockquote className={styles["reviews__item"]}>
                                    <div className={styles["reviews__text"]}>
                                        <p>
                                            These bowls look great in our kitchen. The quality is good, but they are a bit heavy to move around if you need to change the feeding spot. However, they stay in place and look much more stylish than other bowls.
                                        </p>
                                    </div>
                                    <cite className={styles["reviews__author"]}>David Wilson</cite>
                                </blockquote>
                            </SwiperSlide>
                        </Swiper>
                        <div className={styles["reviews__arrows"]}>
                            <button className={`${styles["reviews__button"]} ${styles["reviews__arrow--prev"]}`} ref={reviewsSwiperArrowLeftRef}>
                                <svg width="74" height="33" viewBox="0 0 74 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_d_prev)">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0 16.1413V16.8587C6.98686 20.4456 12.8637 25.8783 15.0198 32.9999C15.0212 33.0047 15.5144 32.7068 15.5407 32.6981C15.5672 32.6893 15.5115 32.7025 15.5098 32.6971C13.8759 27.2491 7.68559 20.7872 3.15498 16.8587C25.3022 17.3659 51.8716 16.6025 74 17.2174V15.7826L3.15498 16.1413C7.68559 12.2127 13.7388 5.50793 15.3861 2.69928e-05L14.6263 6.26502e-06C12.4891 7.13566 7.93343 11.4782 0 16.1413Z" fill="#9D875C" />
                                    </g>
                                    <defs>
                                        <filter id="filter0_d_prev" x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox">
                                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                            <feOffset dy="3" />
                                            <feGaussianBlur stdDeviation="2" />
                                            <feComposite in2="hardAlpha" operator="out" />
                                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_781_114" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_781_114" result="shape" />
                                        </filter>
                                    </defs>
                                </svg>
                            </button>
                            <button className={`${styles["reviews__button"]} ${styles["reviews__arrow--next"]}`} ref={reviewsSwiperArrowRightRef}>
                                <svg width="74" height="33" viewBox="0 0 74 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_d_next)">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M74 16.1413V16.8587C67.0131 20.4456 61.1363 25.8783 58.9802 32.9999C58.9788 33.0047 58.4856 32.7068 58.4593 32.6981C58.4328 32.6893 58.4885 32.7025 58.4902 32.6971C60.1241 27.2491 66.3144 20.7872 70.845 16.8587C48.6978 17.3659 22.1284 16.6025 0 17.2174V15.7826L70.845 16.1413C66.3144 12.2127 60.2612 5.50793 58.6139 2.69928e-05L59.3737 6.26502e-06C61.5109 7.13566 66.0666 11.4782 74 16.1413Z" fill="#9D875C" />
                                    </g>
                                    <defs>
                                        <filter id="filter0_d_next" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox">
                                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                             <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                             <feOffset dy="3" />
                                             <feGaussianBlur stdDeviation="2" />
                                             <feComposite in2="hardAlpha" operator="out" />
                                             <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                             <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_781_114" />
                                             <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_781_114" result="shape" />
                                        </filter>
                                    </defs>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                </ParallaxContainer>
            </section>
        </>
    )
}