import { Navigate } from "react-router-dom"
import { ReactNode } from "react"

import { useAuth } from "../components/auth/AuthProvider"

/**
 * Navigable routes.
 */
export const ROUTE = {
    HOME: '/',
    LOGIN: '/login'
}

/**
 * Protected route that ensures a user is not authenticated.
 * If they are authenticated, redirect to the provided redirectTo param or to ROUTE.HOME by default.
 *
 * @param children The desired component to be rendered.
 * @param redirectTo A ROUTE to be redirected to in the case the user is authenticated. Defaults to ROUTE.HOME.
 * @returns If the user is not authenticated, render the provided children.
 * @returns If the user is authenticated, redirect to the provided redirectTo ROUTE. Defaults to ROUTE.HOME.
 * @see ROUTE for list of available routes.
 */
export const NotAuthedRoute = ({ children, redirectTo }: { children: ReactNode, redirectTo?: string }) => {
    const { user } = useAuth()
    if (!user) {
        // User is not authenticated, render the provided children component.
        return children
    }
    // User is authenticated, redirect to provided route. Defaults to ROUTE.HOME.
    return <Navigate to={redirectTo || ROUTE.HOME} replace={true} />
}

/**
 * Protected route that ensures a user is authenticated.
 * If they are not authenticated, redirect to the provided redirectTo param or to ROUTE.HOME by default.
 *
 * @param children The desired component to be rendered.
 * @param redirectTo A ROUTE to be redirected to in the case the user is not authenticated. Defaults to ROUTE.LOGIN.
 * @returns If the user is authenticated, render the provided children.
 * @returns If the user is not authenticated, redirect to the provided redirectTo ROUTE. Defaults to ROUTE.LOGIN.
 */
export const AuthedRoute = ({ children, redirectTo }: { children: ReactNode, redirectTo?: string }) => {
    const { user } = useAuth()
    if (user) {
        // User is authenticated, render the provided children component.
        return children
    }
    // User is not authenticated, redirect to provided route. Defaults to ROUTE.LOGIN.
    return <Navigate to={redirectTo || ROUTE.LOGIN} replace={true} />
}
