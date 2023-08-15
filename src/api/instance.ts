import axios from "axios";

export const instance = axios.create({
    baseURL: "https://exam-8-2bbd9-default-rtdb.europe-west1.firebasedatabase.app/"
});