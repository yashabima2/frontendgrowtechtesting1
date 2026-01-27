import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export function middleware(req) {
  const token = req.cookies.get("token")?.value
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  const decoded = jwt.decode(token)
  const permissions = decoded?.permissions || []

  const path = req.nextUrl.pathname.split("/")[2]

  if (path && !permissions.includes(path)) {
    return NextResponse.redirect(
      new URL("/admin/dashboard", req.url)
    )
  }
}
