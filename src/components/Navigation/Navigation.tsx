import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">课程管理系统</h1>
        <div className="flex space-x-4">
          <Link to="/" className="hover:bg-gray-700 px-3 py-2 rounded-md">
            课程日历
          </Link>
          <Link to="/student-management" className="hover:bg-gray-700 px-3 py-2 rounded-md">
            学生管理
          </Link>
          <Link to="/statistics" className="hover:bg-gray-700 px-3 py-2 rounded-md">
            数据统计
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
