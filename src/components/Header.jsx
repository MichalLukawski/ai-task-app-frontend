import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const showRegisterLink = pathname === '/login' || pathname === '/';
  const showLoginLink = pathname === '/register' || pathname === '/';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <Link to="/" className="text-xl font-bold text-blue-600">
        <h1 className="text-xl font-semibold text-gray-800">AI Task App</h1>
      </Link>

      <div className="space-x-4">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="text-sm font-medium text-blue-600 hover:underline">
              Workspace
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-600 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {showRegisterLink && (
              <Link to="/register" className="text-sm font-medium text-blue-600 hover:underline">
                Register
              </Link>
            )}
            {showLoginLink && (
              <Link to="/login" className="text-sm font-medium text-blue-600 hover:underline">
                Login
              </Link>
            )}
          </>
        )}
      </div>
    </header>
  );
}
