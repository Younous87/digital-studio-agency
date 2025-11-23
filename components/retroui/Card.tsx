import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React, { HTMLAttributes } from "react";
import { Text } from "@/components/retroui/Text";

const cardVariants = cva("inline-block rounded transition-all", {
  variants: {
    variant: {
      default: "border-2 shadow-md bg-card",
      retro: "border-2 shadow-md bg-white",
      elevated: "border-2 shadow-lg bg-card",
      plain: "bg-transparent border-0",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface ICardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, ICardProps>(function Card(
  { variant = "default", className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  );
});

const CardHeader = React.forwardRef<HTMLDivElement, ICardProps>(function CardHeader(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col justify-start p-4", className)}
      {...props}
    />
  );
});

const CardTitle = React.forwardRef<HTMLDivElement, ICardProps>(function CardTitle(
  { className, ...props },
  ref,
) {
  return <Text as="h3" ref={ref} className={cn("mb-2", className)} {...props} />;
});

const CardDescription = React.forwardRef<HTMLDivElement, ICardProps>(function CardDescription(
  { className, ...props },
  ref,
) {
  return (
    <p ref={ref} className={cn("text-muted-foreground", className)} {...props} />
  );
});

const CardContent = React.forwardRef<HTMLDivElement, ICardProps>(function CardContent(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={cn("p-4", className)} {...props} />;
});

const CardComponent = Object.assign(Card, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
});

export { CardComponent as Card };
