import { useEffect, useState } from 'react'
import { IoMdWifi } from "react-icons/io";
import { Badge } from '@/components/ui/badge';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RFIDSchema } from '@/validators/RFIDSchema';

import { studentRFID, triggerModal } from '@/api/studentAPI';

import { useStudent } from "../providers/useStudent";

import io from 'socket.io-client'
import { Form } from '@/components/ui/form';

let timeout: ReturnType<typeof setTimeout>

type TRFIDFormProps = {
    id: number;
    status: boolean;
};


const RFIDForm = ({ id, status }: TRFIDFormProps) => {
    const { setStudents } = useStudent();
    const [tappedRfid, setTappedRfid] = useState("");

    const linkStudentForm = useForm<z.infer<typeof RFIDSchema>>({
        resolver: zodResolver(RFIDSchema),
        defaultValues: {
            id: id,
            rfid_number: "",
        },
    })

    useEffect(() => {
        const withTimeoutOpenModal = () => {
            timeout = setTimeout(async () => {
                await triggerModal('link_rfid', true)
                openModal();
            }, 10000);
        }
        const openModal = async () => {
            await triggerModal('link_rfid', true)
        }

        withTimeoutOpenModal();
        openModal();

        return () => clearTimeout(timeout)
    }, [])

    useEffect(() => {
        linkStudentForm.reset({
            id: id,
            rfid_number: tappedRfid
        });

    }, [id, tappedRfid, linkStudentForm]);


    useEffect(() => {
        const socket = io(import.meta.env.VITE_SOCKET_API_URL)

        socket.on('new_rfid_tap', (rfidData: string) => {
            setTappedRfid(rfidData)
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    const handleFormSubmit = async (values: z.infer<typeof RFIDSchema>) => {
        const req = await studentRFID(id, values, status ? "unlink" : "link");
        if (!req) return;

        const res = await req.json();

        if (res && res.data) {
            setStudents((prev) => {
                return prev.map((student) => {
                    if (student.id === id) {
                        return {
                            ...student,
                            rfidStatus: res.data.rfidStatus,
                            rfidNumber: res.data.rfidNumber,
                        }
                    }

                    return student;
                })
            })

            // setTappedRfid("");
        }
    }

    return (
        <Form {...linkStudentForm}>
            <form id='link-rfid-student-form' onSubmit={linkStudentForm.handleSubmit(handleFormSubmit)} className="flex flex-col h-fit">
                <div className="flex items-center gap-2">
                    <p>RFID Status:</p>
                    <Badge variant={status ? "default" : "destructive"}>{status ? "Linked" : "Unlinked"}</Badge>
                </div>
                {
                    status ?
                    null
                    : 
                    <>
                        <div className="flex justify-center items-center h-fit">
                            <IoMdWifi size={"75%"} />
                        </div>

                        <div className="flex gap-2">
                            <h2>RFID Number:</h2>
                            <p>{tappedRfid}</p>
                        </div>
                    </>
                }
            </form>
        </Form>
    )
}

export { RFIDForm }
