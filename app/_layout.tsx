import "@/global.css";
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';

function RootLayout() {
  const { user } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Determine if user is logged in
    const isLoggedIn = !!user;

    // Define which routes require authentication
    const protectedRoutes = ['dashboard', 'emergency-request', 'home', 'add-well-wisher', 'profile', 'my-well-wishers', 'emergency-history', 'notifications', 'settings'];
    const publicRoutes = ['index', 'register', 'sign-in', 'verify-otp', 'emergency-access'];

    // Get the current route
    const currentRoute = segments[0];

    // Check if current route requires authentication
    const isProtectedRoute = protectedRoutes.includes(currentRoute);
    const isPublicRoute = publicRoutes.includes(currentRoute);

    // Handle navigation based on auth state
    if (isLoggedIn) {
      // If user is logged in and on login/register pages, redirect to dashboard
      if (isPublicRoute && currentRoute !== 'index') {
        router.replace('/dashboard');
      }
      // If user is on landing page, redirect to dashboard
      if (currentRoute === 'index') {
        router.replace('/dashboard');
      }
    } else {
      // If user is not logged in and tries to access protected routes, redirect to home
      if (isProtectedRoute) {
        router.replace('/');
      }
    }
  }, [user, segments, router]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}