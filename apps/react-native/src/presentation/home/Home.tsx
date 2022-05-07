import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ActionButton from '../components/ActionButton';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 36, color: 'black', alignSelf: 'center', margin: 16 }}>SimpleSysControl</Text>
            <View style={{ flexDirection: 'row', }}>
                <ActionButton label='Suspend' action='Suspend' />
                <ActionButton label='Shutdown' action='Shutdown' />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default HomeScreen