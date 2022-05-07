import { Action } from 'common-domain';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { fetchActions } from '../../data/network/API';
import ActionButton from '../components/ActionButton';

const HomeScreen = () => {
    const [actions, setActions] = useState<Action[]>()
    useEffect(() => {
        async function fetchData() {
            const actions = await fetchActions()
            setActions(actions)
        }
        fetchData()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 36, color: 'black', alignSelf: 'center', margin: 16 }}>SimpleSysControl</Text>
            <FlatList
                data={actions}
                renderItem={({ item }) => (
                    <ActionButton action={item} />
                )}
                numColumns={2}
            />
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