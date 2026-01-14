'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function FooterHandler() {
  const pathname = usePathname()
  
  // Verificar si estamos en una ruta del dashboard
  const isDashboardRoute = pathname?.startsWith('/dashboard')
  
  // Si estamos en el dashboard, no mostrar el footer
  if (isDashboardRoute) {
    return null
  }
  
  // Si no, mostrar el footer
  return <Footer />
}