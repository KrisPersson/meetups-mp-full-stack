import './Button.scss';

interface ButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <button
      className="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
