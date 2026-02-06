import { Suspense } from "react"
import ResetPasswordClient from "./ResetPasswordClient"

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: "center", marginTop: 40 }}>Loading...</div>}>
      <ResetPasswordClient />
    </Suspense>
  )
}
