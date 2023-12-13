import { useParams } from 'react-router-dom'

const StudentIDValidation = () => {
    const { slug } = useParams();

    return (
        <>
            <div className="flex w-full justify-between">
                <h2 className='text-lg font-bold'>ID Validation - { slug !== undefined ? slug.toUpperCase() : "Invalid Department"}</h2>
            </div>
        </>
    )
}

export { StudentIDValidation }
