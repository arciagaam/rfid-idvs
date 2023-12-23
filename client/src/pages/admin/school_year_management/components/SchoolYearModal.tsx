import { Button } from '@/components/ui/button'
import { Modal } from "@/components/global/Modal";
import { AddSchoolYearForm } from './AddSchoolYearForm';
import { useState } from 'react';

type TSchoolYearModalProps = {
    isEditing?: false;
    id?: never;
} | {
    isEditing: true;
    id: number;
};

const SchoolYearModal = ({ isEditing = false, id }: TSchoolYearModalProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Modal
            trigger={isEditing ? <Button className="w-full font-normal items-start justify-start px-2 py-1.5 h-fit" variant={"ghost"}>Edit School Year</Button> : <Button>Add School Year</Button>}

            title={`${isEditing ? 'Edit' : 'Add'} School Year`}

            description={`${isEditing ? 'Edit' : 'Create'} school year here. Click save when you're done.`}

            body={isEditing && id ? null : <AddSchoolYearForm />}

            footer={<Button form={isEditing ? 'edit-school-year-form' : 'add-school-year-form'} type="submit">Save changes</Button>}

        />
    )
}

export { SchoolYearModal };
