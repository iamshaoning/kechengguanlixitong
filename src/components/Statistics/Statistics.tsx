import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

const Statistics: React.FC = () => {
  const { courses } = useSelector((state: RootState) => state.courses);
  const { students } = useSelector((state: RootState) => state.students);
  const { organizations, grades } = useSelector((state: RootState) => state.organizations);

  // 计算统计数据
  const totalCourses = courses.length;
  const totalStudents = students.length;
  const totalOrganizations = organizations.length;
  const totalGrades = grades.length;

  // 计算课程状态分布
  const courseStatusCount = courses.reduce((acc, course) => {
    acc[course.status] = (acc[course.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 计算学生按机构分布
  const studentByOrganization = students.reduce((acc, student) => {
    if (student.organization) {
      acc[student.organization] = (acc[student.organization] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // 导出数据到 CSV
  const exportToCSV = (data: any[], filename: string) => {
    const headers = Object.keys(data[0] || {});
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => row[header]).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportCourses = () => {
    exportToCSV(courses, 'courses.csv');
  };

  const handleExportStudents = () => {
    exportToCSV(students, 'students.csv');
  };

  const handleExportOrganizations = () => {
    exportToCSV(organizations, 'organizations.csv');
  };

  const handleExportGrades = () => {
    exportToCSV(grades, 'grades.csv');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">数据统计</h2>
        <div className="space-x-4">
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleExportCourses}
          >
            导出课程数据
          </button>
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleExportStudents}
          >
            导出学生数据
          </button>
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleExportOrganizations}
          >
            导出机构数据
          </button>
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleExportGrades}
          >
            导出年级数据
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-2">总课程数</h3>
          <p className="text-3xl font-bold text-blue-600">{totalCourses}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-2">总学生数</h3>
          <p className="text-3xl font-bold text-green-600">{totalStudents}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-2">总机构数</h3>
          <p className="text-3xl font-bold text-purple-600">{totalOrganizations}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-2">总年级数</h3>
          <p className="text-3xl font-bold text-orange-600">{totalGrades}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">课程状态分布</h3>
          <ul className="space-y-2">
            {Object.entries(courseStatusCount).map(([status, count]) => (
              <li key={status} className="flex justify-between items-center p-2 border-b">
                <span>{status}</span>
                <span className="font-bold">{count}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">学生按机构分布</h3>
          <ul className="space-y-2">
            {Object.entries(studentByOrganization).map(([organization, count]) => (
              <li key={organization} className="flex justify-between items-center p-2 border-b">
                <span>{organization}</span>
                <span className="font-bold">{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-4">最近课程</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  课程名称
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  开始日期
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  结束日期
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  费用
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.slice(0, 10).map(course => (
                <tr key={course.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{course.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{course.startDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{course.endDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{course.status}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{course.fee}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
