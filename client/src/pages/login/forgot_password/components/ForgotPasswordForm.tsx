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
        // go to next page
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
            </form>
        </Form>
    )
}

const PageForm = ({ page, form, nextPage, prevPage }: TPageForm) => {
    const handleSendCode = async () => {
        console.log("Sending code...");

        nextPage();
    }

    const handleValidateCode = async () => {
        console.log("Validating code...");

        nextPage();
    }

    switch (page) {
        case 1: return (
            <>
                <FormField
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
                    <Button key={1} onClick={handleSendCode} type="button" className="w-full">Send Code</Button>
                </div>
            </>
        )
        case 2: return (
            <>
                <FormField
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
                    <Button key={2} onClick={prevPage} type="button" className="w-full" variant={"outline"}>Previous</Button>
                    <Button key={3} onClick={handleValidateCode} type="button" className="w-full">Next</Button>
                </div>
            </>
        )
        case 3: return (
            <>
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

                <FormField
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
                    <Button key={4} onClick={prevPage} type="button" className="w-full" variant={"outline"}>Previous</Button>
                    <Button key={5} type="submit" className="w-full">Reset Password</Button>
                </div>
            </>
        )
    }
}

export { ForgotPasswordForm };
