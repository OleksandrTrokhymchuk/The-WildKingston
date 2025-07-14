import styles from "./FooterMenu.module.css"
import Link from "next/link"

export default function FooterMenu() {
    return (
        <div className={`${styles["footer__menu"]} ${styles["menu-footer"]}`}>
            <h5 className={styles["menu-footer__title"]}>Sitemap</h5>
            <ul className={styles["menu-footer__list"]}>
                <li className={styles["menu-footer__item"]}>
                    <Link href="/" className={styles["menu-footer__link"]}>Home</Link>
                </li>
                <li className={styles["menu-footer__item"]}>
                    <Link href="/about" className={styles["menu-footer__link"]}>About</Link>
                </li>
                <li className={styles["menu-footer__item"]}>
                    <Link href="/products" className={styles["menu-footer__link"]}>Products</Link>
                </li>
                <li className={styles["menu-footer__item"]}>
                    <Link href="/services" className={styles["menu-footer__link"]}>Services</Link>
                </li>
            </ul>
        </div>
    )
}