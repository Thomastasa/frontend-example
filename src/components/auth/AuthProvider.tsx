import { createContext, ReactNode, useCallback, useContext, useMemo } from "react"
import { useNavigate } from "react-router"


import { ROUTE } from "../../utils/RouteUtils"
import { useLocalStorage } from "../../utils/ReactUtils"
import UserInfo from "./UserInfo"


type ContextValueProps = {
    user: UserInfo,
    setSignedIn: Function,
    setSignedOut: Function
}

const contextValuesPlaceholder: ContextValueProps = {
    user: {},
    setSignedIn: () => { },
    setSignedOut: () => { }
}

const AuthContext = createContext(contextValuesPlaceholder)

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useLocalStorage("user")
    const navigate = useNavigate()

    /**
     *  Set signed in after you validate the user's session.
     *  Protected routes check against the user state to ensure user is authenticated or not.
     * @param data A UserInfo object of user info to store.
     */
    const setSignedIn = useCallback(async (data: UserInfo = {}) => {
        const userData = {
            loggedInSince: new Date().toISOString(),
            ...data
        }
        setUser(userData)
        navigate(ROUTE.HOME)
    }, [])

    /**
     * Set loged out after you invalidate the user's session.
     * Protected routes check against the user state to ensure user is authenicated or not.
     */
    const setSignedOut = useCallback(async () => {
        setUser()
        navigate(ROUTE.LOGIN)

    }, [])

    const contextValue = useMemo(
        () => ({
            user,
            setSignedIn,
            setSignedOut,
        }),
        [user]
    )
    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}


export const useAuth = () => {
    return useContext(AuthContext)
}
