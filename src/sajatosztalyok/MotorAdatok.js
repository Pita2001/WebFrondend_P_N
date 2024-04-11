import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const IP = require('./Ipcim');

const MotorAdatok = () => {
  const [csere, setCsere] = useState({ evjarat: true, modell: true, hengerurtartalom: true });
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMotorok = async () => {
    try {
      const response = await fetch(IP.Ipcim + 'motorok');
      const Motorok = await response.json();
      setData(Motorok);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const rendezes = (oszlop) => {
    const sortedData = [...data].sort((a, b) => {
      if (oszlop === 'evjarat') {
        return csere.evjarat ? a.motor_evjarat - b.motor_evjarat : b.motor_evjarat - a.motor_evjarat;
      } else if (oszlop === 'modell') {
        return csere.modell ? a.motor_modell.localeCompare(b.motor_modell) : b.motor_modell.localeCompare(a.motor_modell);
      } else if (oszlop === 'hengerurtartalom') {
        return csere.hengerurtartalom ? a.motor_hengerurt - b.motor_hengerurt : b.motor_hengerurt - a.motor_hengerurt;
      }
    });
    setData(sortedData);
    setCsere(prevState => ({ ...prevState, [oszlop]: !prevState[oszlop] }));
  };

  useEffect(() => {
    getMotorok();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: '#f0f0f0' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
        <TouchableOpacity onPress={() => rendezes('modell')} style={styles.button}>
          <Text style={styles.buttonText}>{`Modell ${csere.modell ? 'növekvő' : 'csökkenő'}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => rendezes('evjarat')} style={styles.button}>
          <Text style={styles.buttonText}>{`Évjárat ${csere.evjarat ? 'növekvő' : 'csökkenő'}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => rendezes('hengerurtartalom')} style={styles.button}>
          <Text style={styles.buttonText}>{`Hengerűrtartalom ${csere.hengerurtartalom ? 'növekvő' : 'csökkenő'}`}</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, paddingBottom: 5 }}>
            <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center', color: '#333' }}>Modellek: {data.length} db</Text>
            <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center', color: '#333' }}>Évjárat</Text>
            <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center', color: '#333' }}>Hengerürtartalom</Text>
          </View>
          {data.map(item => (
            <View key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, paddingTop: 5, paddingBottom: 5 }}>
              <Text style={{ flex: 1, textAlign: 'center', color: '#666', fontSize: 18 }}>{item.motor_modell}</Text>
              <Text style={{ flex: 1, textAlign: 'center', color: '#666', fontSize: 18 }}>{item.motor_evjarat}</Text>
              <Text style={{ flex: 1, textAlign: 'center', color: '#666', fontSize: 18 }}>{item.motor_hengerurt}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#008000',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MotorAdatok;
