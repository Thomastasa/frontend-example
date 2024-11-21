import { useAuth } from "../auth/AuthProvider"

import SharedStyles from "../../styles/shared.module.css"
import UserNavStyles from "../../styles/userNav.module.css"
import { formatHumanReadableTimestamp } from "../../utils/FormatUtils"


const UserNav = () => {
    const { user, setSignedOut } = useAuth()

    // if user is not authed, don't render nav
    if (!user) {
        return null
    }

    // if uer is authed, render user info
    return (
        <div className={UserNavStyles.nav}>
            {
                user?.loggedInSince ? (
                    <div className={UserNavStyles.info}>
                        Signed In Since
                        <div className={UserNavStyles.info_value}>
                            {formatHumanReadableTimestamp(new Date(user.loggedInSince))}
                        </div>
                    </div>
                ) : null
            }
            {
                user?.userAgent ? (
                    <div className={UserNavStyles.info}>
                        User Agent
                        <div className={UserNavStyles.info_value}>
                            {user.userAgent}
                        </div>
                    </div>
                ) : null
            }
            <div className={UserNavStyles.info}>
                Easter Egg Found
                <div className={UserNavStyles.info_value}>
                    {user.foundEasterEgg ? "How NICE of you to find it!" : "Not Yet..."}
                </div>
            </div>
            <div className={UserNavStyles.signout}>
                <button className={SharedStyles.terminal_button} onClick={() => setSignedOut()}>Sign Out</button>
            </div>
        </div>
    )
}

export default UserNav
