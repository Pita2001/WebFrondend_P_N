import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import Plot from 'react-plotly.js';

const IP=require('./Ipcim')

const Diagram_film_N = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [dataCim, setDataCim] = useState([]);
  const [dataDarabszam, setDataDarabszam] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(IP.Ipcim+'diagram_nikie');
      const json = await response.json();
      setData(json);
      for (let elem of json){
        dataCim.push(elem.motor_modell)
        dataDarabszam.push(elem.darabszam)
      }
    } catch (error) {
      console.error(error);
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
              color: 'red',
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
          keyExtractor={({motor_id}) => motor_id}
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

export default Diagram_film_N;