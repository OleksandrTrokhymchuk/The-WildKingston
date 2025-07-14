"use client"

import styles from "./BasketModal.module.css"
import { useRef, useEffect, useState } from "react"
import catStyles from "../../../styles/NotFoundPageStyles/NotFoundPageStyles.module.css"
import buttonStyles from "../../../styles/AdditionalStyles/ButtonStyles/ButtonStyles.module.css"
import ProductCartForBasketModal from "../../ProductCardForBasketModal/ProductCardForBasketModal"
import { Navigation, A11y, EffectFlip  } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { useSelector } from "react-redux"
import Link from "next/link"


export default function BasketModal({isOpen}) {
    const products = useSelector(state => state.productsSlice.products)
    const cartItems = useSelector(state => state.productsSlice.cartItems)

    const modalBackgroundRef = useRef(null)
    const modalWindowRef = useRef(null)
    
    
    const handleCloseModal = () => {
        modalBackgroundRef.current.classList.add(styles["closed"])
        modalWindowRef.current.classList.add(styles["closed"])
    }

    useEffect(() => {
        if(isOpen > 0) {
            modalBackgroundRef.current.classList.remove(styles["closed"])
            modalWindowRef.current.classList.remove(styles["closed"])
        }
    }, [isOpen])

    const handleClickNotModal = (event) => {
        if(!modalWindowRef.current?.contains(event.target) && !modalBackgroundRef.current?.classList.contains(styles["closed"])) {
            handleCloseModal()
        }
    }

    const basketSwiperArrowRightRef = useRef(null)
    const basketSwiperArrowLeftRef = useRef(null)
    const swiperRef = useRef(null) 
    const [isSwiperVisible, setIsSwiperVisible] = useState(false)

    useEffect(() => {
        if(isSwiperVisible) {

            basketSwiperArrowLeftRef.current.style.transition = "transform 0.6s ease, opacity 0.6s ease"
            basketSwiperArrowLeftRef.current.style.opacity = "0.6"
            basketSwiperArrowLeftRef.current.style.pointerEvents = "none"
            basketSwiperArrowLeftRef.current.style.transform = "translateX(50%) translateY(-1px) scale(0.5)"
            
            basketSwiperArrowRightRef.current.style.transition = "transform 0.6s ease, opacity 0.6s ease"
        }

        if (swiperRef.current) {
          

            swiperRef.current.params.navigation.prevEl = basketSwiperArrowLeftRef.current;
            swiperRef.current.params.navigation.nextEl = basketSwiperArrowRightRef.current;

            swiperRef.current.navigation.init();
            swiperRef.current.navigation.update();
        }

    }, [isSwiperVisible])

    
    return(
        <>
            {isOpen > 0 &&  
                <div className={`${styles["background"]} ${styles["closed"]}`} ref={modalBackgroundRef} onClick={handleClickNotModal}>
                    <div 
                        ref={modalWindowRef} 
                        className={`${styles["modal"]} ${styles["closed"]}`} 
                        style={{overflowY: cartItems.length > 1 && "scroll"}}
                    >
                        <div className={styles["modal__wrapper"]}>
                            <div className={styles["modal__header"]}>
                                <h4 className={styles["title"]}>
                                    Basket
                                </h4>
                                <button 
                                    className={styles["close-modal__icon"]} 
                                    onClick={handleCloseModal}
                                >
                                    <span></span>
                                    <span></span>
                                </button>
                            </div>
                            <div 
                                className={`${styles["modal__content"]} ${cartItems.length > 0 ? styles["modal__content--active"] : styles["modal__content--empty"]}`} 
                            >
                                {
                                    cartItems.length > 0 ? 
                                    <>
                                        {cartItems.map((cart) => 
                                            <div key={cart.id}>
                                                <ProductCartForBasketModal cart={cart} isDividerVisible={true}/>
                                            </div>
                                        )}
                                        {!isSwiperVisible && setIsSwiperVisible(true)}
                                        <p>You may also like: </p>
                                        <div className={`${styles["basket__slider"]} ${styles["swiper"]}`}>
                                            <Swiper className={`${styles["basket__wrapper"]} ${styles["swiper-wrapper"]}`}
                                                modules={[Navigation, A11y, EffectFlip]}
                                                speed={800}
                                                
                                                navigation={{
                                                    nextEl: basketSwiperArrowRightRef.current,
                                                    prevEl: basketSwiperArrowLeftRef.current,
                                                }}
                                                onSwiper={(basketSwiper) => (swiperRef.current = basketSwiper)}
                                                onSlideChange={(basketSwiper) => {
                                                    if (basketSwiper.isBeginning) {
                                                        basketSwiperArrowLeftRef.current.style.transform = "translateY(-1px) scale(0.5)"
                                                        basketSwiperArrowLeftRef.current.style.opacity = "0.4"
                                                        basketSwiperArrowLeftRef.current.style.pointerEvents = "none"
                                                
                                                        basketSwiperArrowRightRef.current.style.transform = "scale(1) translateX(-50%)"
                                                        basketSwiperArrowRightRef.current.style.opacity = "1"
                                                        basketSwiperArrowRightRef.current.style.pointerEvents = "auto"
                                                    } else if (basketSwiper.isEnd) {
                                                        basketSwiperArrowLeftRef.current.style.transform = "scale(1) translateX(50%)"
                                                        basketSwiperArrowLeftRef.current.style.opacity = "1"
                                                        basketSwiperArrowLeftRef.current.style.pointerEvents = "auto"
                                                
                                                        basketSwiperArrowRightRef.current.style.transform = "scale(0.5) translateY(-1px)"
                                                        basketSwiperArrowRightRef.current.style.opacity = "0.4"
                                                        basketSwiperArrowRightRef.current.style.pointerEvents = "none"
                                                    } else {
                                                        basketSwiperArrowLeftRef.current.style.transform = "scale(1)"
                                                        basketSwiperArrowLeftRef.current.style.opacity = "1"
                                                        basketSwiperArrowLeftRef.current.style.pointerEvents = "auto"
                                                
                                                        basketSwiperArrowRightRef.current.style.transform = "scale(1)"
                                                        basketSwiperArrowRightRef.current.style.opacity = "1"
                                                        basketSwiperArrowRightRef.current.style.pointerEvents = "auto"
                                                    }
                                                }}
                                                breakpoints={{
                                                    320: {
                                                      slidesPerView: 1,
                                                    },
                                                    1024: {
                                                      slidesPerView: 2,
                                                    },
                                                }}
                                            >
                                                {
                                                    products
                                                    .filter(product => 
                                                        !cartItems.some(item => item.id === product.id) 
                                                    )
                                                    .sort((a, b) => {
                                                        const aInCartCategory = cartItems.some(item => item.category === a.category);
                                                        const bInCartCategory = cartItems.some(item => item.category === b.category);
                                                        return bInCartCategory - aInCartCategory;
                                                    })
                                                    .map(product => (
                                                        <SwiperSlide className={styles["basket__slide"]} key={product.id}>
                                                            <ProductCartForBasketModal cart={product} isCardForSwiper={true} />
                                                        </SwiperSlide>
                                                    ))
                                                  
                                                }
                                            </Swiper>
                                            <div className={styles["basket__arrows"]}>
                                                <button className={`${styles["basket__button"]} ${styles["basket__arrow--prev"]}`} ref={basketSwiperArrowLeftRef}>
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
                                                <button className={`${styles["basket__button"]} ${styles["basket__arrow--next"]}`} ref={basketSwiperArrowRightRef}>
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
                                    </>
                                    : 
                                    (
                                        <>
                                            <img className={`${catStyles["cat-image"]} ${catStyles["cat-image--modal"]}`} src="/images/not-found-page/sad-cat.jpg" alt="Sad cat" />
                                            <p className={styles["text"]}>Your basket is empty. This beautiful cat hopes for fixing that...</p>
                                        </>
                                    )
                                }
                            </div>
                            <div className={styles["modal__footer"]}>
                                {
                                    cartItems.length > 0 ? (
                                        <>
                                            <p>
                                                Total amount: {cartItems.reduce((accumulator, currentItem) => {
                                                    return accumulator + (currentItem.price * currentItem.quantity)
                                                }, 0)}$
                                            </p>
                                            <Link
                                                href="/products"
                                                className={`${buttonStyles["button"]} ${buttonStyles["button--withBg"]}`}
                                                onClick={handleCloseModal}
                                            >
                                                <span>Close</span>
                                            </Link>
                                        </>
                                        )
                                        : 
                                        (
                                        <>
                                            <div className={styles["buttons__wrapper"]}>
                                                <Link
                                                    href="/products"
                                                    className={`${buttonStyles["button"]} ${buttonStyles["button--withBg"]}`}
                                                    onClick={handleCloseModal}
                                                >
                                                    <span>Go shopping</span>
                                                </Link>
                                                <button 
                                                    className={`${buttonStyles["button"]} ${buttonStyles["button--withBg"]}`}
                                                    onClick={handleCloseModal}
                                                >
                                                    <span>Close</span>
                                                </button>
                                            </div>
                                        </>
                                    )
                                }   
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}