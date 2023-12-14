import React, { useEffect, useState } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '@/validators/UserSchema';
import { z } from 'zod';
import { TUser } from '@/types/TUser';
import { getUserByID, updateUser } from '@/api/userAPI';

const EditUserForm = ({ id }: { id: number }) => {

    const [user, setUser] = useState<TUser>();

    const editUserForm = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            username: user?.username,
            email: user?.email,
            first_name: user?.firstName,
            middle_name: user?.middleName ?? '',
            last_name: user?.lastName,
            role_id: user?.roleId,
        }
    })

    useEffect(() => {
        const fetchUser = async () => {
            const res = await getUserByID(id);

            if (res) {
                setUser(res.data);
                editUserForm.reset({
                    username: res.data.username,
                    email: res.data.email,
                    first_name: res.data.firstName,
                    middle_name: res.data.middleName ?? '',
                    last_name: res.data.lastName,
                    role_id: res.data.roleId,
                });
            }
        }
        fetchUser();
    }, [])



    const handleFormSubmit = async (values: z.infer<typeof userSchema>) => {
        await updateUser(id, values);
    }

    return (
        <Form {...editUserForm}>
            <form id='edit-user-form' onSubmit={editUserForm.handleSubmit(handleFormSubmit)} className="flex flex-col gap-5">

                <FormField
                    control={editUserForm.control}
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
                    control={editUserForm.control}
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
                        control={editUserForm.control}
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
                        control={editUserForm.control}
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
                        control={editUserForm.control}
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
                    control={editUserForm.control}
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
    )
}

export { EditUserForm }