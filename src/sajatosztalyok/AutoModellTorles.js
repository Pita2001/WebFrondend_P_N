import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, FlatList, Text, View, TouchableOpacity } from 'react-native';

const IP = require('./Ipcim');

const AutoModellTorles = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(IP.Ipcim + 'autok');
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
    const confirmed = window.confirm('Biztos vagy benne, hogy törölni szeretnéd ezt a motort?');
    if (!confirmed) {
      return;
    }
    fetch(IP.Ipcim + 'torles_auto', {
      method: 'DELETE',
      body: JSON.stringify({ bevitel1: id }),
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
        <Text style={styles.headerText}>Autók</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : data.length === 0 ? (
        <Text style={styles.emptyText}>Nincs elérhető adat</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ auto_id }) => auto_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text numberOfLines={2} style={styles.itemText}>
                 {item.auto_modell}
              </Text>
              <TouchableOpacity style={styles.button} onPress={() => handleDelete(item.auto_id)}>
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
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  header: {
    backgroundColor: '#008000',
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 40,
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
    borderColor: '#4CAF50',
  },
  itemText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FF0000',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize:18,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
});

export default AutoModellTorles;
