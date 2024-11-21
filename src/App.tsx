import { Routes, Route, Navigate } from "react-router-dom"

import { AuthProvider } from "./components/auth/AuthProvider"
import { ROUTE, NotAuthedRoute, AuthedRoute } from "./utils/RouteUtils"
import PageLayout from "./components/layouts/PageLayout"

// pages
import HomePage from "./pages/home/HomePage"
import SignInPage from "./pages/signIn/SignInPage"


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PageLayout />}>

          {/* Not Auth required. Redirect if Authed */}
          <Route path={ROUTE.LOGIN} element={<NotAuthedRoute><SignInPage /></NotAuthedRoute>} />

          {/* Auth required. Redirect if not Authed. */}
          <Route path={ROUTE.HOME} element={<AuthedRoute><HomePage /></AuthedRoute>} />

        </Route>

        {/* Redirect invalid routes */}
        <Route path="*" element={<Navigate to={ROUTE.HOME} replace />} />

      </Routes>
    </AuthProvider>
  )
}

export default App
