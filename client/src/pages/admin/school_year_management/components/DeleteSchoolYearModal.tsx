import { Button } from '@/components/ui/button'
import { Modal } from '@/components/global/Modal'
import { DeleteSchoolYearForm } from './DeleteSchoolYearForm';

type TDeleteSchoolYearModalProps = {
    id: string | number;
};

const DeleteSchoolYearModal = ({ id }: TDeleteSchoolYearModalProps) => {
    return (
        <Modal
            trigger={<Button className="w-full font-normal items-start justify-start px-2 py-1.5 h-fit hover:bg-red-100 hover:text-red-500 text-red-500 bg-red-50" variant={"ghost"}>Delete School Year</Button>}

            title={`Delete School Year`}

            description={`Delete selected school year. Click delete when you're are sure.`}

            body={<DeleteSchoolYearForm id={id} />}

            footer={<Button form={'delete-user-form'} type="submit" variant={"destructive"}>Delete</Button>}
        />
    )
}

export { DeleteSchoolYearModal }
