import React, { useEffect, useState } from 'react';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { Marker, Callout } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../../services/api';
import { connect, disconnect, subscribeToNewDevs } from '../../services/socket';

import { 
  Map, 
  ImageAvatar, 
  CalloutView, 
  DevName, 
  DevBio, 
  DevTechs, 
  SearchForm, 
  TechsInput,
  SearchButton  
} from './styles';

export default function Main({ navigation }) {
  const [devs, setDevs] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [techs, setTechs] = useState('');

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if(granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        })
      }
    }
    loadInitialPosition();
  }, [])

  useEffect(() => {
    subscribeToNewDevs(dev => setDevs([...devs, dev]));
  }, [devs]);

  function setupWebsocket() {
    disconnect();

    const { latitude, longitude } = currentRegion;

    connect(
      latitude,
      longitude,
      techs,
    );
  }

  async function loadDevs() {
    const { latitude, longitude } = currentRegion;

    const response = await api.get('search', {
      params: {
        latitude: latitude,
        longitude: longitude,
        techs,
      }
    });

    setDevs(response.data);
    setupWebsocket();
  }

  async function handleRegionChanged(region) {
  
    setCurrentRegion(region);
  }

  if(!currentRegion) {
    return null;
  }

  return (
    <>
      <Map 
        onRegionChangeComplete={handleRegionChanged} 
        initialRegion={currentRegion}
      >
        {devs.map(dev => (
          <Marker 
            key={dev._id} 
            coordinate={{ 
              latitude: dev.location.coordinates[1], 
              longitude: dev.location.coordinates[0],
            }}
          >
            <ImageAvatar source={{ uri: dev.avatar_url }}/>
            
            <Callout onPress={() => {
              navigation.navigate('Profile', { github_username: dev.github_username });
            }}>
              <CalloutView>
                <DevName>{dev.name}</DevName>
                <DevBio>{dev.bio}</DevBio>
                <DevTechs>{dev.techs.join(', ')}</DevTechs>
              </CalloutView>
            </Callout>
          </Marker>
        ))}
      </Map>
      <SearchForm>
        <TechsInput 
          placeholder="Filter devs by techs"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          style={{ elevation: 4 }}
          value={techs}
          onChangeText={setTechs}
        />

        <SearchButton onPress={loadDevs}>
          <MaterialIcons name="my-location" size={20} color="#FFF" />
        </SearchButton>
      </SearchForm>
    </>
  );
}
