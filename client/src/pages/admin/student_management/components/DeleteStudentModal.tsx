import { Button } from '@/components/ui/button'
import { Modal } from '@/components/global/Modal'
import { DeleteStudentForm } from './DeleteStudentForm';

type TDeleteStudentModalProps = {
    id: string | number;
};

const DeleteStudentModal = ({ id }: TDeleteStudentModalProps) => {
    return (
        <Modal
            trigger={<Button className="w-full font-normal items-start justify-start px-2 py-1.5 h-fit hover:bg-red-100 hover:text-red-500 text-red-500 bg-red-50" variant={"ghost"}>Archive Student</Button>}

            title={`Archive Student`}

            description={`Archive selected student. Click archive when you're are sure.`}

            body={<DeleteStudentForm id={id} />}

            footer={<Button form={'delete-student-form'} type="submit" variant={"destructive"}>Archive</Button>}
        />
    )
}

export { DeleteStudentModal }
