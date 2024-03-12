import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';

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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, }}>
        <Button title={`Modell ${csere.modell ? 'növekvő' : 'csökkenő'}`} onPress={() => rendezes('modell')} color="#008000" />
        <Button title={`Évjárat ${csere.evjarat ? 'növekvő' : 'csökkenő'}`} onPress={() => rendezes('evjarat')} color="#008000" />
        <Button title={`Hengerűrtartalom ${csere.hengerurtartalom ? 'növekvő' : 'csökkenő'}`} onPress={() => rendezes('hengerurtartalom')} color="#008000" />
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
              <Text style={{ flex: 1, textAlign: 'center', color: '#666' }}>{item.motor_modell}</Text>
              <Text style={{ flex: 1, textAlign: 'center', color: '#666' }}>{item.motor_evjarat}</Text>
              <Text style={{ flex: 1, textAlign: 'center', color: '#666' }}>{item.motor_hengerurt}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default MotorAdatok;
