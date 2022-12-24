import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Auth } from './containers/Auth/Auth';
import { Content } from './containers/Content/Content';
import { MainPage } from './containers/MainPage/MainPage';
import { SignUp } from './containers/SignUp/SignUp';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const protectedRoutes = (
    <Route path="/" element={<MainPage />}>
      <Route index element={<Content />} />
    </Route>
  );
  const unProtectedRoutes = (
    <>
      <Route path="/auth" element={<Auth />} />
      <Route path="/sign-up" element={<SignUp />} />
    </>
  );
  return (
    <div className="App">
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? 'Log out' : 'Log in'}
      </button>
      <p>{isLoggedIn}</p>
      <Routes>
        {isLoggedIn ? protectedRoutes : unProtectedRoutes}
        <Route
          path="*"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
