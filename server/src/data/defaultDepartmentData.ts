import { department } from "@prisma/client";

type TDepartments = Omit<department, 'id' | 'full_name' | 'created_at' | 'updated_at'> & {
    abr: string;
    name: string;
    courses: {
        // abr: string;
        name: string;
    }[]
};

const departments: TDepartments[] = [
    {
        abr: "SHS",
        name: "Senior High School",
        courses: [
            {
                // abr: "ABM",
                name: "Accountancy Business Management"
            },
            {
                // abr: "STEM",
                name: "Science, Technology, Engineering and Mathematics"
            },
            {
                // abr: "HUMSS",
                name: "Humanities and Social Sciences"
            },
            // Missing other TVL sub-courses
            {
                // abr: "TVL",
                name: "Technical Vocational and Livelihood"
            }
        ]
    },

    {
        abr: "CCS",
        name: "College of Computer Science",
        courses: [
            {
                // abr: "BSIT",
                name: "Bachelor of Science Information Technology"
            },
            {
                // abr: "BSCS",
                name: "Bachelor of Science Computer Science"
            },
        ]
    },

    {
        abr: "CTE",
        name: "College of Teacher Education",
        courses: [
            {
                // abr: "BSED - ENGLISH",
                name: "Bachelor of Secondary Education major in English "
            },
            {
                // abr: "BSED - SOC. STUD.",
                name: "Bachelor of Secondary Education major in Social Studies"
            },
            {
                // abr: "BSED - SCIENCE",
                name: "Bachelor of Secondary Education major in Science"
            },
            {
                // abr: "BSED - MATH",
                name: "Bachelor of Secondary Education major in Mathematics"
            },
            {
                // abr: "BSED - FILIPINO",
                name: "Bachelor of Secondary Education major in Filipino"
            },
            {
                // abr: "BTVTED - FSM",
                name: "Bachelor of Technical Vocational Teacher Education Major in Food and Service Management"
            },
            {
                // abr: "BTVTED - IND. ARTS",
                name: "Bachelor of Technical Vocational Teacher's Education Major Industrial Arts"
            },
            {
                // abr: "BTLED - COM. PROG",
                name: "Bachelor of Technology and Livelihood Education  Major in Computer Programming"
            },
            {
                // abr: "BTVTED - HE",
                name: "Bachelor of Technical Vocational Teacher's Education Major in Home Economics"
            },
            {
                // abr: "BPEd",
                name: "Bachelor of Teacher's Education Major Physical Education"
            },
            {
                // abr: "BEED",
                name: "Bachelor of Elementary Education"
            },
            {
                // abr: "BSEd",
                name: "Bachelor of Secondary Education"
            }
        ]
    },

    {
        abr: "CAS",
        name: "College of Arts and Science",
        courses: [
            {
                // abr: "BS Psychology",
                name: "Bachelor of Science in Psychology"
            },
            {
                // abr: "BS Biology",
                name: "Bachelor of Science in Biology"
            },
            {
                // abr: "BS Chemistry",
                name: "Bachelor of Science in Chemistry"
            },
            {
                // abr: "BS Mathematics",
                name: "Bachelor of Science in Mathematics"
            },
            {
                // abr: "AB Broadcasting",
                name: "Bachelor of Arts in Broadcasting"
            },
        ]
    },

    {
        abr: "CBAA",
        name: "College of Business Administration and Accountancy",
        courses: [
            {
                // abr: "BS Entrepreneurship",
                name: "Bachelor of Science in Entrepreneurship"
            },
            {
                // abr: "BSOA",
                name: "Bachelor of Science Office Administration"
            },
            {
                // abr: "BSA",
                name: "Bachelor of Science in Accountancy"
            },
            {
                // abr: "BSBA - FM",
                name: "Bachelor of Science Business Administration Major in Financial "
            },
            {
                // abr: "BSBA - MM",
                name: "Bachelor of Science Business Administration Major in Marketing"
            },
            {
                // abr: "BSPA",
                name: "Bachelor of Science Public Administration"
            },
        ]
    },

    {
        abr: "CIT",
        name: "College of Industrial Technology",
        courses: [
            {
                // abr: "BSIT AUTO",
                name: "Bachelor of Science Industry Technology Major in Automotive"
            },
            {
                // abr: "BSIT ELEC",
                name: "Bachelor of Science Industry Technology Major in Electrical"
            },
            {
                // abr: "BSIT ELEX",
                name: "Bachelor of Science Industry Technology Major in Electronics"
            },
            {
                // abr: "BSIT ADT",
                name: "Bachelor of Science Industry Technology Major in Architectural Drafting"
            },
            {
                // abr: "BSIT HVACR",
                name: "Bachelor of Science Industry Technology Major in HVACR"
            },
            {
                // abr: "BSIT FBFSM",
                name: "Bachelor of Science Industry Technology Major in FBFSM"
            },
        ]
    },

    {
        abr: "CHMT",
        name: "College of Hospitality Management and Tourism",
        courses: [
            {
                // abr: "BSHM",
                name: "Bachelor of Science Hospitality Management"
            },
            {
                // abr: "BSTM",
                name: "Bachelor of Science Tourism Management"
            },
        ]
    },

    {
        abr: "CONAH",
        name: "College of Nursing and Allied Health",
        courses: [
            {
                // abr: "BS Nursing",
                name: "Bachelor of Science in Nursing"
            },
        ]
    },

    {
        abr: "CCJE",
        name: "College of Criminal Justice Education",
        courses: [
            {
                // abr: "BS Criminology",
                name: "Bachelor of Science in Criminology"
            },
        ]
    },

    {
        abr: "COE",
        name: "College of Engineering",
        courses: [
            {
                // abr: "BSCE",
                name: "Bachelor of Science Civil Engineering"
            },
            {
                // abr: "BSME",
                name: "Bachelor of Science Mechanical Engineering"
            },
            {
                // abr: "BSECE",
                name: "Bachelor of Science Electronics Engineering"
            },
            {
                // abr: "BSEE",
                name: "Bachelor of Science Electrical Engineering"
            },
            {
                // abr: "BSCE",
                name: "Bachelor of Science Computer Engineering"
            },
        ]
    }
]

export default departments;
