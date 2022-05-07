import { Action } from 'common-domain'

type CmdAction = Action & { command: string }
const cmdPrefix = 'dbus-send --system --print-reply --dest=org.freedesktop.login1 /org/freedesktop/login1'
const commands: CmdAction[] = [
    {
        id: '1',
        name: 'Suspend',
        command: `${cmdPrefix} org.freedesktop.login1.Manager.Suspend boolean:false`,
    },
    {
        id: '2',
        name: 'Shutdown',
        command: `${cmdPrefix} org.freedesktop.login1.Manager.PowerOff boolean:false`,
    }
]

export default commands