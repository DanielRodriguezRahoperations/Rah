import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  to?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  ripple?: boolean;
  magnetic?: boolean;
  glow?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'right',
  ripple = true,
  magnetic = false,
  glow = false
}) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const rippleIdRef = useRef(0);

  const baseClasses = `
    relative inline-flex items-center justify-center font-semibold rounded-lg 
    transition-all duration-300 transform focus:outline-none focus:ring-2 
    focus:ring-offset-2 overflow-hidden select-none
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    ${fullWidth ? 'w-full' : ''}
    ${magnetic ? 'magnetic-button' : ''}
    ${glow ? 'glow-button' : ''}
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] text-white 
      hover:from-[#1A7C81] hover:to-[#0F6168] shadow-lg hover:shadow-xl 
      focus:ring-[#3CBEC7] active:scale-95
      ${!disabled ? 'hover:scale-105' : ''}
    `,
    secondary: `
      bg-gradient-to-r from-[#97EDED] to-[#C9F8F6] text-[#0F6168] 
      hover:from-[#C9F8F6] hover:to-[#B5F3F0] shadow-md hover:shadow-lg 
      focus:ring-[#97EDED] active:scale-95
      ${!disabled ? 'hover:scale-105' : ''}
    `,
    outline: `
      border-2 border-[#3CBEC7] text-[#3CBEC7] bg-transparent
      hover:bg-[#3CBEC7] hover:text-white focus:ring-[#3CBEC7] 
      active:scale-95
      ${!disabled ? 'hover:scale-105' : ''}
    `,
    ghost: `
      text-[#3CBEC7] bg-transparent hover:bg-[#3CBEC7]/10 
      focus:ring-[#3CBEC7] active:scale-95
      ${!disabled ? 'hover:scale-105' : ''}
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-red-600 text-white 
      hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl 
      focus:ring-red-500 active:scale-95
      ${!disabled ? 'hover:scale-105' : ''}
    `
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  // Ripple effect handler
  const handleRipple = (event: React.MouseEvent) => {
    if (!ripple || disabled) return;

    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newRipple = {
      id: rippleIdRef.current++,
      x,
      y
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  };

  // Magnetic effect
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!magnetic || disabled) return;

    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = 50;

    if (distance < maxDistance) {
      const strength = (maxDistance - distance) / maxDistance;
      const moveX = (x / distance) * strength * 8;
      const moveY = (y / distance) * strength * 8;

      button.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + strength * 0.05})`;
    }
  };

  const handleMouseLeave = () => {
    if (!magnetic) return;
    const button = buttonRef.current as HTMLElement;
    if (button) {
      button.style.transform = '';
    }
    setIsHovered(false);
  };

  // Combined click handler
  const handleClick = (event: React.MouseEvent) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    handleRipple(event);
    if (onClick) {
      onClick(event);
    }
  };

  const ButtonContent = () => (
    <>
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

      {/* Glow effect */}
      {glow && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#3CBEC7] to-[#1A7C81] opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-md -z-10"></div>
      )}

      {/* Ripple effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ping pointer-events-none"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            animation: 'ripple 0.6s linear'
          }}
        />
      ))}

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && (
          <svg
            className="animate-spin h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        
        {icon && iconPosition === 'left' && (
          <span className={`${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}>
            {icon}
          </span>
        )}
        
        <span className={`${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}>
          {children}
        </span>
        
        {icon && iconPosition === 'right' && (
          <span className={`${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200 transform ${isHovered ? 'translate-x-1' : ''} transition-transform duration-200`}>
            {icon}
          </span>
        )}
      </span>

      {/* Focus ring */}
      <div className="absolute inset-0 rounded-lg ring-2 ring-transparent group-focus:ring-current opacity-0 group-focus:opacity-50 transition-opacity duration-200"></div>
    </>
  );

  // Link button
  if (to) {
    return (
      <Link
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        to={to}
        className={`${classes} group`}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        aria-disabled={disabled}
      >
        <ButtonContent />
      </Link>
    );
  }

  // External link button
  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={`${classes} group`}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        aria-disabled={disabled}
      >
        <ButtonContent />
      </a>
    );
  }

  // Regular button
  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`${classes} group`}
      disabled={disabled || loading}
      aria-busy={loading}
    >
      <ButtonContent />
    </button>
  );
};

export default Button;