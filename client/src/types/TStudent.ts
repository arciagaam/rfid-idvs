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