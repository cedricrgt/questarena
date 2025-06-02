'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

type ButtonProps = {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'cta' | 'white';
};

const Button = ({ label, href, onClick, variant = 'primary' }: ButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) return onClick();
    if (href) router.push(href);
  };

  const baseStyle = `
    px-4 py-2 rounded transition
    transform duration-200 ease-in-out
    hover:-translate-y-0.5 hover:shadow-lg
  `;

  const variants = {
    primary: 'bg-secondary text-blanc hover:bg-secondary/90',
    cta: 'bg-cta text-noir hover:bg-cta/90',
    white: 'bg-blanc text-cta hover:bg-blanc/90',
  };

  return (
    <button className={`${baseStyle} ${variants[variant]}`} onClick={handleClick}>
      {label}
    </button>
  );
};

export default Button;
