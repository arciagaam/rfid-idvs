import { NavigationBar, NavigationItem, NavigationItemGroup } from '@/components/global/Navigation'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
    return (
        <div className="flex flex-col">
            <NavigationBar>
                <NavigationItem to="dashboard" label="Dashboard" />
                <NavigationItemGroup>
                    <NavigationItem to="dashboard" label="Department 1" />
                    <NavigationItem to="dashboard" label="Department 2" />
                </NavigationItemGroup>
            </NavigationBar>

            <div className="flex flex-col p-5 ml-[19rem] min-h-screen">
                <Outlet />
            </div>
        </div>
    )
}

export { UserLayout }
