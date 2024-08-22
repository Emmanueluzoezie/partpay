export declare class ApiClient {
    private axiosInstance;
    constructor(baseURL: string, apiKey: string);
    get<T>(url: string, params?: Record<string, any>): Promise<T>;
    post<T>(url: string, data?: Record<string, any>): Promise<T>;
    put<T>(url: string, data?: Record<string, any>): Promise<T>;
    delete<T>(url: string): Promise<T>;
}
//# sourceMappingURL=api.d.ts.map