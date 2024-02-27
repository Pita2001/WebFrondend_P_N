import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const IP = require('./Ipcim');

const Torles_marka_2 = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const letolt_motor = async () => {
    try {
      const response = await fetch(IP.Ipcim + 'marka_motorok');
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
      bevitel2: szam
    };

    fetch(IP.Ipcim + "torles_marka_motorok", {
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
        <Text style={styles.headerText}>Motor Márkák</Text>
      </View>
      <View style={styles.headerSpacer}></View>
      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ marka_id }) => marka_id}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text numberOfLines={2} style={styles.itemText}>{item.marka_id}, {item.marka_nev}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => torles(item.marka_id)}
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
    backgroundColor: '#ECEFF1', // Világos szürke háttér
  },
  header: {
    paddingVertical: 20,
    backgroundColor: '#607D8B', // Világoskék szín
    alignItems: 'center',
  },
  headerText: {
    fontSize: 120,
    fontWeight: 'bold',
    color: 'white', // Fehér szöveg
  },
  headerSpacer: {
    marginBottom: 60, // Térköz a header és a content között
  },
  
  content: {
    flex: 1,
    paddingHorizontal: 20,
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
    fontSize: 40,
    color: '#455A64', // Sötétszürke szöveg
    
  },
  deleteButton: {
    backgroundColor: '#D32F2F', // Piros szín
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 50,
  },
});

export default Torles_marka_2;
