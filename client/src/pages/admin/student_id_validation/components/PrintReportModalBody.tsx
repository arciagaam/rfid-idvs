import { printReport } from '@/api/reportAPI';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ReportSchema } from '@/validators/ReportSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/utils'
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';


const PrintReportModalBody = ({term_id, selectedCourses, validated_status}: {term_id: number, selectedCourses: number[], validated_status: string}) => {
    const { slug } = useParams();


    const printReportForm = useForm<z.infer<typeof ReportSchema>>({
        resolver: zodResolver(ReportSchema),
        defaultValues: {
            // term_id: term_id,
            student_year_level: '',
            // verification_status: '',
            start_date: new Date(),
            end_date: new Date()
        }
    })


    const handleFormSubmit = async (values: z.infer<typeof ReportSchema>) => {
        const formValues = values;

        Object.assign(formValues, {
            term_id,
            validation_status: validated_status,
            selected_courses: selectedCourses,
            name: slug
        });
        

        const req = await printReport(formValues);

        if (!req) return;

        const res = await req.json();

        

        if (res.data) {
            const resData = {data: res.data.students};
            const formValues = printReportForm.getValues() 
       

            Object.assign(resData, {
                termSchoolYear: res.data.term.term,
                schoolYearStart: res.data.term?.school_year?.year_start ?? "N/A",
                schoolYearEnd: res.data.term?.school_year?.year_end ?? "N/A",
                startDate: formValues.start_date, 
                endDate: formValues.end_date,
                studentYearLevel: formValues.student_year_level,
                validation_status: validated_status
            })

            localStorage.setItem('print', JSON.stringify(resData));
            window.open(window.location.origin + '/print/validation');
        }
    }

    return (
        <div className="flex flex-col">
            <Form {...printReportForm}>
                <form id="print-report-form" onSubmit={printReportForm.handleSubmit(handleFormSubmit)} className='grid grid-cols-3 gap-5'>

                    <div className="flex col-span-3 gap-5">

                        <FormField
                            control={printReportForm.control}
                            name='start_date'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-base'>From</FormLabel>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={'outline'}
                                                    className={cn(
                                                        'w-full justify-start text-left font-normal',
                                                        !field.value &&
                                                        'text-muted-foreground'
                                                    )}>
                                                    <CalendarIcon className='mr-2 h-4 w-4' />
                                                    {field.value ? (
                                                        format(field.value, 'PPP')
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                align='start'
                                                className=' w-auto p-0'>
                                                <Calendar
                                                    mode='single'
                                                    // captionLayout='dropdown-buttons'
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    fromYear={1960}
                                                    toYear={new Date().getFullYear()}
                                                    disabled={(date) =>
                                                        date > new Date() ||
                                                        date < new Date('1900-01-01')
                                                    }
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={printReportForm.control}
                            name='end_date'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-base'>To</FormLabel>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={'outline'}
                                                    className={cn(
                                                        'w-full justify-start text-left font-normal',
                                                        !field.value &&
                                                        'text-muted-foreground'
                                                    )}>
                                                    <CalendarIcon className='mr-2 h-4 w-4' />
                                                    {field.value ? (
                                                        format(field.value, 'PPP')
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                align='start'
                                                className=' w-auto p-0'>
                                                <Calendar
                                                    mode='single'
                                                    // captionLayout='dropdown-buttons'
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    fromYear={1960}
                                                    toYear={new Date().getFullYear()}
                                                    disabled={(date) =>
                                                        date > new Date() ||
                                                        date < new Date('1900-01-01')
                                                    }
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>

                    {/* <FormField
                        control={printReportForm.control}
                        name="term_id"
                        render={({ field }) => (
                            <FormItem className='col-span-3'>
                                <FormLabel className='text-base'>Select Semester</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select semester" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            terms && terms.map(term => (
                                                <SelectItem value={term.termId.toString()}>Semester {term.term} S.Y. {term.yearStart} - {term.yearEnd}</SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}

                    <FormField
                        control={printReportForm.control}
                        name="student_year_level"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>Student Year Level </FormLabel>
                                <FormControl>
                                    <Input placeholder="Year Level" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* <FormField
                        control={printReportForm.control}
                        name="verification_status"
                        render={({ field }) => (
                            <FormItem className='col-span-2'>
                                <FormLabel className='text-base'>Select Verification Status <span className='text-xs text-black/50 ml-2 text-top'>optional</span></FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="verified">Verified</SelectItem>
                                        <SelectItem value="non-verified">Non-Verified</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}

                </form>
            </Form>

        </div>
    )
}

export { PrintReportModalBody }