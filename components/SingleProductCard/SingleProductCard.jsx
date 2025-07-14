import styles from "./SingleProductCard.module.css"
import buttonStyles from "../../styles/AdditionalStyles/ButtonStyles/ButtonStyles.module.css"
import { useDispatch, useSelector } from "react-redux"
import { addCartItem } from "../../app/store/productsSlice"
import Link from "next/link"

export default function SingleProductCard({ id, name, category, price, rating, imageSrc, isHide })  {

    const cartItems = useSelector(state => state.productsSlice.cartItems)
    const dispatch = useDispatch()
    const product = { id, name, category, price, rating, imageSrc, isHide }
    
    return (
        <article className={`${styles["product__item"]} ${styles["item-product"]} ${styles[isHide && "item-product--disabled"]}`}> 
            <div className={styles["item__product-header"]}>
                <div className={styles["item-product__image-ibg-contain"]}>
                    <img src={imageSrc} alt="Product"/>
                </div>
                {cartItems.find(cartItem => 
                    cartItem.id === product.id) ? (
                        <button
                            className={`${styles["item-product__add-to-cart"]} ${styles["item-product__add-to-cart--disabled"]}  ${buttonStyles["button"]} ${buttonStyles["button--withBg"]}`}
                        >
                            <span>Added</span>
                        </button>
                    ) : 
                    (
                        <button
                            className={`${styles["item-product__add-to-cart"]} ${buttonStyles["button"]} ${buttonStyles["button--withBg"]}`}
                            onClick={() => {dispatch(addCartItem(product))}}
                        >
                            <span>Add to cart</span>
                        </button>
                    )
                }
                </div>
                <div className={styles["item-product__body"]}>
                    <h4 className={styles["item-product__title"]}>
                        <Link href="/" className={styles["item-product__link-title"]}>{name}</Link>
                    </h4>
                <div className={styles["item-product__price"]}>{price}$</div>
                <div className={styles["item-product__rating"]}>
                    {[...Array(5)].map((_, index) => (
                        <div 
                            key={index} 
                            className={index < rating ? styles["rating__item--active"] : styles["rating__item"]} 
                        />
                    ))}
                </div>
            </div>
        </article>
    )
}