import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Platform, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen({navigation}) {
  const [initialRegion, setInitialRegion] = useState(null);
  const [savedMarker, setSavedMarker] = useState(null);

  useEffect(() => {
    // Request permission to access the user's location
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Location permission denied');
      return;
    }

    // if (Platform.OS === 'android' && !Constants.isDevice) {
    //   console.log('Location services are not available on Android emulator.');
    //   return;
    // }

    // If permission is granted, get the user's current location
    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    const { latitude, longitude } = location.coords;
    setInitialRegion({
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setSavedMarker(coordinate);
  };

  return (
    <View style={styles.container}>
      {initialRegion && (
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation
          onPress={handleMapPress}
        >
          {savedMarker && (
            <Marker
              coordinate={savedMarker}
              title="Saved Marker"
              description="This is the saved marker"
            />
          )}
        </MapView>
      )}

      {savedMarker && (
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            Latitude: {savedMarker.latitude.toFixed(6)}, Longitude: {savedMarker.longitude.toFixed(6)}
          </Text>
          <TouchableOpacity style={styles.getPosition} >
            <Text style={styles.statsText} onPress={()=>navigation.navigate("HomeScreen",{Latitude:savedMarker.latitude.toFixed(6), Longitude:savedMarker.longitude.toFixed(6)})}>
              set position
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  statsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
  },
  statsText: {
    fontSize: 16,
    marginBottom: 5,
  },
  getPosition:{
    backgroundColor:"red",
    alignSelf:"center",
    padding:5,
    borderRadius:10
  }
});
