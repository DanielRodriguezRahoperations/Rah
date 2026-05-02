import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  to?: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  to,
  href,
  onClick,
  disabled = false,
  type = 'button',
  ...props
}) => {
  const baseClasses =
    'group relative inline-flex items-center justify-center overflow-hidden border font-semibold uppercase tracking-[0.2em] transition-all duration-300 disabled:pointer-events-none disabled:opacity-50';

  const variantClasses = {
    primary:
      'border-neutral-950 bg-neutral-950 text-white shadow-[0_18px_45px_rgba(17,17,17,0.16)] before:absolute before:inset-0 before:-translate-x-full before:bg-[#7a1c1c] before:transition-transform before:duration-300 hover:border-[#7a1c1c] hover:before:translate-x-0',
    secondary:
      'border-neutral-300 bg-[#fbfaf7] text-neutral-950 hover:border-[#7a1c1c] hover:text-[#7a1c1c] hover:shadow-[0_16px_42px_rgba(17,17,17,0.08)]',
    outline:
      'border-neutral-950 bg-transparent text-neutral-950 hover:border-[#7a1c1c] hover:text-[#7a1c1c]',
    dark:
      'border-white/20 bg-white/[0.04] text-white backdrop-blur-sm hover:border-[#d14b4b] hover:text-white hover:bg-white/[0.08]'
  };

  const sizeClasses = {
    sm: 'px-4 py-2.5 text-[10px]',
    md: 'px-6 py-3.5 text-[11px]',
    lg: 'px-8 py-4 text-xs'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = <span className="relative z-10">{children}</span>;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
