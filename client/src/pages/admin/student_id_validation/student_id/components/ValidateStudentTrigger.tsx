import { triggerModal } from '@/api/studentAPI';
import { useModal } from '@/components/global/Modal';
import { TStudentTable } from '@/types/TStudentTable';
import { useEffect } from 'react'
import toast from 'react-hot-toast';
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
        term: {
            school_year: {
                year_start: string,
                year_end: string,
            },
            term: number,
        },
        course: {
            id: number,
            name: string,
        }
    }
}

type TValidateRFIDError = {
    code: number;
    message: string;
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

                toast.custom(() => (
                    <div className="bg-white inline-flex flex-col text-center shadow-lg rounded-lg px-2.5 py-2">
                        <p className="font-semibold">{`${res.data.first_name} ${(res.data.middle_name ?? '')} ${res.data.last_name} - ${res.data.student_number}`}</p>
                        <p className="text-sm text-black/50 flex flex-col text-center">
                            <span>{`${res.data.course.name}`}</span>
                            <span>{`Semester ${res.data.term.term} - School Year ${res.data.term.school_year.year_start} - ${res.data.term.school_year.year_end}`}</span>
                        </p>
                    </div>
                ), {
                    duration: 6000
                })
            }
        })

        socket.on('validate_rfid_tap_error', (res: TValidateRFIDError) => {
            if (res) {
                toast.error(res.message);
            }
        })

        return () => {
            socket.disconnect()
        }
    }, [setOpen, setStudents])

    return null
}

export { ValidateStudentTrigger }
