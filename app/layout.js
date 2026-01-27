import "./globals.css"
import { AuthProvider } from "../app/provider/AuthProvider"

export const metadata = {
  title: "Growtech Central",
  description: "Toko Digital Terpercaya",
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
