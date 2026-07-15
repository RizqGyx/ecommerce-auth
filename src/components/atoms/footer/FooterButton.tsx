"use client";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const FooterButton: React.FC<ButtonProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={`px-6 py-3 bg-gradient-primary text-foreground rounded-lg font-semibold hover:scale-105 transform transition-all duration-300 hover-glow ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default FooterButton;
