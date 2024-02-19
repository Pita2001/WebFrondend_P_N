import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const IP = require('./Ipcim');

const Torles_2= () => {
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
        <Text style={styles.headerText}>Motorok</Text>
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
                <Text numberOfLines={2} style={styles.itemText}>{item.motor_id}, {item.motor_modell}</Text>
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
    backgroundColor: 'red', // Világoskék szín
  },
  headerText: {
    fontSize: 100,
    fontWeight: 'bold',
    color: 'black', // Fehér szöveg
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0', // Halvány szürke háttérszín
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FFF', // Fehér háttér
    padding: 20,
    borderRadius: 10,
    elevation: 3, // Árnyékozás
  },
  itemText: {
    fontSize: 100,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 40, // Növelt padding
    paddingHorizontal: 20, // Növelt padding
    borderRadius: 50,
    justifyContent: 'center', // A szöveg középre igazítása
    alignItems: 'center', // A szöveg középre igazítása
    borderWidth: 20, // Körvonal hozzáadása
    borderColor: 'darkred', // Körvonal színe
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 60, // Nagyobb méretű szöveg
  },
});

export default Torles_2;
