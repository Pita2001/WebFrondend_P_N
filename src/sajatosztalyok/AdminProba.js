import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Text, View } from 'react-native';

const IP=require('./Ipcim')

const AdminProba = () => {
  const [csere, setAscending] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(IP.Ipcim+'autok');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const EvSzures = () => {
    const sortedData = [...data].sort((a, b) => {
      if (csere) {
        return a.auto_evjarat - b.auto_evjarat;
      } else {
        return b.auto_evjarat - a.auto_evjarat;
      }
    });
    setData(sortedData);
    setAscending(!csere);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Button title={csere ? 'Évjárat szerint növekvő' : 'Évjárat szerint csökkenő'} onPress={EvSzures} />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <Text>
              {item.auto_modell}, {item.auto_evjarat}
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default AdminProba;
