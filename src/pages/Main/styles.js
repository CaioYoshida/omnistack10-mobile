import styled from 'styled-components/native';
import MapView from 'react-native-maps';

export const Map = styled(MapView)`
  flex: 1;
`;

export const ImageAvatar = styled.Image`
  width: 54px;
  height: 54px;
  border-radius: 4px;
  border-width: 4px;
  border-color: #fff;
`;

export const CalloutView = styled.View`
  width: 260px;
  border-radius: 4px;
`;

export const DevName = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

export const DevBio = styled.Text`
  color: #666;
  margin-top: 5px;
`;

export const DevTechs = styled.Text`
  margin-top: 5px;
`;


