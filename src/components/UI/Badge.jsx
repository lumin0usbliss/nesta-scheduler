import './UI.css';

export const Badge = ({ children, color = 'blue', className = '', ...props }) => {
  return (
    <span className={`nesta-badge badge-${color} ${className}`} {...props}>
      {children}
    </span>
  );
};
