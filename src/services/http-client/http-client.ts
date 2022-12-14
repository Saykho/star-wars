import axios from "axios";

const instance = axios.create({
    baseURL: "https://swapi.dev/api/"
});

class HttpClientImpl {
    post<T>(url: string, data: any): Promise<T> {
        return instance.post<T>(url, data).then(x => x.data);
    }

    put<T>(url: string, data: any): Promise<T> {
        return instance.put<T>(url, data).then(x => x.data);
    }

    get<T>(url: string): Promise<T> {
        return instance.get<T>(url).then(x => x.data);
    }

    delete<T>(url: string, data: any): Promise<T> {
        return instance.delete<T>(url, {data}).then(x => x.data);
    }
}

export const HttpClient = new HttpClientImpl();