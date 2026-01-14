'use client'

import { usePathname } from 'next/navigation'
import PublicNavbar from "@/components/dashboard/public/PublicNavbar"

export default function NavbarHandler() {
  const pathname = usePathname()
  
  // Verificar si estamos en una ruta del dashboard
  const isDashboardRoute = pathname?.startsWith('/dashboard')
  
  // Si estamos en el dashboard, no mostrar el navbar público
  if (isDashboardRoute) {
    return null
  }
  
  // Si no, mostrar el navbar público
  return <PublicNavbar />
}