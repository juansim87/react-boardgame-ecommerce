import axios from "axios";
import { getTokenFromLocalStorage } from "../auth/auth.service";

const baseURL = "https://eleven-code-api-juan-simon.vercel.app/api";

export const api = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = getTokenFromLocalStorage();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        // Cualquier código de estado que esté dentro del rango de 2xx hace que esta función se active
        return response;
    },
    (error) => {
        // Cualquier código de estado que esté fuera del rango de 2xx hace que esta función se active
        if (error.response) {
            // La solicitud se realizó y el servidor respondió con un código de estado
            console.error("Error interceptor:", error.response);
        } else if (error.request) {
            // La solicitud se realizó pero no se recibió respuesta
            console.error("Error interceptor request:", error.request);
        } else {
            // Algo sucedió al configurar la solicitud que provocó un error
            console.error("Error interceptor message:", error.message);
        }
        return Promise.reject(error);
    }
);
