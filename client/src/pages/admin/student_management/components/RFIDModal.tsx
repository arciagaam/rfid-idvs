import { Button } from '@/components/ui/button'
import { Modal } from "@/components/global/Modal";
import { RFIDForm } from './RFIDForm';

type TRFIDModalProps = {
id: number;
    status: boolean;
};

const RFIDModal = ({ status, id }: TRFIDModalProps) => {
    return (
        <Modal
            trigger={<Button className="w-full font-normal items-start justify-start px-2 py-1.5 h-fit" variant={"ghost"}>{status ? "Unlink RFID" : "Link RFID"}</Button>}

            title={`${status ? "Unlink" : "Link"} RFID`}

            description={`${status ? "Unlink" : "Link"} RFID to student here. Click ${status ? "unlink" : "link"} RFID when you're done.`}

            body={<RFIDForm id={id} status={status} />}

            footer={<Button form={'link-rfid-student-form'} type="submit">{status ? "Unlink" : "Link"} RFID</Button>}
        />
    )
}

export { RFIDModal };
