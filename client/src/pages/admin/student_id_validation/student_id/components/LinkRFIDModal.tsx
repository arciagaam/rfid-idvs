import { Button } from '@/components/ui/button'
import { Modal } from '@/components/global/Modal'

const LinkRFIDModal = () => {
    return (
        <Modal
            trigger={<Button>Validate</Button>}

            title={`Validate`}

            description={`Validate student. Click done once finished.`}

            body={null}

            footer={<Button form={'validate-student-form'} type="submit">Done</Button>}
        />
    )
};

export { LinkRFIDModal };
