import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { setCourses, addCourse, updateCourse, deleteCourse } from '../../store/slices/coursesSlice';
import type { Course } from '../../types';

const Calendar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { courses } = useSelector((state: RootState) => state.courses);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courseForm, setCourseForm] = useState<Partial<Course>>({
    title: '',
    instructor: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    frequency: 'once',
    location: '',
    capacity: 1,
    fee: 0,
    status: 'scheduled',
    students: [],
    notes: '',
    organization: '',
    grade: '',
    isGroupCourse: false,
  });

  useEffect(() => {
    // 从本地存储加载课程数据
    const savedCourses = localStorage.getItem('courses');
    if (savedCourses) {
      try {
        const parsedCourses = JSON.parse(savedCourses);
        dispatch(setCourses(parsedCourses));
      } catch (error) {
        console.error('Failed to parse courses from localStorage:', error);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    // 保存课程数据到本地存储
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  const handleAddCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      title: courseForm.title || '',
      instructor: courseForm.instructor || '',
      startDate: courseForm.startDate || '',
      endDate: courseForm.endDate || '',
      startTime: courseForm.startTime || '',
      endTime: courseForm.endTime || '',
      frequency: courseForm.frequency || 'once',
      location: courseForm.location || '',
      capacity: courseForm.capacity || 1,
      fee: courseForm.fee || 0,
      status: courseForm.status || 'scheduled',
      students: courseForm.students || [],
      notes: courseForm.notes || '',
      organization: courseForm.organization || '',
      grade: courseForm.grade || '',
      isGroupCourse: courseForm.isGroupCourse || false,
    };
    dispatch(addCourse(newCourse));
    setShowAddModal(false);
    resetForm();
  };

  const handleEditCourse = () => {
    if (selectedCourse) {
      const updatedCourse: Course = {
        ...selectedCourse,
        title: courseForm.title || selectedCourse.title,
        instructor: courseForm.instructor || selectedCourse.instructor,
        startDate: courseForm.startDate || selectedCourse.startDate,
        endDate: courseForm.endDate || selectedCourse.endDate,
        startTime: courseForm.startTime || selectedCourse.startTime,
        endTime: courseForm.endTime || selectedCourse.endTime,
        frequency: courseForm.frequency || selectedCourse.frequency,
        location: courseForm.location || selectedCourse.location,
        capacity: courseForm.capacity || selectedCourse.capacity,
        fee: courseForm.fee || selectedCourse.fee,
        status: courseForm.status || selectedCourse.status,
        students: courseForm.students || selectedCourse.students,
        notes: courseForm.notes || selectedCourse.notes,
        organization: courseForm.organization || selectedCourse.organization,
        grade: courseForm.grade || selectedCourse.grade,
        isGroupCourse: courseForm.isGroupCourse !== undefined ? courseForm.isGroupCourse : selectedCourse.isGroupCourse,
      };
      dispatch(updateCourse(updatedCourse));
      setShowEditModal(false);
      setSelectedCourse(null);
      resetForm();
    }
  };

  const handleDeleteCourse = (courseId: string) => {
    if (window.confirm('确定要删除这门课程吗？')) {
      dispatch(deleteCourse(courseId));
    }
  };

  const resetForm = () => {
    setCourseForm({
      title: '',
      instructor: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      frequency: 'once',
      location: '',
      capacity: 1,
      fee: 0,
      status: 'scheduled',
      students: [],
      notes: '',
      organization: '',
      grade: '',
      isGroupCourse: false,
    });
  };

  const openEditModal = (course: Course) => {
    setSelectedCourse(course);
    setCourseForm(course);
    setShowEditModal(true);
  };

  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  // 生成日历月份的函数
  const generateCalendarDays = () => {
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    const days = [];

    // 添加上个月的日期
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // 添加当月的日期
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const days = generateCalendarDays();
  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">课程日历</h2>
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={openAddModal}
        >
          添加课程
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <button 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          >
            上一月
          </button>
          <h3 className="text-xl font-semibold">
            {currentMonth.getFullYear()}年{currentMonth.getMonth() + 1}月
          </h3>
          <button 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          >
            下一月
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekdays.map((day, index) => (
            <div key={index} className="text-center font-semibold">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <div 
              key={index} 
              className={`h-32 border ${day ? 'bg-white' : 'bg-gray-100'}`}
            >
              {day && (
                <div className="p-1">
                  <div className="text-sm font-semibold">{day}</div>
                  <div className="mt-1 space-y-1">
                    {courses.filter(course => {
                      const courseDate = new Date(course.startDate);
                      return courseDate.getDate() === day && 
                             courseDate.getMonth() === currentMonth.getMonth() && 
                             courseDate.getFullYear() === currentMonth.getFullYear();
                    }).map(course => (
                      <div 
                        key={course.id} 
                        className="bg-blue-100 p-1 text-xs rounded cursor-pointer hover:bg-blue-200"
                        onClick={() => openEditModal(course)}
                      >
                        {course.title}
                        <br />
                        {course.startTime} - {course.endTime}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 添加课程模态框 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
            <h3 className="text-xl font-bold mb-4">添加课程</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">课程名称</label>
                <input 
                  type="text" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700"> instructor</label>
                <input 
                  type="text" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={courseForm.instructor}
                  onChange={(e) => setCourseForm({ ...courseForm, instructor: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">开始日期</label>
                  <input 
                    type="date" 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    value={courseForm.startDate}
                    onChange={(e) => setCourseForm({ ...courseForm, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">结束日期</label>
                  <input 
                    type="date" 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    value={courseForm.endDate}
                    onChange={(e) => setCourseForm({ ...courseForm, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">开始时间</label>
                  <input 
                    type="time" 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    value={courseForm.startTime}
                    onChange={(e) => setCourseForm({ ...courseForm, startTime: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">结束时间</label>
                  <input 
                    type="time" 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    value={courseForm.endTime}
                    onChange={(e) => setCourseForm({ ...courseForm, endTime: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">频率</label>
                <select 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={courseForm.frequency}
                  onChange={(e) => setCourseForm({ ...courseForm, frequency: e.target.value })}
                >
                  <option value="once">一次性</option>
                  <option value="weekly">每周</option>
                  <option value="biweekly">每两周</option>
                  <option value="monthly">每月</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">地点</label>
                <input 
                  type="text" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={courseForm.location}
                  onChange={(e) => setCourseForm({ ...courseForm, location: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">容量</label>
                <input 
                  type="number" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={courseForm.capacity}
                  onChange={(e) => setCourseForm({ ...courseForm, capacity: parseInt(e.target.value) || 1 })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">费用</label>
                <input 
                  type="number" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={courseForm.fee}
                  onChange={(e) => setCourseForm({ ...courseForm, fee: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">状态</label>
                <select 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={courseForm.status}
                  onChange={(e) => setCourseForm({ ...courseForm, status: e.target.value })}
                >
                  <option value="scheduled">已安排</option>
                  <option value="ongoing">进行中</option>
                  <option value="completed">已完成</option>
                  <option value="cancelled">已取消</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">备注</label>
                <textarea 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={courseForm.notes}
                  onChange={(e) => setCourseForm({ ...courseForm, notes: e.target.value })}
                />
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="isGroupCourse" 
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={courseForm.isGroupCourse}
                  onChange={(e) => setCourseForm({ ...courseForm, isGroupCourse: e.target.checked })}
                />
                <label htmlFor="isGroupCourse" className="ml-2 block text-sm text-gray-900">
                  团体课程
                </label>
              </div>
              <div className="flex justify-end space-x-4">
                <button 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                  onClick={() => setShowAddModal(false)}
                >
                  取消
                </button>
                <button 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleAddCourse}
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 编辑课程模态框 */}
      {showEditModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
            <h3 className="text-xl font-bold mb-4">编辑课程</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">课程名称</label>
                <input 
                  type="text" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700"> instructor</label>
                <input 
                  type="text" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={courseForm.instructor}
                  onChange={(e) => setCourseForm({ ...courseForm, instructor: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">开始日期</label>
                  <input 
                    type="date" 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    value={courseForm.startDate}
                    onChange={(e) => setCourseForm({ ...courseForm, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">结束日期</label>
                  <input 
                    type="date" 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    value={courseForm.endDate}
                    onChange={(e) => setCourseForm({ ...courseForm, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">开始时间</label>
                  <input 
                    type="time" 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    value={courseForm.startTime}
                    onChange={(e) => setCourseForm({ ...courseForm, startTime: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">结束时间</label>
                  <input 
                    type="time" 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    value={courseForm.endTime}
                    onChange={(e) => setCourseForm({ ...courseForm, endTime: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">频率</label>
                <select 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={courseForm.frequency}
                  onChange={(e) => setCourseForm({ ...courseForm, frequency: e.target.value })}
                >
                  <option value="once">一次性</option>
                  <option value="weekly">每周</option>
                  <option value="biweekly">每两周</option>
                  <option value="monthly">每月</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">地点</label>
                <input 
                  type="text" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={courseForm.location}
                  onChange={(e) => setCourseForm({ ...courseForm, location: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">容量</label>
                <input 
                  type="number" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={courseForm.capacity}
                  onChange={(e) => setCourseForm({ ...courseForm, capacity: parseInt(e.target.value) || 1 })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">费用</label>
                <input 
                  type="number" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={courseForm.fee}
                  onChange={(e) => setCourseForm({ ...courseForm, fee: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">状态</label>
                <select 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={courseForm.status}
                  onChange={(e) => setCourseForm({ ...courseForm, status: e.target.value })}
                >
                  <option value="scheduled">已安排</option>
                  <option value="ongoing">进行中</option>
                  <option value="completed">已完成</option>
                  <option value="cancelled">已取消</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">备注</label>
                <textarea 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={courseForm.notes}
                  onChange={(e) => setCourseForm({ ...courseForm, notes: e.target.value })}
                />
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="editIsGroupCourse" 
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={courseForm.isGroupCourse}
                  onChange={(e) => setCourseForm({ ...courseForm, isGroupCourse: e.target.checked })}
                />
                <label htmlFor="editIsGroupCourse" className="ml-2 block text-sm text-gray-900">
                  团体课程
                </label>
              </div>
              <div className="flex justify-end space-x-4">
                <button 
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDeleteCourse(selectedCourse.id)}
                >
                  删除
                </button>
                <button 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                  onClick={() => setShowEditModal(false)}
                >
                  取消
                </button>
                <button 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleEditCourse}
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
