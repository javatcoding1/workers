import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Info, Briefcase, UserPlus, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const links = [
    { to: '/', text: 'Home', Icon: Home },
    { to: '/about', text: 'About', Icon: Info },
    { to: '/services', text: 'Services', Icon: Briefcase },
    { to: '/apply', text: 'Apply', Icon: UserPlus },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-purple-600" />
              <span className="text-xl font-bold text-gray-800">Jamin WorkeLine</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {links.map(({ to, text, Icon }) => (
              <Link key={to} to={to} className="relative">
                <motion.div
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-4 w-4" />
                  <span>{text}</span>
                </motion.div>
                {location.pathname === to && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"
                    layoutId="navbar-underline"
                  />
                )}
              </Link>
            ))}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            ) : (
              <Link to="/login">
                <motion.div
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-purple-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </motion.div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;