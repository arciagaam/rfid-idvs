import { deleteUser } from '@/api/userAPI';
import { useModal } from '@/components/global/Modal';
import { useUser } from '../providers/useUser';

const DeleteUserForm = ({ id }: { id: string | number }) => {
    const { setOpen } = useModal();
    const { setUsers } = useUser();

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const req = await deleteUser(id);

        if (!req) return;

        const res = await req.json();

        if (res && res.data) {
            setUsers((prev) => {
                return prev.filter((user) => user.id !== id);
            })

            setOpen(false);
        }
    }

    return (
        <form id='delete-user-form' onSubmit={handleFormSubmit} className="flex flex-col gap-5">
            <p>Are you sure you want to archive the user?</p>
        </form>
    )
}

export { DeleteUserForm }
