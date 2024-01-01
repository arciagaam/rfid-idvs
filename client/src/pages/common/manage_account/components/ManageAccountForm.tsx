import { useEffect, useCallback } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { accountSchema } from '@/validators/AccountSchema';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { updateAccount } from '@/api/accountAPI';
import { useAuth } from '@/providers/auth/useAuthContext';

const API_URL = import.meta.env.VITE_API_URL;

const ManageAccountForm = () => {
    const { update } = useAuth();
    const manageAccountForm = useForm<z.infer<typeof accountSchema>>({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            email: "",
            first_name: "",
            middle_name: "",
            last_name: "",
            password: "",
            confirm_password: ""
        }
    })

    const fetchUser = useCallback(async () => {
        try {
            const req = await fetch(`${API_URL}/authenticate/me`, {
                credentials: "include"
            })

            if (!req.ok) {
                throw new Error("Getting user data failed.");
            }

            const res = await req.json();

            if (res && res.data) {
                manageAccountForm.reset({
                    email: res.data.email,
                    first_name: res.data.first_name,
                    middle_name: res.data.middle_name ?? '',
                    last_name: res.data.last_name,
                });
            }
        } catch (error) {
            console.error(error);
        }
    }, [manageAccountForm])

    useEffect(() => {
        fetchUser();
    }, [manageAccountForm, fetchUser])

    const handleFormSubmit = async (values: z.infer<typeof accountSchema>) => {
        const req = await updateAccount(values);

        if (!req) return;

        const res = await req.json();

        if (res && res.user) {
            update(res.user);
            await fetchUser();
        }
    }

    return (
        <Form {...manageAccountForm}>
            <form id='edit-user-form' onSubmit={manageAccountForm.handleSubmit(handleFormSubmit)} className="flex flex-col gap-10">
                <div className="flex flex-col gap-5">
                    <div>
                        <strong>Personal Information</strong>
                        <Separator />
                    </div>

                    <FormField
                        control={manageAccountForm.control}
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


                    <div className="flex flex-col lg:flex-row gap-5">
                        <FormField
                            control={manageAccountForm.control}
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
                            control={manageAccountForm.control}
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
                            control={manageAccountForm.control}
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
                </div>

                <div className="flex flex-col gap-5">
                    <div>
                        <strong>Change Password</strong>
                        <Separator />
                    </div>

                    <FormField
                        control={manageAccountForm.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={manageAccountForm.control}
                        name="confirm_password"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter the same password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button className="w-fit self-end" type="submit">Save Changes</Button>
            </form>
        </Form>
    )
}

export { ManageAccountForm }
