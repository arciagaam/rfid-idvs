import { restoreStudent } from '@/api/studentAPI';
import { useModal } from '@/components/global/Modal';
import { useStudent } from '../providers/useStudents';

const RestoreStudentForm = ({ id }: { id: string | number }) => {
    const { setOpen } = useModal();
    const { setStudents } = useStudent();

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const req = await restoreStudent(id);

        if (!req) return;

        const res = await req.json();

        if (res) {
            setStudents((prev) => {
                return prev.filter((user) => user.id !== id);
            })

            setOpen(false);
        }
    }

    return (
        <form id='restore-student-form' onSubmit={handleFormSubmit} className="flex flex-col gap-5">
            <p>Are you sure you want to restore the student?</p>
        </form>
    )
}

export { RestoreStudentForm }
