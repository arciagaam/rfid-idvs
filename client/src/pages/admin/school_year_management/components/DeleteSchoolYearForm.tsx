import { deleteSchoolYear } from '@/api/termAPI';
import { useModal } from '@/components/global/Modal';
import { useSchoolYear } from '../providers/useSchoolYear';

const DeleteSchoolYearForm = ({ id }: { id: string | number }) => {
    const { setOpen } = useModal();
    const { setSchoolYears } = useSchoolYear();

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await deleteSchoolYear(id);

        if (!res) return;

        setSchoolYears((prev) => {
            return prev.filter((year) => year.id !== id);
        })

        setOpen(false);
    }

    return (
        <form id='delete-user-form' onSubmit={handleFormSubmit} className="flex flex-col gap-5">
            <p>Are you sure you want to delete the school year?</p>
        </form>
    )
}

export { DeleteSchoolYearForm }
