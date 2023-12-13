import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { userSchema } from '@/validators/UserSchema'

import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const API_URL = import.meta.env.VITE_API_URL;

const AddUserModal = () => {

    const addUserForm = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            username: "",
            email: "",
            first_name: "",
            middle_name: "",
            last_name: "",
            role_id: 1,
        },
    })

    const handleFormSubmit = async (values: z.infer<typeof userSchema>) => {

        const res = await fetch(`${API_URL}/users`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(values)
        });

        console.log(res)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add User</Button>
            </DialogTrigger>
            <DialogContent onInteractOutside={(e) => { e.preventDefault() }} className="max-w-[80vw] max-h-[80vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Add User</DialogTitle>
                    <DialogDescription>
                        Create user here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>

                <Form {...addUserForm}>
                    <form id="add-user-form" onSubmit={addUserForm.handleSubmit(handleFormSubmit)} className="flex flex-col gap-5">

                        <FormField
                            control={addUserForm.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={addUserForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <div className="flex gap-5">
                            <FormField
                                control={addUserForm.control}
                                name="first_name"
                                render={({ field }) => (
                                    <FormItem className='flex-1'>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter first name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={addUserForm.control}
                                name="middle_name"
                                render={({ field }) => (
                                    <FormItem className='flex-1'>
                                        <FormLabel>Middle Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter middle name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={addUserForm.control}
                                name="last_name"
                                render={({ field }) => (
                                    <FormItem className='flex-1'>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter last name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={addUserForm.control}
                            name="role_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={"1"}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={"1"}>Admin</SelectItem>
                                            <SelectItem value={"2"}>User</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>

                </Form>
                <DialogFooter>
                    <Button form='add-user-form' type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export { AddUserModal }