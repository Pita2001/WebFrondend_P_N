import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';

const IP = require('./Ipcim');

const AutoAdatok = () => {
  const [csere, setCsere] = useState({ evjarat: true, modell: true, hengerurtartalom: true, uzemanyag: true });
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
      } else if (oszlop === 'uzemanyag') {
        return csere.uzemanyag ? a.auto_uzema.localeCompare(b.auto_uzema) : b.auto_uzema.localeCompare(a.auto_uzema);
      }
    });
    setData(sortedData);
    setCsere(prevState => ({ ...prevState, [oszlop]: !prevState[oszlop] }));
  };

  useEffect(() => {
    getAutok();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: '#f0f0f0' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <Button title={`Modell ${csere.modell ? 'növekvő' : 'csökkenő'}`} onPress={() => rendezes('modell')} color="#FF0000" />
        <Button title={`Évjárat ${csere.evjarat ? 'növekvő' : 'csökkenő'}`} onPress={() => rendezes('evjarat')} color="#FF0000" />
        <Button title={`Hengerűrtartalom ${csere.hengerurtartalom ? 'növekvő' : 'csökkenő'}`} onPress={() => rendezes('hengerurtartalom')} color="#FF0000" />
        <Button title={`Üzemanyag: ${csere.uzemanyag ? 'Benzin' : 'Dízel'}`} onPress={() => rendezes('uzemanyag')} color="#FF0000" />
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, paddingBottom: 5 }}>
            <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center', color: '#333' }}>Modellek: {data.length} db</Text>
            <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center', color: '#333' }}>Évjárat</Text>
            <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center', color: '#333' }}>Hengerürtartalom</Text>
            <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center', color: '#333' }}>Üzemanyag</Text>
          </View>
          {data.map(item => (
            <View key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, paddingTop: 5, paddingBottom: 5 }}>
              <Text style={{ flex: 1, textAlign: 'center', color: '#666' }}>{item.auto_modell}</Text>
              <Text style={{ flex: 1, textAlign: 'center', color: '#666' }}>{item.auto_evjarat}</Text>
              <Text style={{ flex: 1, textAlign: 'center', color: '#666' }}>{item.auto_hengerurt}</Text>
              <Text style={{ flex: 1, textAlign: 'center', color: '#666' }}>{item.auto_uzema}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default AutoAdatok;
