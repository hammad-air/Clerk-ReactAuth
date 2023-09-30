import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { useNavigate, BrowserRouter, Route, Routes } from 'react-router-dom'; // Remove 'Router'
import { ClerkProvider, RedirectToSignIn, SignIn, SignUp, SignedIn, SignedOut } from '@clerk/clerk-react';
import ProtectedPage from './ProtectedPage';

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
const root = ReactDOM.createRoot(document.getElementById('root'));

const ClerkWithRoutes = () => {
  const navigate = useNavigate()

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
    >
      <Routes>
        <Route path="/" element={<ProtectedPage />} />
        <Route
          path="/sign-in/*"
          element={<SignIn redirectUrl={'/protected'} routing="path" path="/sign-in" />}
        />
        <Route
          path="/sign-up/*"
          element={<SignUp redirectUrl={'/protected'} routing="path" path="/sign-up" />}
        />
        <Route
          path="/protected"
          element={
            <>
              <SignedIn>
                <ProtectedPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </ClerkProvider>
  )
}

root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Use BrowserRouter here */}
      <ClerkWithRoutes />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
