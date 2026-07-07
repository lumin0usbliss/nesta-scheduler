import { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    name: '김우주',
    school: '한국대학교',
    department: '경영정보학과',
    grade: '4학년'
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('nesta_categories');
    return saved ? JSON.parse(saved) : ['수업', '과제', '시험', '프로젝트'];
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('nesta_tasks');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: '알고리즘 과제 제출', category: '과제', date: new Date().toISOString().split('T')[0], completed: false, priority: 'high' },
      { id: 2, title: '데이터베이스 수업', category: '수업', date: new Date().toISOString().split('T')[0], completed: true, time: '14:00', priority: 'medium' },
      { id: 3, title: '웹 프로그래밍 프로젝트 회의', category: '프로젝트', date: new Date(Date.now() + 86400000*2).toISOString().split('T')[0], completed: false, priority: 'high' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('nesta_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('nesta_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const [studyTime, setStudyTime] = useState({
    today: 5.5,
    weekly: 24,
    goal: 30
  });

  const completeTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addTask = (task) => {
    setTasks(prev => [...prev, { ...task, id: Date.now(), completed: false }]);
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const updateTask = (id, updates) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const updateCategories = (newCategories) => {
    setCategories(newCategories);
  };

  const value = {
    profile,
    categories,
    tasks,
    studyTime,
    completeTask,
    addTask,
    deleteTask,
    updateTask,
    updateCategories
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
