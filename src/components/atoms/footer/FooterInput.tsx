"use client";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const FooterInput: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
      {...props}
    />
  );
};

export default FooterInput;
