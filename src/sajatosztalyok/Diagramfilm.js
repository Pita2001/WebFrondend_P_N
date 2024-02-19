import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import Plot from 'react-plotly.js';

const IP=require('./Ipcim')

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataCim, setDataCim] = useState([]);
  const [dataDarabszam, setDataDarabszam] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(IP.Ipcim+'diagram');
      const json = await response.json();
      setData(json);
        for (let elem of json){
            dataCim.push(elem.auto_modell)
            dataDarabszam.push(elem.darabszam)
        }

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Plot
        data={[
          {
            type: 'bar',   
            x: dataCim, 
            y: dataDarabszam,
            marker: {
              color: 'green', // Az elemek színe
            }
          },
        ]}
        layout={{ width: 500, height: 500, title: 'Motorok' }}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({auto_id}) => auto_id}
          renderItem={({item}) => (
            <Text>
              {item.film_cim}
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default App;