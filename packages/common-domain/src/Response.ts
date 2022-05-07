export type ApiResponse<T = any> = {
    code: number,
    message: string,
    data?: T
}

export const success = <T = any>({ message = 'Success', data, code = 200 }: Partial<ApiResponse<T>>): ApiResponse<T> => {
    return {
        code: code,
        message: message,
        data: data,
    }
}

export const failure = ({ message = 'Failure', code = 500 }: Partial<ApiResponse<any>>): ApiResponse<any> => {
    return {
        code: code,
        message: message,
    }
}
