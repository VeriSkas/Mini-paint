import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { auth } from './api/apiConfig';
import { ThemeToggler } from './components/ThemeToggler/ThemeToggler';
import { Auth } from './containers/Auth/Auth';
import { Content } from './containers/Content/Content';
import { Editor } from './containers/Editor/Editor';
import { MainPage } from './containers/MainPage/MainPage';
import { SignUp } from './containers/SignUp/SignUp';
import { themes } from './shared/constants';
import { localStorageHandler } from './shared/localStorage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorageHandler('getItem', 'uid') || false;
  });
  const [currentTheme, setCurrentTheme] = useState('');

  const protectedRoutes = (
    <Route path="/" element={<MainPage theme={currentTheme} />}>
      <Route index element={<Content />} />
      <Route path="editor" element={<Editor />} />
    </Route>
  );
  const unProtectedRoutes = (
    <>
      <Route path="/auth" element={<Auth theme={currentTheme} />} />
      <Route path="/sign-up" element={<SignUp theme={currentTheme} />} />
    </>
  );

  useEffect(() => {
    const theme = localStorageHandler('getItem', 'theme') || themes.light;

    setCurrentTheme(theme);
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [isLoggedIn]);

  const themeToggler = (theme: string) => {
    setCurrentTheme(theme);
  };

  return (
    <div className="App">
      <ThemeToggler themeToggler={themeToggler} />
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
