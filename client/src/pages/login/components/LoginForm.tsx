import { useEffect, useState } from "react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "@/providers/auth/useAuthContext";

import { z } from "zod";

import { loginSchema } from "@/validators/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const loginForm = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
            remember_me: false
        }
    });

    const { user, login, error } = useAuth();
    const navigate = useNavigate();

    const handleFormSubmit = async (values: z.infer<typeof loginSchema>) => {
        await login(values);
    }

    useEffect(() => {
        if (user !== null) {
            if (user.role_id === 1) {
                return navigate("/admin")
            }

            if (user.role_id === 2) {
                return navigate("/")
            }
        }
    }, [user, navigate]);

    return (
        <Form {...loginForm}>
            <form
                onSubmit={loginForm.handleSubmit(handleFormSubmit)}
                className="w-full flex flex-col gap-4"
            >
                {
                    error && error?.message ? (
                        <p className="self-center text-left text-sm font-medium dark:text-red-900 text-red-500">{error.message}</p>
                    ) : null
                }
                <FormField
                    control={loginForm.control}
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
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <>
                                    <div className="relative">
                                        <Input placeholder="Enter your password" type={showPassword ? "text" : "password"} {...field} />
                                        <button className="absolute right-2 top-1/2 -translate-y-1/2" onClick={() => setShowPassword(!showPassword)} type="button">
                                            {
                                                showPassword ? (
                                                    <FaEye />
                                                ) : (
                                                    <FaEyeSlash />
                                                )
                                            }
                                        </button>
                                    </div>
                                </>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                >
                </FormField>

                <div className="flex flex-row justify-between mt-4">
                    <FormField
                        control={loginForm.control}
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
    )
};

export { LoginForm };
