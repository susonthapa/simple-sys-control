import { Action, ApiResponse } from "common-domain";
import API from "./APIClient";

export const fetchActions = async (): Promise<Action[]> => {
    const response = await API.get<ApiResponse<Action[]>>('/actions')
    if (response.data.code === 200) {
        return response.data.data!
    }

    return []
}

export const executeAction = async (id: string): Promise<string> => {
    const res = await API.post<ApiResponse>(`/action/${id}`)
    return res.data.message
}