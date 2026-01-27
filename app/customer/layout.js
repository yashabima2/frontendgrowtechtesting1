'use client'

import NavbarCustomer from '../../app/components/NavbarCustomer'
import Footer from '../../app/components/FooterCustomer'

export default function CustomerLayout({ children }) {
  return (
    <>
      <NavbarCustomer />
      {children}
      <Footer />
    </>
  );
}
