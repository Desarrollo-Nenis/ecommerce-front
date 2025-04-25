"use client"

import { Session } from "next-auth"
import { LoginModal } from "./LoginModal"

interface ButtonLoginProps {
  session: Session | null
}

export const ButtonLogin = ({ session }: ButtonLoginProps) => {
  if (!session) {
    return <LoginModal />
  }

  return null
}
