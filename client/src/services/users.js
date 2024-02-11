import axios from 'axios';

const proxy = "http://localhost:5000";
export const signup = async ({ firstName, secondName, phone, email, password }) => {
    try {
        const { data } = await axios.post("http://localhost:5000/api/users/register", {
            firstName,
            secondName,
            phone,
            email,
            password
        })
        return data;
    } catch (error) {
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
}

export const login = async ({ email, password }) => {
    try {
        const { data } = await axios.post(`${proxy}/api/users/login`, {
            email,
            password
        })
        return data;
    } catch (error) {
        if(error.response && error.response.data.message){
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
}