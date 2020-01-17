import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main/Index';
import Profile from './pages/Profile/Index';

const Routes = createAppContainer(
  createStackNavigator({
    Main: {
      screen: Main,
      navigationOptions: {
        title: 'DevRadar'
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Github Profile'
      }
    },
  }, {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#7159c1",
      },
      headerTitleStyle: {
        color: "#fff",
        fontWeight: 'bold',
      },
      headerTitleAlign: 'center',
    }
  })
)

export default Routes;