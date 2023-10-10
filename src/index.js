import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { useNavigate, BrowserRouter, Route, Routes } from 'react-router-dom'; // Remove 'Router'
import { ClerkProvider, RedirectToSignIn, SignIn, SignUp, SignedIn, SignedOut } from '@clerk/clerk-react';
import ProtectedPage from './ProtectedPage';
import App from './App';


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
        <Route path="/" element={<App />} />
        <Route
          path="https://clerk-react.onrender.com/sign-in/*"
          element={<SignIn redirectUrl={'/protected'} routing="path" path="https://clerk-react.onrender.com/sign-in" />}
        />
        <Route
          path="https://clerk-react.onrender.com/sign-in/*"
          element={<SignUp redirectUrl={'/protected'} routing="path" path="/https://clerk-react.onrender.com/sign-in" />}
        />
        <Route
          path="https://clerk-react.onrender.com/sign-in/protected"
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
    <BrowserRouter> 
      <ClerkWithRoutes />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
