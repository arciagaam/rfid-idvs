import { Button } from '@/components/ui/button'
import { Modal } from "@/components/global/Modal";

type TStudentModalProps = {
    isEditing?: false;
    id?: never;
} | {
    isEditing: true;
    id: number;
};

const StudentModal = ({ isEditing = false, id }: TStudentModalProps) => {
    return (
        <Modal
            trigger={isEditing ? <Button className="w-full font-normal items-start justify-start px-2 py-1.5 h-fit" variant={"ghost"}>Edit Student</Button> : <Button>Add Student</Button>}

            title={`${isEditing ? 'Edit' : 'Add'} School Year`}

            description={`${isEditing ? 'Edit' : 'Create'} school year here. Click save when you're done.`}

            body={isEditing && id ? null : null}

            footer={<Button form={isEditing ? 'edit-school-year-form' : 'add-school-year-form'} type="submit">Save changes</Button>}

        />
    )
}

export { StudentModal };
