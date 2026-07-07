import { useAppContext } from '../context/AppContext';
import { Card, Badge, Button } from '../components/UI';
import { UserCircle, Settings, Award, Calendar, Bell, ChevronRight, GraduationCap } from 'lucide-react';
import './Pages.css';

const MyPage = () => {
  const { profile, studyTime } = useAppContext();

  return (
    <div className="page-container" style={{ paddingTop: '16px' }}>
      
      {/* Profile Section */}
      <Card style={{ marginBottom: '24px' }}>
        <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '16px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UserCircle size={40} color="var(--primary)" />
          </div>
          <div>
            <h2 style={{ fontSize: '20px', marginBottom: '4px' }}>{profile.name}</h2>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              {profile.school} • {profile.department} {profile.grade}
            </div>
            <div style={{ marginTop: '8px' }}>
              <Badge color="blue">NESTA Pro</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Summary */}
      <div className="grid-cards" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
        <Card style={{ padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>총 공부 시간</div>
          <div style={{ fontSize: '22px', fontWeight: '700', color: 'var(--primary)' }}>{studyTime.weekly}h</div>
        </Card>
        <Card style={{ padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>목표 달성률</div>
          <div style={{ fontSize: '22px', fontWeight: '700', color: '#10B981' }}>82%</div>
        </Card>
        <Card style={{ padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>완료한 과제</div>
          <div style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)' }}>14개</div>
        </Card>
        <Card style={{ padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>획득한 뱃지</div>
          <div style={{ fontSize: '22px', fontWeight: '700', color: '#D97706' }}>3개</div>
        </Card>
      </div>

      {/* Integrations (Coming Soon) */}
      <div className="section">
        <h3 className="section-header" style={{ fontSize: '16px' }}>연동 (Coming Soon)</h3>
        <Card style={{ padding: '0' }}>
          <div className="list-item flex-between" style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
            <div className="flex-center" style={{ gap: '12px' }}>
              <Calendar size={20} color="var(--text-secondary)" />
              <span style={{ fontSize: '15px' }}>구글 캘린더 연동</span>
            </div>
            <Badge color="gray">준비 중</Badge>
          </div>
          <div className="list-item flex-between" style={{ padding: '16px' }}>
            <div className="flex-center" style={{ gap: '12px' }}>
              <GraduationCap size={20} color="var(--text-secondary)" />
              <span style={{ fontSize: '15px' }}>학교 LMS 연동</span>
            </div>
            <Badge color="gray">준비 중</Badge>
          </div>
        </Card>
      </div>

      {/* Settings */}
      <div className="section">
        <h3 className="section-header" style={{ fontSize: '16px' }}>설정</h3>
        <Card style={{ padding: '0' }}>
          <div className="list-item flex-between" style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', cursor: 'pointer' }}>
            <div className="flex-center" style={{ gap: '12px' }}>
              <Bell size={20} color="var(--text-secondary)" />
              <span style={{ fontSize: '15px' }}>알림 설정</span>
            </div>
            <ChevronRight size={20} color="var(--text-secondary)" />
          </div>
          <div className="list-item flex-between" style={{ padding: '16px', cursor: 'pointer' }}>
            <div className="flex-center" style={{ gap: '12px' }}>
              <Settings size={20} color="var(--text-secondary)" />
              <span style={{ fontSize: '15px' }}>앱 설정</span>
            </div>
            <ChevronRight size={20} color="var(--text-secondary)" />
          </div>
        </Card>
      </div>

    </div>
  );
};

export default MyPage;
