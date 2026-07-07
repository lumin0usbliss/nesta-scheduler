import { useNavigate, useLocation } from 'react-router-dom';
import { User, ChevronLeft } from 'lucide-react';
import './Navigation.css';

const TopHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case '/': return 'NESTA';
      case '/planner': return '플래너';
      case '/ai-manager': return 'AI 매니저';
      case '/focus': return '집중 시간';
      case '/diary': return '오늘의 일기';
      case '/mypage': return '마이페이지';
      default: return 'NESTA';
    }
  };

  const isHome = location.pathname === '/';

  return (
    <header className="top-header">
      <div className="header-left">
        {!isHome && (
          <button className="back-button" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} />
          </button>
        )}
        <h1 className={isHome ? 'logo-text' : 'page-title'}>{getTitle()}</h1>
      </div>
      <button className="my-page-button" onClick={() => navigate('/mypage')}>
        <User size={24} />
      </button>
    </header>
  );
};

export default TopHeader;
