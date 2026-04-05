export interface Student {
  id: string;
  name: string;
  organization: string;
  grade: string;
  age: number;
  contact: string;
  phone: string;
  email: string;
  address: string;
  balance: number;
  joinDate: string;
  notes: string;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  frequency: string;
  location: string;
  capacity: number;
  fee: number;
  status: string;
  students: string[];
  notes: string;
  organization: string;
  grade: string;
  isGroupCourse: boolean;
}

export interface Organization {
  id: string;
  name: string;
  createdAt: string;
}

export interface Grade {
  id: string;
  name: string;
  organizationId: string;
  createdAt: string;
}

export interface Statistics {
  totalStudents: number;
  totalCourses: number;
  totalIncome: number;
  totalBalance: number;
  coursesByMonth: {
    month: string;
    count: number;
  }[];
  studentsByOrganization: {
    organization: string;
    count: number;
  }[];
}
