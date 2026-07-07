import './UI.css';

export const Card = ({ children, className = '', highlight = false, onClick, style = {} }) => {
  return (
    <div 
      className={`nesta-card ${highlight ? 'highlight' : ''} ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default', ...style }}
    >
      {children}
    </div>
  );
};
