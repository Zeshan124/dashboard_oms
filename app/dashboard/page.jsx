import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import DashboardContent from '../components/dashboard/DashboardContent';
import { authOptions } from '../api/auth/[...nextauth]/route';

async function getUserData(session) {
  return {
    user: session.user,
    role: 'admin',
    branchName: 'Main Branch', 
    isAuthenticated: true
  };
}

async function getDashboardData() {
  return {
    hrStats: {
      totalEmployees: 1247,
      newHires: 23,
      departures: 8,
      openPositions: 15,
      attendanceRate: 94.2,
      avgSalary: 75000,
      trainingCompletion: 87.5,
      employeeSatisfaction: 4.2,
    },
    recentEmployees: [
      {
        id: 1,
        name: "Sarah Johnson",
        position: "Software Engineer",
        department: "Engineering",
        avatar: "",
        status: "active",
        joinDate: "2024-01-15",
      },
      {
        id: 2,
        name: "Michael Chen",
        position: "Product Manager",
        department: "Product",
        avatar: "",
        status: "active",
        joinDate: "2024-01-12",
      },
      {
        id: 3,
        name: "Emily Davis",
        position: "UX Designer",
        department: "Design",
        avatar: "",
        status: "active",
        joinDate: "2024-01-10",
      },
      {
        id: 4,
        name: "James Wilson",
        position: "Data Analyst",
        department: "Analytics",
        avatar: "",
        status: "active",
        joinDate: "2024-01-08",
      },
      {
        id: 5,
        name: "Lisa Anderson",
        position: "HR Specialist",
        department: "Human Resources",
        avatar: "",
        status: "active",
        joinDate: "2024-01-05",
      },
    ],
    pendingActions: [
      {
        id: 1,
        type: "Leave Request",
        employee: "John Doe",
        date: "Jan 25-27",
        status: "pending",
      },
      {
        id: 2,
        type: "Performance Review",
        employee: "Jane Smith",
        date: "Due Jan 30",
        status: "overdue",
      },
      {
        id: 3,
        type: "Onboarding",
        employee: "Mike Johnson",
        date: "Started Jan 22",
        status: "in-progress",
      },
      {
        id: 4,
        type: "Document Upload",
        employee: "Sarah Wilson",
        date: "Missing I-9",
        status: "pending",
      },
    ],
    departmentData: [
      { name: "Engineering", employees: 342, growth: "+5.2%" },
      { name: "Sales", employees: 198, growth: "+8.1%" },
      { name: "Marketing", employees: 127, growth: "+2.3%" },
      { name: "Support", employees: 89, growth: "-1.2%" },
      { name: "HR", employees: 45, growth: "+12.5%" },
      { name: "Finance", employees: 38, growth: "+3.4%" },
    ],
  };
}

export default async function Dashboard({ searchParams }) {
  // Get session on server side
  const session = await getServerSession(authOptions);
  
  // Redirect if not authenticated
  if (!session) {
    redirect('/auth/login');
  }
  
  // Fetch user data and dashboard data on server side
  const userData = await getUserData(session);
  const dashboardData = await getDashboardData();
  
  // Get active component from URL params (for navigation)
  const activeComponent = searchParams?.component || 'dashboard';
  
  return (
    <DashboardContent
      userData={userData}
      dashboardData={dashboardData}
      initialActiveComponent={activeComponent}
    />
  );
}