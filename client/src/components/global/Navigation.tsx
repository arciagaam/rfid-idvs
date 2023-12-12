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
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import { NavLink } from 'react-router-dom'

const NavigationBar = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="fixed min-w-[19rem] w-[19rem] h-screen p-3 flex flex-col bg-[#FAFAFA] gap-5 border-r border-[#1E1E1E15] shadow-2xl z-50">
            <div className="flex gap-3">

                <Avatar className='h-16 w-16 aspect-square'>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                    <h2 className='font-bold'>Laguna State Polytechnic University</h2>
                    <p>Admin</p>
                </div>

            </div>

            <hr />

            {children}

            <div className="flex justify-between mt-auto">
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

                <DropdownMenu >
                    <DropdownMenuTrigger className='focus-within:outline-none'>
                        <IoMdMore size={20}/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>

        </div>
    )
}

const NavigationItem = ({ ...props }) => {
    const { label, to } = props

    return (
        <div className="flex">
            <NavLink
                to={to}
                className={({ isActive }) =>
                    isActive ? "bg-primary-500 text-medium" : "bg-none"
                }
            >{label}</NavLink>
        </div>
    )
}

const NavigationItemGroup = ({ children }: { children: React.ReactNode }) => {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className='border-none'>
                <AccordionTrigger className='p-0 hover:no-underline font-normal'>
                    Student ID Validation
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