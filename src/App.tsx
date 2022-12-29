import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { auth } from './api/apiConfig';

import { Auth } from './containers/Auth/Auth';
import { Content } from './containers/Content/Content';
import { Editor } from './containers/Editor/Editor';
import { MainPage } from './containers/MainPage/MainPage';
import { SignUp } from './containers/SignUp/SignUp';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const protectedRoutes = (
    <Route path="/" element={<MainPage />}>
      <Route index element={<Content />} />
      <Route path="editor" element={<Editor />} />
    </Route>
  );
  const unProtectedRoutes = (
    <>
      <Route path="/auth" element={<Auth />} />
      <Route path="/sign-up" element={<SignUp />} />
    </>
  );

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [isLoggedIn]);

  return (
    <div className="App">
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
