import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';

const IP = require('./Ipcim');

const AdminProba = () => {
  const [csere, setCsere] = useState({ evjarat: true, modell: true, hengerurtartalom: true });
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getAutok = async () => {
    try {
      const response = await fetch(IP.Ipcim + 'autok');
      const autok = await response.json();
      setData(autok);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const rendezes = (oszlop) => {
    const sortedData = [...data].sort((a, b) => {
      if (oszlop === 'evjarat') {
        return csere.evjarat ? a.auto_evjarat - b.auto_evjarat : b.auto_evjarat - a.auto_evjarat;
      } else if (oszlop === 'modell') {
        return csere.modell ? a.auto_modell.localeCompare(b.auto_modell) : b.auto_modell.localeCompare(a.auto_modell);
      } else if (oszlop === 'hengerurtartalom') {
        return csere.hengerurtartalom ? a.auto_hengerurt - b.auto_hengerurt : b.auto_hengerurt - a.auto_hengerurt;
      }
    });
    setData(sortedData);
    setCsere(prevState => ({ ...prevState, [oszlop]: !prevState[oszlop] }));
  };

  useEffect(() => {
    getAutok();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24}}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' , marginBottom: 10, paddingLeft: '95px'}}>
      <Button title={`Modell ${csere.modell ? 'növekvő' : 'csökkenő'}`} onPress={() => rendezes('modell')} color="#ff5733" />
      <Button title={`Évjárat ${csere.evjarat ? 'növekvő' : 'csökkenő'}`} onPress={() => rendezes('evjarat')} color="#ff5733" />
        <Button title={`Hengerűrtartalom ${csere.hengerurtartalom ? 'növekvő' : 'csökkenő'}`} onPress={() => rendezes('hengerurtartalom')} color="#ff5733" />
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, borderRightWidth: 1 }}>
            <Text style={{ fontWeight: 'bold', textAlign: 'center', borderBottomWidth: 1 }}>Modell</Text>
            {!isLoading && data.map(item => (
              <Text key={item.id} style={{ textAlign: 'center', borderBottomWidth: 1 }}>{item.auto_modell}</Text>
            ))}
          </View>

          <View style={{ flex: 1, borderRightWidth: 1 }}>
            <Text style={{ fontWeight: 'bold', textAlign: 'center', borderBottomWidth: 1 }}>Évjárat</Text>
            {!isLoading && data.map(item => (
              <Text key={item.id} style={{ textAlign: 'center', borderBottomWidth: 1 }}>{item.auto_evjarat}</Text>
            ))}
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: 'bold', textAlign: 'center', borderBottomWidth: 1 }}>Hengerürtartalom</Text>
            {!isLoading && data.map(item => (
              <Text key={item.id} style={{ textAlign: 'center', borderBottomWidth: 1 }}>{item.auto_hengerurt}</Text>
            ))}
          </View>

        </View>
      )}
    </View>
  );
};

export default AdminProba;
