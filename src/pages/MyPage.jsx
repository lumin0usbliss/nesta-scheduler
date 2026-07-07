import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Card, Badge, Button } from '../components/UI';
import { UserCircle, Settings, Award, Calendar, Bell, ChevronRight, GraduationCap, Edit2, Plus } from 'lucide-react';
import ProfileEditModal from '../components/ProfileEditModal';
import FixedScheduleModal from '../components/FixedScheduleModal';
import Timetable from '../components/Timetable';
import './Pages.css';

const MyPage = () => {
  const { profile, studyTime } = useAppContext();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [draggedScheduleData, setDraggedScheduleData] = useState(null);

  const handleScheduleDrag = (data) => {
    setDraggedScheduleData(data);
    setIsScheduleModalOpen(true);
  };

  const handleScheduleClick = (schedule) => {
    setDraggedScheduleData(schedule);
    setIsScheduleModalOpen(true);
  };

  const handleCloseScheduleModal = () => {
    setIsScheduleModalOpen(false);
    setDraggedScheduleData(null);
  };

  return (
    <div className="page-container" style={{ paddingTop: '16px' }}>
      
      {/* Profile Section */}
      <Card style={{ marginBottom: '24px' }}>
        <div className="flex-between">
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
          <button className="icon-btn" onClick={() => setIsProfileModalOpen(true)}>
            <Edit2 size={20} color="var(--text-secondary)" />
          </button>
        </div>
      </Card>

      {/* Timetable Section */}
      <div className="section" style={{ marginBottom: '24px' }}>
        <div className="flex-between" style={{ marginBottom: '12px' }}>
          <h3 className="section-header" style={{ fontSize: '16px', margin: 0 }}>내 시간표</h3>
          <div className="flex-center" style={{ gap: '12px' }}>
            <Button variant="secondary" onClick={() => setIsScheduleModalOpen(true)} className="flex-center" style={{ padding: '6px 12px', fontSize: '12px', gap: '4px' }}>
              <Plus size={14} /> 고정일정 추가
            </Button>
            <div className="flex-center" style={{ gap: '6px' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500' }}>수정 {isEditMode ? 'ON' : 'OFF'}</span>
              <label className="toggle-switch">
                <input type="checkbox" checked={isEditMode} onChange={(e) => setIsEditMode(e.target.checked)} />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>
        <Timetable isEditMode={isEditMode} onScheduleDrag={handleScheduleDrag} onScheduleClick={handleScheduleClick} />
      </div>

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

      {isProfileModalOpen && <ProfileEditModal onClose={() => setIsProfileModalOpen(false)} />}
      {isScheduleModalOpen && <FixedScheduleModal onClose={handleCloseScheduleModal} initialData={draggedScheduleData} />}
    </div>
  );
};

export default MyPage;
