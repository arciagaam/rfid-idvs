import { restoreUser } from '@/api/userAPI';
import { useModal } from '@/components/global/Modal';
import { useUser } from '../providers/useUser';

const RestoreUserForm = ({ id }: { id: string | number }) => {
    const { setOpen } = useModal();
    const { setArchivedUsers } = useUser();

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const req = await restoreUser(id);

        if (!req) return;

        const res = await req.json();

        if (res) {
            setArchivedUsers((prev) => {
                return prev.filter((user) => user.id !== id);
            })

            setOpen(false);
        }
    }

    return (
        <form id='restore-user-form' onSubmit={handleFormSubmit} className="flex flex-col gap-5">
            <p>Are you sure you want to restore the user?</p>
        </form>
    )
}

export { RestoreUserForm }
