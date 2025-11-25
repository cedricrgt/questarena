"use client";
import Link from "next/link";

type ButtonProps = {
  label?: string;
  href?: string;
  onClick?: ((e: React.MouseEvent<HTMLButtonElement>) => void) | (() => void);
  variant?: "primary" | "cta" | "white" | "outline" | "clipPathPolygon";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children?: React.ReactNode;
};

const Button = ({
  label,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
  children,
}: ButtonProps) => {
  const baseStyle = `
    px-4 py-2 rounded transition-all transform duration-200 ease-in-out
    font-bold uppercase tracking-wider
  `;

  const variants = {
    primary: "bg-secondary text-noir hover:bg-secondary/90 hover:shadow-[0_0_15px_rgba(169,111,255,0.5)]",
    cta: "bg-cta text-noir shadow-[0_0_10px_rgba(233,184,114,0.6)] hover:bg-cta/80 hover:shadow-[0_0_20px_rgba(233,184,114,0.8)] hover:scale-105",
    white: "bg-blanc text-noir hover:bg-gray-200 hover:shadow-lg ",
    outline: "bg-transparent border border-primary/50 text-white hover:border-secondary hover:text-secondary",
    clipPathPolygon: "clip-path-polygon [clip-path:polygon(10%_0,100%_0,100%_70%,90%_100%,0_100%,0_30%)] bg-cta text-noir shadow-[0_0_10px_rgba(233,184,114,0.6)] hover:bg-cta/80 hover:shadow-[0_0_20px_rgba(233,184,114,0.8)] hover:scale-105",
  };

  const combinedClassName = `${baseStyle} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {label}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled}
    >
      {children || label}
    </button>
  );
};

export default Button;
