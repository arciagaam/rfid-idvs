import { Button } from '@/components/ui/button'
import { Modal } from '@/components/global/Modal'
import { ResetPasswordUserForm } from './ResetPasswordUserForm';

type TResetPasswordUserModalProps = {
    id: string | number;
};

const ResetPasswordUserModal = ({ id }: TResetPasswordUserModalProps) => {
    return (
        <Modal
            trigger={<Button className="w-full font-normal items-start justify-start px-2 py-1.5 h-fit" variant={"ghost"}>Reset Password</Button>}

            title={`Reset User Password`}

            description={`Are you sure you want to reset the user password of the user? The password will revert back to their username.`}

            body={<ResetPasswordUserForm id={id} />}

            footer={<Button form={'reset-password-user-form'} type="submit">Reset Password</Button>}

            className="w-96"
        />
    )
}

export { ResetPasswordUserModal }
