
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Navigation from './components/Navigation/Navigation';
import CalendarPage from './pages/CalendarPage';
import StudentManagementPage from './pages/StudentManagementPage';
import StatisticsPage from './pages/StatisticsPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navigation />
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<CalendarPage />} />
              <Route path="/student-management" element={<StudentManagementPage />} />
              <Route path="/statistics" element={<StatisticsPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;