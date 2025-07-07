import AuthGuard from '../components/AuthGuard'
import DashboardContent from './DashboardContent'

export default function Dashboard() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  )
}