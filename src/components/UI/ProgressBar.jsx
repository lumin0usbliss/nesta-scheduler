import './UI.css';

export const ProgressBar = ({ progress, color = 'var(--primary)', height = 8 }) => {
  return (
    <div className="nesta-progress-bg" style={{ height }}>
      <div 
        className="nesta-progress-fill" 
        style={{ width: `${Math.min(100, Math.max(0, progress))}%`, backgroundColor: color }}
      />
    </div>
  );
};
