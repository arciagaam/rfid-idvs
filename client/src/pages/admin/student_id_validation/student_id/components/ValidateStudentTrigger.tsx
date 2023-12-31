import { triggerModal } from '@/api/studentAPI';
import { useEffect } from 'react'
let timeout: ReturnType<typeof setTimeout>

const ValidateStudentTrigger = ({term_id}: {term_id: number}) => {
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
    }, [])

    return null
}

export { ValidateStudentTrigger }