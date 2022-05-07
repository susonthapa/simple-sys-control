import { exec } from "child_process";
import { Actions, ApiResponse, failure, success } from "common-domain";
import util from 'util';
import commands from "./ActionMapping";

const execPromise = util.promisify(exec)

class ActionController {
    static async execute(id: string): Promise<ApiResponse> {
        const action = commands.find((it) => it.id === id)
        if (action) {
            const { stderr } = await execPromise(action.command)
            if (stderr) {
                return failure({
                    code: 500,
                    message: stderr
                })
            } else {
                return success({
                    message: 'Executed successfully!'
                })
            }
        } else {
            return failure({
                message: `Action with specified id ${id} not found!`
            })
        }
    }

    static get(): ApiResponse<Actions> {
        return success({
            data: commands.map((it) => ({ id: it.id, name: it.name }))
        })
    }
}

export default ActionController