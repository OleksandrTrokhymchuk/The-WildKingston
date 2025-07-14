"use client"

import { useRef, useState, useEffect } from "react"
// import styles from "./ProductCardForBasketModal.module.css"
import styles from "./ProductCardForBasketModal.module.css"

import { Divider } from "antd"
import { addCartItem, removeCartItem, decreaseCartItem, changeItemQuantity } from "../../app/store/productsSlice"
import { useDispatch } from "react-redux"

export default function ProductCartForModal({cart, isDividerVisible, isCardForSwiper = false}) {
    
    const inputCartCountRef = useRef()
    const buttonDecreaseItemQuantityRef = useRef(null)
    const buttonIncreaseItemQuantityRef = useRef(null)
    
    const [isRemoving, setIsRemoving] = useState(false)

    const dispatch = useDispatch()

    const handleRemoveCart = () => {
        setIsRemoving(true)
        setTimeout(() => {
            dispatch(removeCartItem(cart))
        }, 500) 
    }

    useEffect(() => {
        if (!isCardForSwiper) {
            buttonDecreaseItemQuantityRef.current.style.pointerEvents = cart.quantity === 1 ? "none" : "auto"
            buttonDecreaseItemQuantityRef.current.style.color = cart.quantity === 1 ? "#b9b3a8" : "#9d875c"
        }
    }, [cart.quantity])

    const changeInputStyle = (input) => {
        input.style.transform = "scale(1.05)"
        input.style.color = "black"
        input.style.borderRadius = "8px"
        setTimeout(() => {
            input.style.transform = "scale(1)"
            input.style.color = "#222220"
            input.style.borderRadius = "5px"
        }, 200)
    } 

    const handleChange = (event) => {
        const newValue = event.target.value
    
        if(newValue > 0 && newValue < 1000)
        {
            if (newValue === '' || (newValue > 0 && !isNaN(newValue))) {
                changeInputStyle(inputCartCountRef.current)
                dispatch(changeItemQuantity({ id: cart.id, newProductQuantity: event.target.valueAsNumber }));
            }
        }
    }

    return (
        <div className={`${styles["cart"]} ${isRemoving ? styles["cart--remove"] : ""}`}>
            <div className={`${styles["cart__wrapper"]}`} style={{flexDirection: isCardForSwiper && "column"}}>
                <div className={styles["item-product__image-ibg-contain"]}>
                    <img src={cart.imageSrc} alt={cart.name}/>
                </div>
                {isCardForSwiper && 
                    <>
                        <p>{cart.name}</p>
                        <p>{cart.price}$</p>
                        <button className={styles["button-add"]} onClick={() => dispatch(addCartItem(cart))}>Add</button>
                    </>
                }
                {!isCardForSwiper && 
                    <div className={styles["product-info"]}>
                        <p>Name: {cart.name}</p>
                        <p>Price: {cart.price}$</p>

                        <label htmlFor="numberInput" className={styles["label"]}>
                                <button
                                    ref={buttonDecreaseItemQuantityRef}
                                    className={`${styles["input__button"]} ${styles["input__button--decrease"]}`}
                                    onClick={() => {
                                            dispatch(decreaseCartItem(cart))
                                            changeInputStyle(inputCartCountRef.current)
                                        }
                                    }
                                    >
                                        -
                                    </button>
                                <input
                                    ref={inputCartCountRef}
                                    id="label"
                                    className={styles["input"]}
                                    type="number"
                                    min="1"
                                    step="1"
                                    max="1000"
                                    value={cart.quantity}
                                    onChange={handleChange}
                                />

                            <button
                                ref={buttonIncreaseItemQuantityRef}
                                className={`${styles["input__button"]} ${styles["input__button--increase"]}`}
                                onClick={() => {
                                    dispatch(addCartItem(cart))
                                    changeInputStyle(inputCartCountRef.current)
                                }
                            }
                            >
                                +
                            </button>
                        </label>

                        <button
                            className={styles["input__button--remove"]}
                            onClick={handleRemoveCart}
                        >
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4V4zm2 2h6V4H9v2zM6.074 8l.857 12H17.07l.857-12H6.074z"/>
                        </svg>
                        </button>
                    </div>
                }   
            </div>
            {isDividerVisible && <Divider />}
        </div>

    )
}