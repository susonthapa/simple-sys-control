export declare type ApiResponse = {
    code: number;
    message: string;
    data?: any;
};
export declare const success: ({ message, data }: Omit<Partial<ApiResponse>, 'code'>) => ApiResponse;
export declare const failure: ({ message, code }: Partial<ApiResponse>) => ApiResponse;
