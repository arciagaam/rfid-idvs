import { Button } from '@/components/ui/button'
import { Modal } from '@/components/global/Modal'
import { ValidateStudentTrigger } from './ValidateStudentTrigger';

const ValidateStudentModal = ({ term_id }: { term_id: number }) => {


    return (
        <Modal
            
            trigger={<Button>Validate</Button>}

            title={`Validate`}

            description={`Validate student. Click done once finished.`}

            body={<ValidateStudentTrigger term_id={term_id}/>}

            footer={<Button type="submit">Done</Button>}
        />
    )
};

export { ValidateStudentModal };
