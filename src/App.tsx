import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { auth } from '@queries/apiConfig';
import { ThemeToggler } from '@components/ThemeToggler/ThemeToggler';
import { Auth } from '@pages/Auth/Auth';
import { Content } from '@pages/Content/Content';
import { Editor } from '@pages/Editor/Editor';
import { MainPage } from '@pages/MainPage/MainPage';
import { SignUp } from '@pages/SignUp/SignUp';
import { themes } from '@constants/constants';
import { localStorageHandler } from '@utils/localStorage';
import { paths } from '@constants/paths';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorageHandler('getItem', 'uid') || false;
  });
  const [currentTheme, setCurrentTheme] = useState('');

  const protectedRoutes = (
    <Route path={paths.home} element={<MainPage theme={currentTheme} />}>
      <Route index element={<Content />} />
      <Route path={paths.editor} element={<Editor />} />
    </Route>
  );
  const unProtectedRoutes = (
    <>
      <Route path={paths.auth} element={<Auth theme={currentTheme} />} />
      <Route path={paths.signUp} element={<SignUp theme={currentTheme} />} />
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
              <Navigate to={paths.home} replace />
            ) : (
              <Navigate to={paths.auth} replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
