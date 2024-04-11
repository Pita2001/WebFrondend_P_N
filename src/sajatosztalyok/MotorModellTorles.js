import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const IP = require('./Ipcim');

const MotorModellTorles= () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const letolt_motor = async () => {
    try {
      const response = await fetch(IP.Ipcim + 'motorok');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    letolt_motor();
  }, []);

  const torles = (szam) => {
    const confirmed = window.confirm('Biztos vagy benne, hogy törölni szeretnéd ezt a motort?');
    if (!confirmed) {
      return;
    }

    var bemenet = {
      bevitel1: szam
    };

    fetch(IP.Ipcim + "torles_motorok", {
      method: "DELETE",
      body: JSON.stringify(bemenet),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then(x => x.text())
      .then(y => {
        alert(y);
        letolt_motor();
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>MOTOROK</Text>
      </View>
      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ motor_id }) => motor_id}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text numberOfLines={2} style={styles.itemText}>{item.motor_modell.toUpperCase()}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => torles(item.motor_id)}
                >
                  <Text style={styles.buttonText}>TÖRLÉS</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    backgroundColor: '#808080',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  itemText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MotorModellTorles;
