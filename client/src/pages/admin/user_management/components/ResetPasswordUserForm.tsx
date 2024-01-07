import { resetUserPassword } from '@/api/userAPI';
import { useModal } from '@/components/global/Modal';

const ResetPasswordUserForm = ({ id }: { id: string | number }) => {
    const { setOpen } = useModal();

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const req = await resetUserPassword(id);

        if (!req) return;

        const res = await req.json();

        if (res && res.data) {
            setOpen(false);
        }
    }

    return (
        <form id='reset-password-user-form' onSubmit={handleFormSubmit} className="flex flex-col gap-5">
        </form>
    )
}

export { ResetPasswordUserForm }
