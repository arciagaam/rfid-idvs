import { triggerModal } from '@/api/studentAPI';
import { useModal } from '@/components/global/Modal';
import { TStudentTable } from '@/types/TStudentTable';
import { useEffect } from 'react'
import io from 'socket.io-client'

let timeout: ReturnType<typeof setTimeout>

type TValidateRFID = {
    code: number;
    message: string;
    data: {
        id: number,
        first_name: string,
        middle_name?: string,
        last_name: string,
        rfid_number: string,
        year: string,
        section: string,
        student_number: string;
        validated: boolean;
    }
}

const ValidateStudentTrigger = ({ term_id, setStudents }: { term_id: number, setStudents: React.Dispatch<React.SetStateAction<Omit<TStudentTable, 'validated_at'>[]>> }) => {
    const { setOpen } = useModal();

    useEffect(() => {
        const withTimeoutOpenModal = () => {
            timeout = setTimeout(async () => {
                await triggerModal('validate', true, term_id)
                openModal();
            }, 10000);
        }

        const openModal = async () => {
            await triggerModal('validate', true, term_id)
        }

        withTimeoutOpenModal();
        openModal();

        return () => clearTimeout(timeout)
    }, [term_id])

    useEffect(() => {
        const socket = io(import.meta.env.VITE_SOCKET_API_URL)

        socket.on('validate_rfid_tap', (res: TValidateRFID) => {
            if (res && res.data) {
                setStudents((prev) => {
                    return prev.map((student) => {
                        if (student.id === res.data.id) {
                            return {
                                id: student.id,
                                studentNumber: res.data.student_number,
                                fullName: `${res.data.first_name} ${(res.data.middle_name ?? '')} ${res.data.last_name}`,
                                yearSection: `${res.data.year} - ${res.data.section}`,
                                status: res.data.validated ? "Validated" : "Non-validated"
                            }
                        }

                        return student;
                    });
                })

                setOpen(false);
            }
        })

        return () => {
            socket.disconnect()
        }
    }, [setOpen, setStudents])

    return null
}

export { ValidateStudentTrigger }
