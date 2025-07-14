"use client"

// import { useEffect, useState } from "react"
// import { useLocation } from "react-router-dom"
// import styles from "./PageTransition.module.scss"

// export default function PageTransition() {
//   const location = useLocation()
//   const [isVisible, setIsVisible] = useState(true)

//   useEffect(() => {

//     location.search.includes("?name=") || location.search.includes("?filter=") || location.search.includes("?category=")  ? 
//       document.body.scrollTo({ top: 250, behavior: 'smooth', }) : 
//       document.body.scrollTo({ top: 0, behavior: 'smooth', })
    


//     setIsVisible(true)

//     const timeout = setTimeout(() => {
//       setIsVisible(false)
//     }, 1000)


//     return () => clearTimeout(timeout)
//   }, [location.pathname, location.search])

//   return isVisible ? <div className={styles.overlay}></div> : null
// }


import { useEffect, useState } from "react"
import styles from "./PageTransition.module.scss"
import { usePathname } from "next/navigation"

export default function PageTransition() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {

    // location.search.includes("?name=") || location.search.includes("?filter=") || location.search.includes("?category=")  ? 
    //   document.body.scrollTo({ top: 250, behavior: 'smooth', }) : 
    //   document.body.scrollTo({ top: 0, behavior: 'smooth', })
    


    setIsVisible(true)

    const timeout = setTimeout(() => {
      setIsVisible(false)
    }, 1000)


    return () => clearTimeout(timeout)
  }, [pathname])

  return isVisible ? <div className={styles.overlay}></div> : null
}
