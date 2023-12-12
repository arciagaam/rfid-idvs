import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/auth/useAuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const form = useForm({
        defaultValues: {
            username: "",
            password: "",
            remember_me: false
        }
    });

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const values = form.getValues();
        const loggedIn = await login(values);

        if (loggedIn) {
            navigate('/admin')
        }
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="flex flex-col items-center gap-8">
                {/* Insert logo here */}
                <div className="w-32 aspect-square bg-neutral-300 rounded-full"></div>

                <div className="flex flex-col gap-2 text-center">
                    <strong className="font-bold text-3xl">Login to your account</strong>
                    <p className="text-lg">Enter your details to login</p>
                </div>

                <Form {...form}>
                    <form
                        onSubmit={handleFormSubmit}
                        className="w-full flex flex-col gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your username" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        >
                        </FormField>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your password" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        >
                        </FormField>

                        <div className="flex flex-row justify-between mt-4">
                            <FormField
                                control={form.control}
                                name="remember_me"
                                render={({ field }) => (
                                    <FormItem className="flex items-center gap-2 space-y-0">
                                        <FormControl>
                                            <Checkbox 
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel className="font-normal">Keep me logged in</FormLabel>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            >
                            </FormField>

                            <Link to="/forgot-password" className="underline text-sm">Forgot Password?</Link>
                        </div>

                        <Button type="submit" className="w-full">Login</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
};

export { Login };
