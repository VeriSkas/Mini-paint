import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Auth } from './containers/Auth/Auth';
import { Content } from './containers/Content/Content';
import { Editor } from './containers/Editor/Editor';
import { MainPage } from './containers/MainPage/MainPage';
import { SignUp } from './containers/SignUp/SignUp';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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
