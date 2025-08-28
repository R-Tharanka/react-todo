import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeContext } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

// Components
import Navbar from './components/Navbar';
import ThemeToggle from './components/ThemeToggle';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';

function App() {
    const { theme } = useContext(ThemeContext);

    return (
        <NotificationProvider>
            <div className={`min-h-screen flex flex-col ${theme}`}>
                <Navbar />
                <div className="flex-1 w-full max-w-7xl mx-auto px-4 pt-16 sm:px-6 md:pt-20 lg:px-8">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route
                            path="/profile"
                            element={
                                <PrivateRoute>
                                    <ProfilePage />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </div>
                <Footer />
            </div>
        </NotificationProvider>
    );
}

export default App;
