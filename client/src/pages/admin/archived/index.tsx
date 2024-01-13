import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Students } from "./students";
import { Users } from './users';

const Archived = () => {
    return (
        <div className="flex flex-col gap-6 w-full justify-between">
            <h2 className='text-lg font-bold'>Archived</h2>

            <Tabs defaultValue="users">
                <TabsList>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="students">Students</TabsTrigger>
                </TabsList>
                <TabsContent value="users">
                    <Users />
                </TabsContent>
                <TabsContent value="students">
                    <Students />
                </TabsContent>
            </Tabs>
        </div>
    )
};

export { Archived };
