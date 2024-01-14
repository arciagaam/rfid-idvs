import { z } from 'zod'

export const ReportSchema = z.object({
    student_year_level: z.string(),
    start_date: z.date(),
    end_date: z.date(),
})

