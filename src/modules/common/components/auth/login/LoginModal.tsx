"use client"

import { Button } from "@/components/ui/button"
import LoginForm from "./LoginForm"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export const LoginModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Log In</Button>
      </DialogTrigger>

      <DialogContent 
        className="p-0 bg-transparent border-none max-w-fit  shadow-none w-[350px]"
      >
        <LoginForm />
        <DialogTitle></DialogTitle>
      </DialogContent>
    </Dialog>
  )
}
