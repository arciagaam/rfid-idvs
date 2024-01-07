import { useEffect } from "react";
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
import { getSchoolYearWithTermById, updateTerm } from "@/api/termAPI";
import { useSchoolYear } from "../providers/useSchoolYear";
import { useModal } from "@/components/global/Modal";
import { TSchoolYear } from "@/types/TSchoolYear";

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

    useEffect(() => {
        const fetchSchoolYear = async () => {
            const res = await getSchoolYearWithTermById(id);

            if (res) {
                const data = res.data as Omit<TSchoolYear, "year_start" | "year_end"> & { yearStart: number; yearEnd: number };

                editSchoolYearForm.reset({
                    number_of_terms: data.terms.length,
                    year_start: data.yearStart,
                    year_end: data.yearEnd
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
                return prev.map((schoolYear) => {
                    if (schoolYear.id === id) {
                        return {
                            ...schoolYear,
                            schoolYear: `${res.data.yearStart} - ${res.data.yearEnd}`,
                            numberOfTerms: res.data.terms.length
                        }
                    }

                    return schoolYear;
                })
            })
        }

        setOpen(false);
    }

    return (
        <Form {...editSchoolYearForm}>
            <form id='edit-school-year-form' onSubmit={editSchoolYearForm.handleSubmit(handleFormSubmit)} className="flex flex-col gap-5">

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
                            <FormLabel>Number of Semesters</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter number of semesters" {...field} />
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
