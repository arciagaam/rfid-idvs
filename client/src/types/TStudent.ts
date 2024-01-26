export type TStudent = {
    id: number,
    studentNumber: string,
    rfidNumber: string,
    firstName: string,
    middleName: string,
    lastName: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    province: string,
    year: string,
    section: string,
    isActive: string,
    course: {
        name: string,
        department: {
            name: string
        }
    }
}

export type TStudentAPI = {
    id: number,
    student_number: string,
    rfid_number: string,
    first_name: string,
    middle_name: string,
    last_name: string,
    year: string,
    section: string,
    course: {
        department: {
            name: string
            id: number
            full_name: string,
        }
    }
    validated: boolean;
}
