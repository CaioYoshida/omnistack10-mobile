import React, { useEffect, useState } from 'react';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { Marker, Callout } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';

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
  const [currentRegion, setCurrentRegion] = useState(null);

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

  if(!currentRegion) {
    return null;
  }

  return (
    <>
      <Map initialRegion={currentRegion}>
        <Marker coordinate={{ latitude: -21.2232772, longitude: -47.8312213 }}>
          <ImageAvatar source={{ uri: 'https://avatars2.githubusercontent.com/u/55964826?s=460&v=4' }}/>
          
          <Callout onPress={() => {
            navigation.navigate('Profile', { github_username: 'CaioYoshida' });
          }}>
            <CalloutView>
              <DevName>Caio Yoshida</DevName>
              <DevBio>I'm a full-stack developer focused in JS. Always studying to increase my programming skills and very excited about new challenges</DevBio>
              <DevTechs>ReactJS, React Native, Node.js</DevTechs>
            </CalloutView>
          </Callout>
        </Marker>
      </Map>
      <SearchForm>
        <TechsInput 
          placeholder="Filter devs by techs"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
        />

        <SearchButton onPress={() => {}}>
          <MaterialIcons name="my-location" size={20} color="#FFF" />
        </SearchButton>
      </SearchForm>
    </>
  );
}
