import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Text, View, TouchableOpacity } from 'react-native';

const IP = require('./Ipcim');

const AutoMarkaTorles = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(IP.Ipcim + 'marka');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    const confirmed = window.confirm('Biztos vagy benne, hogy törölni szeretnéd ezt a márkát?');
    if (!confirmed) {
      return;
    }
    fetch(IP.Ipcim + 'Torles_marka', {
      method: 'DELETE',
      body: JSON.stringify({ bevitel2: id }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Márkák</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#f50057" />
      ) : data.length === 0 ? (
        <Text style={styles.emptyText}>Egyelőre nincs adat</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ marka_id }) => marka_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text numberOfLines={2} style={styles.itemText}>
                {item.marka_id}, {item.marka_nev}
              </Text>
              <TouchableOpacity style={styles.button} onPress={() => handleDelete(item.marka_id)}>
                <Text style={styles.buttonText}>Törlés</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffc107',
    padding: 10,
  },
  header: {
    backgroundColor: 'red',
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#f50057',
    elevation: 2,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#3f51b5',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
});

export default AutoMarkaTorles;
