import { Button } from '@/components/ui/button'
import { Modal } from '@/components/global/Modal'
import { DeleteUserForm } from './DeleteUserForm';

type TDeleteUserModalProps = {
    id: string | number;
};

const DeleteUserModal = ({ id }: TDeleteUserModalProps) => {
    return (
        <Modal
            trigger={<Button className="w-full font-normal items-start justify-start px-2 py-1.5 h-fit hover:bg-red-100 hover:text-red-500 text-red-500 bg-red-50" variant={"ghost"}>Archive User</Button>}

            title={`Archive User`}

            description={`Archive selected user. Click archive when you're are sure.`}

            body={<DeleteUserForm id={id} />}

            footer={<Button form={'delete-user-form'} type="submit" variant={"destructive"}>Archive</Button>}
        />
    )
}

export { DeleteUserModal }
