import { Button } from '@/components/ui/button'
import { Modal } from '@/components/global/Modal'
import { RestoreStudentForm } from './RestoreStudentForm';

type TDeleteUserModalProps = {
    id: string | number;
};

const RestoreUserModal = ({ id }: TDeleteUserModalProps) => {
    return (
        <Modal
            trigger={<Button className="w-full font-normal items-start justify-start px-2 py-1.5 h-fit" variant={"ghost"}>Restore Student</Button>}

            title={`Restore Student`}

            description={`Restore selected student. Click restore when you're are sure.`}

            body={<RestoreStudentForm id={id} />}

            footer={<Button form={'restore-student-form'} type="submit">Restore</Button>}
        />
    )
}

export { RestoreUserModal }
