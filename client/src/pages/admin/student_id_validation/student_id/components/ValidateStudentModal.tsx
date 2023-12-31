import { Button } from '@/components/ui/button'
import { Modal } from '@/components/global/Modal'
import { ValidateStudentTrigger } from './ValidateStudentTrigger';
import { TStudentTable } from '@/types/TStudentTable';

const ValidateStudentModal = ({ term_id, setStudents }: { term_id: number, setStudents: React.Dispatch<React.SetStateAction<Omit<TStudentTable, 'validated_at'>[]>> }) => {
    return (
        <Modal
            trigger={<Button>Validate</Button>}

            title={`Validate`}

            description={`Validate student. The modal will automatically close once the validation is finished.`}

            body={<ValidateStudentTrigger term_id={term_id} setStudents={setStudents} />}

            footer={<Button type="submit">Done</Button>}

            className="w-96"
        />
    )
};

export { ValidateStudentModal };
