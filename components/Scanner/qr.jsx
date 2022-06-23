
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {BarCodeScanner} from "expo-barcode-scanner";

export default function Scanner({setToken, scanned, setScanned}) {
    const [hasPermission, setHasPermission] = useState(null);


    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted')
        })();
    }, [])

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        setToken(data)
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }


    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 350,
        height: 350,
    },
});
