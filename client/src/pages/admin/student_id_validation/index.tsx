import { useParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentID } from './student_id';
import { ValidationHistory } from './validation_history';

const StudentIDValidation = () => {
    const { slug } = useParams();

    return (
        <>
            <div className="flex flex-col gap-6 w-full justify-between">
                <h2 className='text-lg font-bold'>ID Validation - {slug !== undefined ? slug.toUpperCase() : "Invalid Department"}</h2>

                <Tabs defaultValue="student_id" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="student_id">Student ID</TabsTrigger>
                        <TabsTrigger value="validation_history">Validation History</TabsTrigger>
                    </TabsList>
                    <TabsContent value="student_id">
                        <StudentID slug={slug} />
                    </TabsContent>
                    <TabsContent value="validation_history">
                        <ValidationHistory />
                    </TabsContent>
                </Tabs>
            </div>

        </>
    )
}

export { StudentIDValidation }
