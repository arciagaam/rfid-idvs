import { Modal } from '@/components/global/Modal'
import { Button } from '@/components/ui/button'
import React from 'react'
import { PrintReportModalBody } from './PrintReportModalBody'

const PrintReportModal = ({term_id, selectedCourses, validated_status}: {term_id: number, selectedCourses: number[], validated_status: string}) => {
    return (
        <Modal
            trigger={<Button>Print Reports</Button>}

            title={`Print Reports`}

            description={''}

            body={<PrintReportModalBody term_id={term_id} selectedCourses={selectedCourses} validated_status={validated_status}/>}

            footer={<Button form='print-report-form' type="submit">Print</Button>}

            className="w-96"
        />
    )
}

export { PrintReportModal }