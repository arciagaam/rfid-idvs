import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { IoMdMore } from "react-icons/io";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import { Link, NavLink, NavLinkProps, useNavigate } from 'react-router-dom'
import { useAuth } from '@/providers/auth/useAuthContext';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';

const NavigationBar = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate("/home");
    }

    return (
        <div className="fixed min-w-[19rem] w-[19rem] h-screen p-3 flex flex-col bg-slate-950 gap-5 border-r border-[#1E1E1E15] shadow-2xl z-50 text-white/60">
            <div className="text-white flex gap-3">

                <Avatar className='h-16 w-16 aspect-square'>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                    <h2 className='font-bold'>Laguna State Polytechnic University</h2>
                    <p>Admin</p>
                </div>

            </div>

            <hr className="border-slate-700" />

            {children}

            <div className="flex justify-between mt-auto text-white">
                <div className="flex gap-3">

                    <Avatar className='h-14 w-14 aspect-square'>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                        <h3>John Doe</h3>
                        <p>johndoe@email.com</p>
                    </div>

                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger className='focus-within:outline-none'>
                        <IoMdMore size={20} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="gap-4">
                        <DropdownMenuItem>
                            <Link to={"account"}>Manage Account</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="focus:bg-red-100 focus:text-red-500 text-red-500 bg-red-50">Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

const NavigationItem = ({ ...props }: NavLinkProps) => {
    const { children, to } = props

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                (isActive ? "text-white bg-slate-800 font-medium" : "bg-none") + " flex items-center flex-row gap-2 w-full p-2 rounded-md"
            }
        >{children}</NavLink>
    )
}

const NavigationItemGroup = ({ children }: { children: React.ReactNode }) => {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className='p-2 border-none'>
                <AccordionTrigger className='p-0 hover:no-underline font-normal'>
                    <span className="flex flex-row gap-2 items-center">
                        <IoShieldCheckmarkOutline />
                        Student ID Validation
                    </span>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="flex flex-col gap-2 pt-2">
                        {children}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}


export { NavigationBar, NavigationItem, NavigationItemGroup }
