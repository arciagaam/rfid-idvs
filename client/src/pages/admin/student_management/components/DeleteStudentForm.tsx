import { deleteStudent } from '@/api/studentAPI';
import { useModal } from '@/components/global/Modal';
import { useStudent } from '../providers/useStudent';

const DeleteStudentForm = ({ id }: { id: string | number }) => {
    const { setOpen } = useModal();
    const { setStudents } = useStudent();

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const req = await deleteStudent(id);

        if (!req) return;

        const res = await req.json();

        if (res && res.data) {
            setStudents((prev) => {
                return prev.filter((student) => student.id !== id);
            })

            setOpen(false);
        }
    }

    return (
        <form id='delete-student-form' onSubmit={handleFormSubmit} className="flex flex-col gap-5">
            <p>Are you sure you want to delete the student?</p>
        </form>
    )
}

export { DeleteStudentForm }
