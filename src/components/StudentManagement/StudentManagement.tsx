import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { setStudents, addStudent, updateStudent, deleteStudent } from '../../store/slices/studentsSlice';
import { setOrganizations, addOrganization, deleteOrganization, addGrade, deleteGrade } from '../../store/slices/organizationsSlice';
import type { Student, Organization, Grade } from '../../types';

const StudentManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { students } = useSelector((state: RootState) => state.students);
  const { organizations, grades } = useSelector((state: RootState) => state.organizations);
  
  const [showAddStudentModal, setShowAddStudentModal] = useState<boolean>(false);
  const [showEditStudentModal, setShowEditStudentModal] = useState<boolean>(false);
  const [showAddOrganizationModal, setShowAddOrganizationModal] = useState<boolean>(false);
  const [showAddGradeModal, setShowAddGradeModal] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  
  const [studentForm, setStudentForm] = useState<Partial<Student>>({
    id: '',
    name: '',
    age: 0,
    grade: '',
    organization: '',
    phone: '',
    email: '',
    address: '',
  });
  
  const [organizationForm, setOrganizationForm] = useState<Partial<Organization>>({
    id: '',
    name: '',
  });
  
  const [gradeForm, setGradeForm] = useState<Partial<Grade>>({
    id: '',
    name: '',
    organizationId: '',
  });

  useEffect(() => {
    // 从本地存储加载学生数据
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
      try {
        const parsedStudents = JSON.parse(savedStudents);
        dispatch(setStudents(parsedStudents));
      } catch (error) {
        console.error('Failed to parse students from localStorage:', error);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    // 从本地存储加载机构和年级数据
    const savedOrganizations = localStorage.getItem('organizations');
    if (savedOrganizations) {
      try {
        const parsedOrganizations = JSON.parse(savedOrganizations);
        dispatch(setOrganizations(parsedOrganizations));
      } catch (error) {
        console.error('Failed to parse organizations from localStorage:', error);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    // 保存学生数据到本地存储
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    // 保存机构和年级数据到本地存储
    localStorage.setItem('organizations', JSON.stringify({ organizations, grades }));
  }, [organizations, grades]);

  const handleAddStudent = () => {
    const newStudent: Student = {
      id: Date.now().toString(),
      name: studentForm.name || '',
      age: studentForm.age || 0,
      grade: studentForm.grade || '',
      organization: studentForm.organization || '',
      phone: studentForm.phone || '',
      email: studentForm.email || '',
      address: studentForm.address || '',
      contact: studentForm.contact || '',
      balance: studentForm.balance || 0,
      joinDate: studentForm.joinDate || new Date().toISOString(),
      notes: studentForm.notes || '',
    };
    dispatch(addStudent(newStudent));
    setShowAddStudentModal(false);
    resetStudentForm();
  };

  const handleEditStudent = () => {
    if (selectedStudent) {
      const updatedStudent: Student = {
        ...selectedStudent,
        name: studentForm.name || selectedStudent.name,
        age: studentForm.age || selectedStudent.age,
        grade: studentForm.grade || selectedStudent.grade,
        organization: studentForm.organization || selectedStudent.organization,
        phone: studentForm.phone || selectedStudent.phone,
        email: studentForm.email || selectedStudent.email,
        address: studentForm.address || selectedStudent.address,
        contact: studentForm.contact || selectedStudent.contact,
        balance: studentForm.balance || selectedStudent.balance,
        joinDate: studentForm.joinDate || selectedStudent.joinDate,
        notes: studentForm.notes || selectedStudent.notes,
      };
      dispatch(updateStudent(updatedStudent));
      setShowEditStudentModal(false);
      setSelectedStudent(null);
      resetStudentForm();
    }
  };

  const handleDeleteStudent = (studentId: string) => {
    if (window.confirm('确定要删除这个学生吗？')) {
      dispatch(deleteStudent(studentId));
    }
  };

  const handleAddOrganization = () => {
    const newOrganization: Organization = {
      id: Date.now().toString(),
      name: organizationForm.name || '',
      createdAt: new Date().toISOString(),
    };
    dispatch(addOrganization(newOrganization));
    setShowAddOrganizationModal(false);
    resetOrganizationForm();
  };

  const handleAddGrade = () => {
    const newGrade: Grade = {
      id: Date.now().toString(),
      name: gradeForm.name || '',
      organizationId: gradeForm.organizationId || '',
      createdAt: new Date().toISOString(),
    };
    dispatch(addGrade(newGrade));
    setShowAddGradeModal(false);
    resetGradeForm();
  };

  const resetStudentForm = () => {
    setStudentForm({
      id: '',
      name: '',
      age: 0,
      grade: '',
      organization: '',
      phone: '',
      email: '',
      address: '',
      contact: '',
      balance: 0,
      joinDate: '',
      notes: '',
    });
  };

  const resetOrganizationForm = () => {
    setOrganizationForm({
      id: '',
      name: '',
    });
  };

  const resetGradeForm = () => {
    setGradeForm({
      id: '',
      name: '',
      organizationId: '',
    });
  };

  const openEditStudentModal = (student: Student) => {
    setSelectedStudent(student);
    setStudentForm(student);
    setShowEditStudentModal(true);
  };

  const openAddStudentModal = () => {
    resetStudentForm();
    setShowAddStudentModal(true);
  };

  const openAddOrganizationModal = () => {
    resetOrganizationForm();
    setShowAddOrganizationModal(true);
  };

  const openAddGradeModal = () => {
    resetGradeForm();
    setShowAddGradeModal(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">学生管理</h2>
        <div className="space-x-4">
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={openAddOrganizationModal}
          >
            添加机构
          </button>
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={openAddGradeModal}
          >
            添加年级
          </button>
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={openAddStudentModal}
          >
            添加学生
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">机构列表</h3>
          <ul className="space-y-2">
            {organizations.map(organization => (
              <li key={organization.id} className="flex justify-between items-center p-2 border-b">
                <span>{organization.name}</span>
                <button 
                  className="text-red-500 hover:text-red-700"
                  onClick={() => dispatch(deleteOrganization(organization.id))}
                >
                  删除
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">年级列表</h3>
          <ul className="space-y-2">
            {grades.map(grade => (
              <li key={grade.id} className="flex justify-between items-center p-2 border-b">
                <span>{grade.name}</span>
                <button 
                  className="text-red-500 hover:text-red-700"
                  onClick={() => dispatch(deleteGrade(grade.id))}
                >
                  删除
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-4">学生列表</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  姓名
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  年龄
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  年级
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  机构
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  电话
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  邮箱
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  地址
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map(student => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{student.age}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{student.grade}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{student.organization}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{student.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{student.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{student.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      onClick={() => openEditStudentModal(student)}
                    >
                      编辑
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteStudent(student.id)}
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 添加学生模态框 */}
      {showAddStudentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
            <h3 className="text-xl font-bold mb-4">添加学生</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">姓名</label>
                <input 
                  type="text" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={studentForm.name}
                  onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">年龄</label>
                <input 
                  type="number" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={studentForm.age}
                  onChange={(e) => setStudentForm({ ...studentForm, age: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">机构</label>
                <select 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={studentForm.organization}
                  onChange={(e) => setStudentForm({ ...studentForm, organization: e.target.value })}
                >
                  <option value="">选择机构</option>
                  {organizations.map(organization => (
                    <option key={organization.id} value={organization.name}>
                      {organization.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">年级</label>
                <select 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={studentForm.grade}
                  onChange={(e) => setStudentForm({ ...studentForm, grade: e.target.value })}
                >
                  <option value="">选择年级</option>
                  {grades.map(grade => (
                    <option key={grade.id} value={grade.name}>
                      {grade.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">电话</label>
                <input 
                  type="text" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={studentForm.phone}
                  onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">邮箱</label>
                <input 
                  type="email" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={studentForm.email}
                  onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">地址</label>
                <input 
                  type="text" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={studentForm.address}
                  onChange={(e) => setStudentForm({ ...studentForm, address: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                  onClick={() => setShowAddStudentModal(false)}
                >
                  取消
                </button>
                <button 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleAddStudent}
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 编辑学生模态框 */}
      {showEditStudentModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
            <h3 className="text-xl font-bold mb-4">编辑学生</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">姓名</label>
                <input 
                  type="text" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={studentForm.name}
                  onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">年龄</label>
                <input 
                  type="number" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={studentForm.age}
                  onChange={(e) => setStudentForm({ ...studentForm, age: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">机构</label>
                <select 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={studentForm.organization}
                  onChange={(e) => setStudentForm({ ...studentForm, organization: e.target.value })}
                >
                  <option value="">选择机构</option>
                  {organizations.map(organization => (
                    <option key={organization.id} value={organization.name}>
                      {organization.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">年级</label>
                <select 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={studentForm.grade}
                  onChange={(e) => setStudentForm({ ...studentForm, grade: e.target.value })}
                >
                  <option value="">选择年级</option>
                  {grades.map(grade => (
                    <option key={grade.id} value={grade.name}>
                      {grade.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">电话</label>
                <input 
                  type="text" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={studentForm.phone}
                  onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">邮箱</label>
                <input 
                  type="email" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={studentForm.email}
                  onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">地址</label>
                <input 
                  type="text" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={studentForm.address}
                  onChange={(e) => setStudentForm({ ...studentForm, address: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                  onClick={() => setShowEditStudentModal(false)}
                >
                  取消
                </button>
                <button 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleEditStudent}
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 添加机构模态框 */}
      {showAddOrganizationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
            <h3 className="text-xl font-bold mb-4">添加机构</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">机构名称</label>
                <input 
                  type="text" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={organizationForm.name}
                  onChange={(e) => setOrganizationForm({ ...organizationForm, name: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                  onClick={() => setShowAddOrganizationModal(false)}
                >
                  取消
                </button>
                <button 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleAddOrganization}
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 添加年级模态框 */}
      {showAddGradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
            <h3 className="text-xl font-bold mb-4">添加年级</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">年级名称</label>
                <input 
                  type="text" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={gradeForm.name}
                  onChange={(e) => setGradeForm({ ...gradeForm, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">所属机构</label>
                <select 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  value={gradeForm.organizationId}
                  onChange={(e) => setGradeForm({ ...gradeForm, organizationId: e.target.value })}
                >
                  <option value="">选择机构</option>
                  {organizations.map(organization => (
                    <option key={organization.id} value={organization.id}>
                      {organization.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                  onClick={() => setShowAddGradeModal(false)}
                >
                  取消
                </button>
                <button 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleAddGrade}
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

export default StudentManagement;
