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
import { storeTerm } from "@/api/termAPI";
import { useSchoolYear } from "../providers/useSchoolYear";
import { useModal } from "@/components/global/Modal";

const AddSchoolYearForm = () => {
    const { setOpen } = useModal();
    const { setSchoolYears } = useSchoolYear();
    const addSchoolYearForm = useForm<z.infer<typeof termSchema>>({
        resolver: zodResolver(termSchema),
        defaultValues: {
            number_of_terms: 0,
            year_start: 0,
            year_end: 0,
        },
    })

    const handleFormSubmit = async (values: z.infer<typeof termSchema>) => {
        const req = await storeTerm(values);

        if (!req) return;

        const res = await req.json();

        if (res.data) {
            setSchoolYears((prev) => (
                [
                    {
                        id: res.data.id,
                        schoolYear: `${res.data.yearStart} - ${res.data.yearEnd}`,
                        numberOfTerms: res.data.terms.length
                    },
                    ...prev
                ]
            ))
            setOpen(false);
        }
    }

    return (
        <Form {...addSchoolYearForm}>
            <form id='add-school-year-form' onSubmit={addSchoolYearForm.handleSubmit(handleFormSubmit)} className="flex flex-col gap-5">

                <div className="flex gap-5">
                    <FormField
                        control={addSchoolYearForm.control}
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
                        control={addSchoolYearForm.control}
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
                    control={addSchoolYearForm.control}
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

export { AddSchoolYearForm };
