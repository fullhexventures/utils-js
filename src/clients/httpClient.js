import axios from 'axios';

class HTTPClient {
    constructor(baseUrl, token) {
        this.baseUrl = baseUrl;
        this.token = token;
        const headers = {};
        if (this.token) {
            headers.Authorization = `Bearer ${this.token}`;
        }
        this.connection = axios.create({
            baseURL: this.baseUrl,
            timeout: 10000,
            crossDomain: true,
            headers,
        });
    }

    async get(url, params = {}) {
        let queryString = '';
        Object.keys(params).forEach((key) => {
            const delim = queryString === '' ? '?' : '&';
            queryString += `${delim}${key}=${params[key]}`;
        });

        const response = await this.connection.get(`${url}${queryString}`);
        if (response.status === 200) {
            return response.data;
        }
        return null;
    }

    async post(url, data) {
        const response = await this.connection.post(url, data);
        if (response.status === 200) {
            return response.data;
        }
        return null;
    }

    async postMultipart(url, data, uploadProgressHandler) {
        const response = await this.connection.post(url, data, {
            onUploadProgress: uploadProgressHandler,
            timeout: 0,
            headers: {},
        });
        if (response.status === 200) {
            return response.data;
        }
        return null;
    }

    async put(url, data) {
        const response = await this.connection.put(url, data);
        if (response.status === 200) {
            return response.data;
        }
        return null;
    }

    async delete(url) {
        const response = await this.connection.delete(url);
        if (response.status === 200) {
            return response.data;
        }
        return null;
    }
}

export { HTTPClient };
