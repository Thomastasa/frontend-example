import { Outlet } from "react-router"

import UserNav from "../nav/UserNav"

const PageLayout = () => {
    return (
        <div>
            <UserNav />
            <Outlet />
        </div>
    )
}

export default PageLayout
