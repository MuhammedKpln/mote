import axios, { AxiosInstance } from "axios";

export class BaseService {

    public axios:AxiosInstance;

    constructor() {
        this.axios = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL
        })
    }


}
