import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import MainLayout from './components/Layout/MainLayout';
import Home from './pages/Home';
import Planner from './pages/Planner';
import AIManager from './pages/AIManager';
import Focus from './pages/Focus';
import Diary from './pages/Diary';
import MyPage from './pages/MyPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/ai-manager" element={<AIManager />} />
            <Route path="/focus" element={<Focus />} />
            <Route path="/diary" element={<Diary />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </MainLayout>
      </Router>
    </AppProvider>
  );
}

export default App;
