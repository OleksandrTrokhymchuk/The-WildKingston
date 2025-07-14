"use client"

import 'swiper/css/bundle';
import styles from "./HeroSwiper.module.css"
import { useEffect, useRef } from "react"
import { Navigation, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

export default function HeroSwiper() {
    const heroSwiperArrowRightRef = useRef(null)
    const heroSwiperArrowLeftRef = useRef(null)
    const swiperRef = useRef(null); 

    useEffect(() => {
        heroSwiperArrowLeftRef.current.style.transition = "transform 0.6s ease, opacity 0.6s ease"
        heroSwiperArrowLeftRef.current.style.opacity = "0.4"
        heroSwiperArrowLeftRef.current.style.pointerEvents = "none"
        heroSwiperArrowLeftRef.current.style.transform = "translateX(50%) translateY(-1px) scale(0.5)"

        heroSwiperArrowRightRef.current.style.transition = "transform 0.6s ease, opacity 0.6s ease"

        if (swiperRef.current) {
            swiperRef.current.params.navigation.prevEl = heroSwiperArrowLeftRef.current
            swiperRef.current.params.navigation.nextEl = heroSwiperArrowRightRef.current

            swiperRef.current.navigation.init()
            swiperRef.current.navigation.update()
        }
    }, [])

    return (
        <>
            <div className={`${styles["swiper"]} ${styles["hero-slider"]}`}>
                <Swiper className={`${styles["hero__wrapper"]} ${styles["swiper-wrapper"]}`}
                    lazy={{
                      loadPrevNext: true, 
                    }}
                    modules={[Navigation, A11y]}
                    spaceBetween={30}
                    speed={800}
                    centeredSlides
                    slidesPerView={"auto"}
                    navigation={{
                        nextEl: heroSwiperArrowRightRef.current,
                        prevEl: heroSwiperArrowLeftRef.current,
                      }}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={(heroSwiper) => {
                        if (heroSwiper.isBeginning) {
                            heroSwiperArrowLeftRef.current.style.transform = "translateY(-1px) scale(0.5)"
                            heroSwiperArrowLeftRef.current.style.opacity = "0.4"
                            heroSwiperArrowLeftRef.current.style.pointerEvents = "none"
                            heroSwiperArrowRightRef.current.style.transform = "scale(1) translateX(-50%)"
                            heroSwiperArrowRightRef.current.style.opacity = "1"
                            heroSwiperArrowRightRef.current.style.pointerEvents = "auto"
                        } 
                        else if (heroSwiper.isEnd) {
                            heroSwiperArrowLeftRef.current.style.transform = "scale(1) translateX(50%)"
                            heroSwiperArrowLeftRef.current.style.opacity = "1"
                            heroSwiperArrowLeftRef.current.style.pointerEvents = "auto"
                            heroSwiperArrowRightRef.current.style.transform = "scale(0.5) translateY(-1px)"
                            heroSwiperArrowRightRef.current.style.opacity = "0.4"
                            heroSwiperArrowRightRef.current.style.pointerEvents = "none"
                        } 
                        else {
                            heroSwiperArrowLeftRef.current.style.transform = "scale(1)"
                            heroSwiperArrowLeftRef.current.style.opacity = "1"
                            heroSwiperArrowLeftRef.current.style.pointerEvents = "auto"
                            heroSwiperArrowRightRef.current.style.transform = "scale(1)"
                            heroSwiperArrowRightRef.current.style.opacity = "1"
                            heroSwiperArrowRightRef.current.style.pointerEvents = "auto"
                        }
                    }}
                >
                    <SwiperSlide className={styles["hero__slide"]}>
                        <div className={styles["slide-hero__body"]}>
                            <img src="/images/hero/pets/01.webp" alt="Image" className={styles["slide-hero__image"]} loading="lazy"/>
                        </div>
                        <div className={styles["slide-hero__top-image"]}>
                            <img src="/images/hero/pets/01.webp" alt="Image" loading="lazy" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={styles["hero__slide"]}>
                        <div className={styles["slide-hero__body"]}>
                            <img src="/images/hero/pets/04.webp" alt="Image" className={styles["slide-hero__image"]}  loading="lazy"/>
                        </div>
                        <div className={styles["slide-hero__top-image"]}>
                            <img src="/images/hero/pets/04.webp" alt="Image" loading="lazy"/>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={styles["hero__slide"]}>
                        <div className={styles["slide-hero__body"]}>
                            <img src="/images/hero/pets/02.webp" alt="Image" className={styles["slide-hero__image"]} loading="lazy"/>
                        </div>
                        <div className={styles["slide-hero__top-image"]}>
                            <img src="/images/hero/pets/02.webp" alt="Image" loading="lazy"/>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={styles["hero__slide"]}>
                        <div className={styles["slide-hero__body"]}>
                            <img src="/images/hero/pets/03.webp" alt="Image" className={styles["slide-hero__image"]} loading="lazy"/>
                        </div>
                        <div className={styles["slide-hero__top-image"]}>
                            <img src="/images/hero/pets/03.webp" alt="Image" loading="lazy"/>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className={styles["hero-slider__navigation-buttons"]}>
                <button className={styles["hero__arrow--left"]} ref={heroSwiperArrowLeftRef}>
                    <svg className={styles["svg-arrow"]} width="62" height="26" viewBox="0 0 62 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_781_114)">
                          <path fillRule="evenodd" clipRule="evenodd" d="M58 12.7174V13.2826C52.9015 16.1087 48.613 20.389 47.0396 26C47.0386 26.0037 46.6787 25.769 46.6595 25.7621C46.6401 25.7552 46.6808 25.7656 46.682 25.7614C47.8744 21.469 52.3916 16.3778 55.6977 13.2826C39.5362 13.6823 20.1477 13.0808 4 13.5652V12.4348L55.6977 12.7174C52.3916 9.62214 47.9744 4.33958 46.7723 1.6331e-05L47.3267 0C48.8863 5.62203 52.2107 9.04346 58 12.7174Z" fill="#C1AB81" />
                        </g>
                        <defs>
                          <filter id="filter0_d_781_114" x="0" y="0" width="62" height="26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="4" />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_781_114" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_781_114" result="shape" />
                          </filter>
                        </defs>
                    </svg>
                </button>
                <button className={styles["hero__arrow--right"]} ref={heroSwiperArrowRightRef}>
                    <svg className={styles["svg-arrow"]} width="62" height="26" viewBox="0 0 62 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_781_114)">
                            <path fillRule="evenodd" clipRule="evenodd" d="M58 12.7174V13.2826C52.9015 16.1087 48.613 20.389 47.0396 26C47.0386 26.0037 46.6787 25.769 46.6595 25.7621C46.6401 25.7552 46.6808 25.7656 46.682 25.7614C47.8744 21.469 52.3916 16.3778 55.6977 13.2826C39.5362 13.6823 20.1477 13.0808 4 13.5652V12.4348L55.6977 12.7174C52.3916 9.62214 47.9744 4.33958 46.7723 1.6331e-05L47.3267 0C48.8863 5.62203 52.2107 9.04346 58 12.7174Z" fill="#C1AB81" />
                        </g>
                        <defs>
                            <filter id="filter0_d_781_114" x="0" y="0" width="62" height="26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="4" />
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
        </>
    )   
}   