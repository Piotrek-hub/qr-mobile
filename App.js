
import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Scanner from "./components/Scanner/qr";

export default function App() {
  const [token, setToken] = useState(null)
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if(token) {
      alert(token)
      let socket = new WebSocket("ws://192.168.21.6:8080/qr")

      socket.onopen = () => {
        socket.send(JSON.stringify({message: 'checkToken', token: token}))
      }

      socket.onmessage = function(event) {
        alert(event.data)
      };

      socket.onclose = function(event) {
        if (event.wasClean) {
          alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
          alert('[close] Connection died');
        }
      };

      socket.onerror = function(error) {
        alert(`[error] ${error}`);
      };
    }
  }, [token])

  return (
      <View style={styles.container}>
        <Scanner setToken={setToken} scanned={scanned} setScanned={setScanned}/>
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
