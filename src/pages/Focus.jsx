import { Card, ProgressBar, Badge, Button } from '../components/UI';
import { Target, TrendingUp, Sun, Coffee, Sparkles } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './Pages.css';

const Focus = () => {
  const data = [
    { name: '월', 집중력: 65 },
    { name: '화', 집중력: 85 },
    { name: '수', 집중력: 45 },
    { name: '목', 집중력: 90 },
    { name: '금', 집중력: 30 },
    { name: '토', 집중력: 15 },
    { name: '일', 집중력: 10 }
  ];

  return (
    <div className="page-container" style={{ paddingTop: '16px' }}>
      
      <Card highlight style={{ marginBottom: '24px' }}>
        <div className="flex-between" style={{ marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>이번 주 집중 시간</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)' }}>24시간 30분</div>
            <div style={{ fontSize: '12px', color: 'var(--primary)' }}>목표 30시간의 82% 달성</div>
          </div>
          <div className="stat-icon blue" style={{ width: '48px', height: '48px' }}>
            <TrendingUp size={24} />
          </div>
        </div>
        <ProgressBar progress={82} height={10} />
      </Card>

      <div className="section">
        <h3 className="section-header" style={{ fontSize: '16px' }}>요일별 집중도</h3>
        <Card style={{ padding: '20px 10px 10px 10px', height: '200px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
              <YAxis hide />
              <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-soft)' }} />
              <Bar dataKey="집중력" radius={[4, 4, 4, 4]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.집중력 > 80 ? 'var(--primary)' : 'var(--primary-light)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="section">
        <div className="flex-between section-header">
          <h3 style={{ fontSize: '16px' }}>당신의 최적 집중 시간</h3>
          <Sparkles size={16} color="var(--primary)" />
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>당신의 학습 패턴을 분석한 결과, 다음 시간대에 가장 높은 집중력을 보여요.</p>
        
        <Card className="focus-time-card" style={{ borderColor: 'var(--accent-warm)' }}>
          <div className="flex-between">
            <div className="flex-center" style={{ gap: '12px' }}>
              <Sun size={24} color="#D97706" />
              <div>
                <div style={{ fontWeight: '600', fontSize: '15px' }}>오전 집중 (09:00 - 12:00)</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>가장 높은 인지 능력 시간대</div>
              </div>
            </div>
            <div style={{ fontWeight: '700', color: 'var(--primary)' }}>95%</div>
          </div>
        </Card>
        
        <Card className="focus-time-card">
          <div className="flex-between">
            <div className="flex-center" style={{ gap: '12px' }}>
              <Coffee size={24} color="var(--text-secondary)" />
              <div>
                <div style={{ fontWeight: '600', fontSize: '15px' }}>오후 집중 (14:00 - 17:00)</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>점심 후 안정적인 집중 시간</div>
              </div>
            </div>
            <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>75%</div>
          </div>
        </Card>
      </div>

      <Button variant="primary" fullWidth style={{ marginTop: '24px' }}>
        <Target size={18} /> 집중 세션 시작하기
      </Button>
    </div>
  );
};

export default Focus;
