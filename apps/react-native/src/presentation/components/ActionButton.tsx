import { exec } from 'child_process';
import React, { FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';
import API from '../../data/network/APIClient';

type ActionButtonProps = {
    label: string,
    action: string,
}

const ActionButton: FC<ActionButtonProps> = ({ label, action }) => {
    const [visible, setVisible] = useState(false)
    const showDialog = () => setVisible(true)
    const hideDialog = () => setVisible(false)

    const [infoVisible, setInfoVisible] = useState(false)
    const [infoMsg, setInfoMsg] = useState('')

    const showInfoDialog = (msg: string) => {
        setInfoMsg(msg)
        setInfoVisible(true)
    }

    const execute = async () => {
        hideDialog()
        try {
            await API.get('/')
            // exec(`dbus-send --system --print-reply --dest=org.freedesktop.login1 /org/freedesktop/login1 org.freedesktop.login1.Manager.${action} boolean:false`, (error, stdout, stderr) => {
            //     if (error) {
            //         showInfoDialog(error.message)
            //     }

            //     if (stderr) {
            //         showInfoDialog(stderr)
            //     }
            // })
        } catch {
            showInfoDialog('Failed to execute the command!')
        }
    }

    return (
        <>
            <Button
                mode='contained'
                style={styles.button}
                contentStyle={styles.buttonContent}
                labelStyle={styles.buttonLabel}
                onPress={showDialog}>{label}</Button>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Confirmation</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>
                            Are you sure, you wan to execute the action?
                        </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>No</Button>
                        <Button onPress={execute}>Yes</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog visible={infoVisible} onDismiss={() => setInfoVisible(false)}>
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>
                            {infoMsg}
                        </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setInfoVisible(false)}>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        margin: 16,
        flex: 1,
        height: 200,
        justifyContent: 'center'
    },
    buttonContent: {
        height: 200,
    },
    buttonLabel: {
        fontSize: 36,
        fontWeight: 'bold',
    }
});

export default ActionButton