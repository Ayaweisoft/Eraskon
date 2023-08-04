import React from 'react'

interface Props extends React.ComponentPropsWithoutRef<"button"> {
    children: React.ReactNode;
    className?: string;
    gradient?: 'grad-to-right' | 'grad-to-bottom' | 'grad-to-top' | 'bg-white';
}

const Button = ({ children, className, gradient, ...rest }: Props) => {
  return (
    <button className={`${gradient ? gradient : ""} bg-blue ${className ? className : ""}`} {...rest} >
        {children}
    </button>
  )
}

export default Button