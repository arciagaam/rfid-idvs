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
import { storeUser } from '@/api/userAPI';
import { useUser } from "../providers/useUser";
import { useModal } from "@/components/global/Modal";
import { FormLabelHelper } from "@/components/global/FormLabelHelper";

const AddUserForm = () => {
    const { setOpen } = useModal();
    const { setUsers } = useUser();

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
        const req = await storeUser(values);

        if (!req) return;

        const res = await req.json();

        if (res && res.data) {
            setUsers((prev) => [
                {
                    id: res.data.id,
                    fullname: `${res.data.first_name} ${(res.data.middle_name ?? '')} ${res.data.last_name}`,
                    username: res.data.username,
                    email: res.data.email,
                    role: res.data.role.name.toUpperCase()
                },
                ...prev
            ]);
        }

        setOpen(false);
    }


    return (
        <Form {...addUserForm}>
            <form id='add-user-form' onSubmit={addUserForm.handleSubmit(handleFormSubmit)} className="flex flex-col gap-5">

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
                                <FormLabel>Middle Name <FormLabelHelper /></FormLabel>
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
    )
}

export { AddUserForm }
