const API_URL = import.meta.env.VITE_API_URL;

const getCourses = async () => {
    try {
        return await fetch(`${API_URL}/courses`, {
            credentials: "include"
        }).then(res => res.json());
    } catch (error) {
        console.error(error);
    }
};

export {
    getCourses
}
