import { Button } from '@/components/ui/button'
import { Modal } from "@/components/global/Modal";
import { RFIDForm } from './RFIDForm';

type TRFIDModalProps = {
    id: number;
    status: boolean;
    rfid_number: string;
};

const RFIDModal = ({ status, id, rfid_number }: TRFIDModalProps) => {
    return (
        <Modal
            trigger={<Button className="w-full font-normal items-start justify-start px-2 py-1.5 h-fit" variant={"ghost"}>{status ? "Unlink RFID" : "Link RFID"}</Button>}

            title={`${status ? "Unlink" : "Link"} RFID`}

            description={`${status ? "Unlink" : "Link"} RFID to student here. Click ${status ? "unlink" : "link"} RFID when you're done.`}

            body={<RFIDForm id={id} status={status} rfid_number={rfid_number} />}

            footer={<Button form={'link-rfid-student-form'} type="submit">{status ? "Unlink" : "Link"} RFID</Button>}

            className='w-96'
        />
    )
}

export { RFIDModal };
