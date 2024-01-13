import { Button } from '@/components/ui/button'
import { Modal } from '@/components/global/Modal'
import { RestoreUserForm } from './RestoreUserForm';

type TDeleteUserModalProps = {
    id: string | number;
};

const RestoreUserModal = ({ id }: TDeleteUserModalProps) => {
    return (
        <Modal
            trigger={<Button className="w-full font-normal items-start justify-start px-2 py-1.5 h-fit" variant={"ghost"}>Restore User</Button>}

            title={`Restore User`}

            description={`Restore selected user. Click restore when you're are sure.`}

            body={<RestoreUserForm id={id} />}

            footer={<Button form={'restore-user-form'} type="submit">Restore</Button>}
        />
    )
}

export { RestoreUserModal }
