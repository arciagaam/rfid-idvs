import { TReport } from '@/types/TReport';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const PrintReport = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('print') == null) {
            navigate('/admin/home');
        }
    }, [navigate]);

    const data = localStorage.getItem('print') ?? null;

    if (!data) {
        return false;
    }

    const report: TReport = JSON.parse(data!);

    setTimeout(() => {
        window.print();
        localStorage.removeItem('print');
        window.close();
    }, 200)

    if (report.data.length) {
        return (
            <div className="flex flex-col gap-5">

                <div className="flex justify-between w-full">
                    <h2 className='text-2xl'>Semester {report.termSchoolYear}  <span className='ml-5'>{report.schoolYearStart} - {report.schoolYearEnd}</span> </h2>

                    <div className="flex gap-5 items-start text-lg">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col">
                                <p className='font-bold'>Filter (Validation Status)</p>
                                <p>{report.validation_status ?? report.verification_status}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className='font-bold'>Filter (Year Level)</p>
                                <p>{report.studentYearLevel || 'N/A'}</p>
                            </div>
                        </div>

                        <div className="flex gap-2 ml-10">
                            <p className='font-bold'>Date From:</p>
                            <p>{formatDate(new Date(report.startDate))}</p>
                        </div>

                        <div className="flex gap-2">
                            <p className='font-bold'>Date To:</p>
                            <p>{formatDate(new Date(report.endDate))}</p>
                        </div>
                    </div>
                </div>

                <table className='border'>
                    <thead>
                        <tr>
                            <th className='py-2 px-2'>Student No.</th>
                            <th>Name</th>
                            <th>Year and Section</th>
                            <th>Department</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            report.data.map((item, index: number) => (

                                <tr key={index} className='border text-center'>
                                    <td className='py-2 px-2'>{item.student_number}</td>
                                    <td>
                                        <p>
                                            {item.first_name} {item.middle_name ?? ''} {item.last_name}
                                        </p>
                                    </td>
                                    <td>{item.year} - {item.section}</td>
                                    <td>{item.course.department.full_name}</td>
                                    <td>{item.validated ? 'Validated' : 'Non - Validated'}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
        )
    } else {
        return (
            <p>
                No reports for the given filter.
            </p>
        )
    }

}

function formatDate(date = new Date()) {
    const year = date.toLocaleString('default', { year: 'numeric' })
    const month = date.toLocaleString('default', {
        month: '2-digit',
    })
    const day = date.toLocaleString('default', { day: '2-digit' })

    return [year, month, day].join('-')
}

export default PrintReport

