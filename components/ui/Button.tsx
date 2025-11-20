import * as React from "react"
import Link from "next/link"
import { Button as RetroButton, IButtonProps } from "@/components/retroui/Button"
import { cn } from "@/lib/utils"

interface ButtonProps extends Omit<IButtonProps, 'asChild'> {
  asChild?: boolean
  href?: string
  fullWidth?: boolean
}

function Button({
  className,
  variant = "default",
  size = "md",
  asChild = false,
  href,
  children,
  fullWidth = false,
  ...props
}: Readonly<ButtonProps>) {
  // If href is provided, render as Link with RetroUI Button
  if (href) {
    return (
      <RetroButton
        variant={variant}
        size={size}
        className={cn(fullWidth ? 'w-full' : '', className)}
        asChild
      >
        <Link href={href}>
          {children}
        </Link>
      </RetroButton>
    )
  }

  return (
    <RetroButton
      variant={variant}
      size={size}
      className={cn(fullWidth ? 'w-full' : '', className)}
      asChild={asChild}
      {...props}
    >
      {children}
    </RetroButton>
  )
}

// Default export for backward compatibility
export default Button
export { Button }
