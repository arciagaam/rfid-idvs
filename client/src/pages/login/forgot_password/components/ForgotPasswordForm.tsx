import { useState } from 'react';

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

import { UseFormReturn, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { forgotPasswordSchema } from "@/validators/ForgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { sendCode, sendMail, changePassword } from '@/api/forgotPasswordAPI';

type TPageForm = {
    page: number;
    nextPage: () => void;
    prevPage: () => void;
    form: UseFormReturn<z.infer<typeof forgotPasswordSchema>>;
}

const ForgotPasswordForm = () => {
    const [page, setPage] = useState(1);
    const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
            reset_code: "",
            password: "",
            confirm_password: ""
        }
    });

    const navigate = useNavigate();

    const handleFormSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
        await changePassword(values);

        navigate('/login', { replace: true });
    }

    const handleNextPage = () => {
        setPage((currPage) =>
            currPage == 3
                ? currPage
                : currPage + 1
        )
    }

    const handlePrevPage = () => {
        setPage((currPage) =>
            currPage == 1
                ? currPage
                : currPage - 1
        )
    }

    return (
        <Form {...forgotPasswordForm}>
            <form
                onSubmit={forgotPasswordForm.handleSubmit(handleFormSubmit)}
                className="w-full flex flex-col gap-4"
            >
                <PageForm page={page} form={forgotPasswordForm} nextPage={handleNextPage} prevPage={handlePrevPage} />
                <Link to={'/login'}>Back to Login</Link>
            </form>
        </Form>
    )
}

const PageForm = ({ page, form, nextPage, prevPage }: TPageForm) => {
    const [loading, setLoading] = useState(false);

    const handleSendCode = async () => {
        setLoading(true);

        const email = form.getValues('email');
        await sendMail({ email: email });

        setLoading(false);
        nextPage();
    }

    const handleValidateCode = async () => {
        setLoading(true);

        const { email, reset_code } = form.getValues();
        const req = await sendCode({
            email: email,
            reset_code: reset_code
        });
        setLoading(false);

        if (req && req.ok) {
            const res = await req.json();

            if (!res) {
                form.setError("reset_code", {
                    message: "Invalid code. Please try again"
                })

                return;
            }

            nextPage();
        } else {
            form.setError("reset_code", {
                message: "Invalid code. Please try again"
            })
        }
    }

    switch (page) {
        case 1: return (
            <>
                <FormField
                    key={"f1"}
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your email" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                >
                </FormField>

                <div className="flex flex-row gap-5">
                    <Button key={1} onClick={handleSendCode} type="button" className="w-full" disabled={loading}>Send Code</Button>
                </div>
            </>
        )
        case 2: return (
            <>
                <FormField
                    key={"f2"}
                    control={form.control}
                    name="reset_code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Code</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter the reset code we sent to your email" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                >
                </FormField>

                <div className="flex flex-row gap-5">
                    <Button key={2} onClick={prevPage} type="button" className="w-full" disabled={loading} variant={"outline"}>Previous</Button>
                    <Button key={3} onClick={handleValidateCode} type="button" className="w-full" disabled={loading}>Next</Button>
                </div>
            </>
        )
        case 3: return (
            <>
                <FormField
                    key={"f3"}
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

                <FormField
                    key={"f4"}
                    control={form.control}
                    name="confirm_password"
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

                <div className="flex flex-row gap-5">
                    <Button key={4} onClick={prevPage} type="button" className="w-full" disabled={loading} variant={"outline"}>Previous</Button>
                    <Button key={5} type="submit" className="w-full" disabled={loading}>Reset Password</Button>
                </div>
            </>
        )
    }
}

export { ForgotPasswordForm };
