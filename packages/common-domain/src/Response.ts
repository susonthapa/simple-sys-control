type ApiResponse = {
    code: number,
    message: string,
    data?: any
}

export const success = ({ message = 'Success', data }: Omit<Partial<ApiResponse>, 'code'>): ApiResponse => {
    return {
        code: 200,
        message: message,
        data: data,
    }
}

export const failure = ({ message = 'Failure', code = 500 }: Partial<ApiResponse>): ApiResponse => {
    return {
        code: code,
        message: message,
    }
}
