import TopHeader from '../Navigation/TopHeader';
import BottomNav from '../Navigation/BottomNav';

const MainLayout = ({ children }) => {
  return (
    <div className="app-container">
      <div className="mobile-wrapper">
        <TopHeader />
        <div className="content-area">
          {children}
        </div>
        <BottomNav />
      </div>
    </div>
  );
};

export default MainLayout;
