import './UI.css';

export const Button = ({ children, variant = 'primary', className = '', onClick, fullWidth = false, ...props }) => {
  return (
    <button 
      className={`nesta-button btn-${variant} ${fullWidth ? 'full-width' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
