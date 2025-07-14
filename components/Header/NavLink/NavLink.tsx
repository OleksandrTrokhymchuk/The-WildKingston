'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './NavLink.module.css'

export default function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`${styles["menu__link"]} ${isActive ? styles["active"] : ''}`}
    >
      {children}
    </Link>
  )
}
