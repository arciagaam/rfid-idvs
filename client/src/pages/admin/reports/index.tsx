import { printAllReport, printReport } from '@/api/reportAPI';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { TSchoolYear } from '@/types/TSchoolYear';
import { TTerm } from '@/types/TTerm';
import { AllReportsSchema } from '@/validators/ReportSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { fromTheme } from 'tailwind-merge';
import { z } from 'zod';
const API_URL = import.meta.env.VITE_API_URL;

const Reports = () => {
    const [schoolYears, setSchoolYears] = useState<TSchoolYear[]>([]);
    const [selectedSchoolYearId, setSelectedSchoolYearId] = useState<Pick<TSchoolYear, 'id'>['id']>(1);
    const [selectedTermId, setSelectedTermId] = useState<Pick<TTerm, 'id'>['id']>(1);

    const printReportForm = useForm<z.infer<typeof AllReportsSchema>>({
        resolver: zodResolver(AllReportsSchema),
        defaultValues: {
            term_id: '',
            student_year_level: '',
            verification_status: '',
            start_date: new Date(),
            end_date: new Date()
        }
    })

    useEffect(() => {
        const fetchSchoolYears = async () => {
            try {
                const req = await fetch(`${API_URL}/school-years`, {
                    credentials: 'include'
                });

                if (!req.ok) {
                    throw req;
                }

                const res = await req.json();
                const responseData = res.data;

                if (responseData) {
                    const first = responseData[0];

                    setSchoolYears(responseData);
                    setSelectedSchoolYearId(first.id)
                    setSelectedTermId(first.terms[0].id)
                }

            } catch (error) {
                console.error(error);
            }
        }

        fetchSchoolYears();
    }, []);

    const handleFormSubmit = async (values: z.infer<typeof AllReportsSchema>) => {
        const formValues = values;

        Object.assign(formValues, {
            term_id: selectedTermId,
        });

        const req = await printAllReport(formValues);

        if (!req) return;

        const res = await req.json();

        if (res.data) {
            const resData = {data: res.data};
            const formValues = printReportForm.getValues() 
            Object.assign(resData, {
                startDate: formValues.start_date, 
                endDate: formValues.end_date,
                studentYearLevel: formValues.student_year_level,
                validation_status: formValues.verification_status
            })


            localStorage.setItem('print', JSON.stringify(resData));
            window.open(window.location.origin + '/print/validation');
        }
    }

    return (
        <div className="flex flex-col gap-6 w-full justify-betwee">
            <h2 className='text-lg font-bold'>Print Reports</h2>

            <div className="flex flex-col gap-5">
                <Form {...printReportForm}>
                    <form id="print-all-report-form" onSubmit={printReportForm.handleSubmit(handleFormSubmit)} className='grid grid-cols-2 gap-5 w-full'>
                        <div className="flex gap-5">
                            <div className="flex flex-col">
                                <p className="text-base font-medium">School Year</p>
                                <Select
                                    value={`${selectedSchoolYearId}`}
                                    onValueChange={(value: string) => {
                                        const schoolYearId = parseInt(value);
                                        setSelectedSchoolYearId(schoolYearId);
                                        setSelectedTermId(schoolYears.find((schoolYear) => schoolYear.id === schoolYearId)?.terms[0].id ?? 1);
                                    }}
                                >
                                    <SelectTrigger className="h-8 w-[128px]">
                                        <SelectValue placeholder={"Select School Year"} />
                                    </SelectTrigger>
                                    <SelectContent side="top">
                                        {schoolYears.map((schoolYear) => (
                                            <SelectItem key={schoolYear.id} value={`${schoolYear.id}`}>
                                                {schoolYear.year_start} - {schoolYear.year_end}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-base font-medium">Semester</p>
                                <Select
                                    value={`${selectedTermId}`}
                                    onValueChange={(value: string) => {
                                        setSelectedTermId(parseInt(value));
                                    }}
                                >
                                    <SelectTrigger className="h-8 w-[128px]">
                                        <SelectValue placeholder={"Select Semester"} />
                                    </SelectTrigger>
                                    <SelectContent side="top">
                                        {schoolYears.find((schoolYear) => schoolYear.id === selectedSchoolYearId)?.terms.map((term) => (
                                            <SelectItem key={term.id} value={`${term.id}`}>
                                                {term.term}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
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
                        <FormField
                            control={printReportForm.control}
                            name="student_year_level"
                            render={({ field }) => (
                                <FormItem className='flex-1'>
                                    <FormLabel>Student Year Level <span className='text-xs text-black/50 ml-2 text-top'>optional</span> </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Year Level" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
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
                        />
                    </form>
                </Form>

                <Button form='print-all-report-form' type='submit'>Print Report</Button>
            </div>
        </div>
    )
}

export { Reports }