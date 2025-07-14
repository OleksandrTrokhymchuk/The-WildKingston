"use client"

import { useEffect, useRef } from "react"

export default function ParallaxContainer({ children, className, additionalStyles }) {
  const itemsRef = useRef([])

  useEffect(() => {
    const items = itemsRef.current

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        const element = entry.target
        element.style.willChange = "transform, opacity"
    
        if (entry.isIntersecting) {
          element.style.transition = "opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), filter 0.8s ease"
          element.style.transitionDelay = `${index * 100}ms`
          element.style.opacity = "1"
          element.style.transform = "translateY(0) scale(1) rotate(0deg)"
          element.style.filter = "blur(0px)"
          element.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)"
        } else {
          element.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-in, filter 0.6s ease"
          element.style.transitionDelay = "0ms"
          element.style.opacity = "0"
          element.style.transform = "translateY(100px) scale(1.03) rotate(2deg)"
          element.style.filter = "blur(6px)"
          element.style.boxShadow = "none"
        }
      })
    }, { threshold: 0 })
    

    items.forEach((item) => {
        if (item instanceof Element) {
          observer.observe(item)
        }
      })
  
      return () => {
        items.forEach((item) => {
          if (item instanceof Element) {
            observer.unobserve(item)
          }
        })
      }
  }, [])

  return (
    <div className={`${className} ${additionalStyles}`} ref={(el) => (itemsRef.current[0] = el)}>
        {children}
    </div>
  )
}

