import { useEffect, useState } from "react";
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

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { termSchema } from "@/validators/TermSchema";
import { getTermsById, updateTerm } from "@/api/termAPI";
import { useSchoolYear } from "../providers/useSchoolYear";
import { useModal } from "@/components/global/Modal";

type TEditSchoolYearResponse = {
    id: number;
    school_year: {
        id: number;
        year_start: number;
        year_end: number;
    };
    term: number;
}

const EditSchoolYearForm = ({ id }: { id: number }) => {
    const { setOpen } = useModal();
    const { setSchoolYears } = useSchoolYear();

    const editSchoolYearForm = useForm<z.infer<typeof termSchema>>({
        resolver: zodResolver(termSchema),
        defaultValues: {
            number_of_terms: 0,
            year_start: 0,
            year_end: 0
        },
    })

    console.log(id);

    useEffect(() => {
        const fetchSchoolYear = async () => {
            const res = await getTermsById(id);

            if (res) {
                const data = res.data as TEditSchoolYearResponse;
                const _schoolYear = data.school_year;

                editSchoolYearForm.reset({
                    number_of_terms: data.term,
                    year_start: _schoolYear.year_start,
                    year_end: _schoolYear.year_end
                });
            }
        }

        fetchSchoolYear();
    }, [id, editSchoolYearForm])

    const handleFormSubmit = async (values: z.infer<typeof termSchema>) => {
        const req = await updateTerm(id, values);

        if (!req) return;

        const res = await req.json();

        if (res.data) {
            setSchoolYears((prev) => {
                return prev.reduce((acc, curr) => {
                    if (curr.id === id) {
                        return [
                            {
                                id: curr.id,
                                schoolYear: `${res.data.yearStart} - ${res.data.yearEnd}`,
                                numberOfTerms: res.data.terms.length
                            },
                            ...acc
                        ]
                    }

                    return acc;
                }, prev);
            })
            setOpen(false);
        }
    }

    return (
        <Form {...editSchoolYearForm}>
            <form id='add-school-year-form' onSubmit={editSchoolYearForm.handleSubmit(handleFormSubmit)} className="flex flex-col gap-5">

                <div className="flex gap-5">
                    <FormField
                        control={editSchoolYearForm.control}
                        name="year_start"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>Year Start</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter year start" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={editSchoolYearForm.control}
                        name="year_end"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>Year End</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter year end" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={editSchoolYearForm.control}
                    name="number_of_terms"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Number of Terms</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter number of terms..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>

        </Form>
    )
}

export { EditSchoolYearForm };
