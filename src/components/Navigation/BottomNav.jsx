import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Sparkles, Target, BookHeart } from 'lucide-react';
import './Navigation.css';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '홈', icon: Home },
    { path: '/planner', label: '플래너', icon: Calendar },
    { path: '/ai-manager', label: 'AI 매니저', icon: Sparkles },
    { path: '/focus', label: '집중', icon: Target },
    { path: '/diary', label: '일기', icon: BookHeart }
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link to={item.path} key={item.path} className={`nav-item ${isActive ? 'active' : ''}`}>
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
