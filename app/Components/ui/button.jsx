'use client'
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "/lib/utils"

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary-dark": variant === "default",
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive-dark": variant === "destructive",
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent-dark": variant === "outline",
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary-dark": variant === "secondary",
          "bg-transparent hover:bg-accent hover:text-accent-foreground active:bg-accent-dark": variant === "ghost",
          "bg-transparent underline-offset-4 hover:underline text-primary active:text-primary-dark": variant === "link",
          "h-10 px-4 py-2": size === "default",
          "h-9 rounded-md px-3": size === "sm",
          "h-11 rounded-md px-8": size === "lg",
          "h-9 w-9": size === "icon",
        },
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }

