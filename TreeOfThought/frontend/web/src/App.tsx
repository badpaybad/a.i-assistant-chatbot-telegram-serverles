import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { notification, message } from 'antd';
import MainLayout from './layouts/MainLayout';

import LoginPage from './modules/auth/pages/LoginPage';
import SignupPage from './modules/auth/pages/SignupPage';
import CQRSTestPage from './modules/cqrs-test/pages/CQRSTestPage';
import NotificationTestPage from './modules/notification-test/pages/NotificationTestPage';
import FcmTestPage from './modules/notification-test/pages/FcmTestPage';
import DashboardPage from './modules/cqrs-dashboard/pages/DashboardPage';
import QueueDetailsPage from './modules/cqrs-dashboard/pages/QueueDetailsPage';
import TracingPage from './modules/cqrs-dashboard/pages/TracingPage';
import ProjectListPage from './modules/BookingBds/pages/ProjectListPage';
import ApartmentLayoutPage from './modules/BookingBds/pages/ApartmentLayoutPage';
import CartPage from './modules/BookingBds/pages/CartPage';
import AdminProjectPage from './modules/BookingBds/pages/AdminProjectPage';
import AdminApartmentPage from './modules/BookingBds/pages/AdminApartmentPage';
import { setupFCM, onMessageReceived } from './utils/firebaseUtils';

// Dummy Pages
const Home = () => <h1>Home Page</h1>;
const About = () => <h1>About Page</h1>;
const Contact = () => <h1>Contact Page</h1>;

function App() {
  useEffect(() => {
    // Setup FCM
    const initFCM = async () => {
      const token = await setupFCM();
      if (token) {
        console.log('App started with FCM Token:', token);
        // Optionally sync token with BE here if user is logged in
      }
    };

    initFCM();

    // Listen for foreground messages
    const unsubscribe = onMessageReceived((payload) => {
      notification.info({
        title: payload.notification?.title || 'New Notification',
        description: payload.notification?.body || 'You have a new message.',
        placement: 'topRight',
        duration: 0, // Manual close
      });
    });

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Auth Routes */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          
          {/* Modules */}
          <Route path="/modules/cqrs-test" element={<CQRSTestPage />} />
          <Route path="/modules/notification-test" element={<NotificationTestPage />} />
          <Route path="/modules/fcm-test" element={<FcmTestPage />} />
          
          {/* CQRS Dashboard */}
          <Route path="/modules/cqrs-dashboard" element={<DashboardPage />} />
          <Route path="/modules/cqrs-dashboard/queue/:queueName" element={<QueueDetailsPage />} />
          <Route path="/modules/cqrs-dashboard/tracing/:trackingId?" element={<TracingPage />} />
          
          {/* Booking Bds */}
          <Route path="/modules/booking-bds" element={<ProjectListPage />} />
          <Route path="/modules/booking-bds/projects/:projectId" element={<ApartmentLayoutPage />} />
          <Route path="/modules/booking-bds/cart" element={<CartPage />} />
          
          {/* Admin Booking Bds */}
          <Route path="/modules/booking-bds/admin/projects" element={<AdminProjectPage />} />
          <Route path="/modules/booking-bds/admin/projects/:projectId/apartments" element={<AdminApartmentPage />} />
          
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
