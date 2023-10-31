import "./Button.scss";

interface ButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
  isFullyBooked?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  isFullyBooked,
}) => {
  return (
    <button
      className="button"
      onClick={onClick}
      disabled={isFullyBooked || false}
    >
      {children}
    </button>
  );
};

export default Button;
