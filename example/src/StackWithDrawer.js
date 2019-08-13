import * as React from 'react';
import { Button, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { useTheme, ThemeColors } from '@react-navigation/core';
import { Themed } from '@react-navigation/native';

function Menu({ navigation }) {
  let theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: ThemeColors[theme].bodyContent }}>
      <Button title="Open on top" onPress={() => navigation.navigate('Top')} />
    </View>
  );
}

class Fake extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title'),
  });

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Themed.Text style={{ fontSize: 20 }}>
          {this.props.navigation.getParam('title')}
        </Themed.Text>
      </View>
    );
  }
}

const Tab = createBottomTabNavigator({
  Home: { screen: Fake, params: { title: 'Home' } },
  Other: { screen: Fake, params: { title: 'Other' } },
});

const Drawer = createDrawerNavigator(
  {
    TabScreen: {
      screen: Tab,
    },
  },
  {
    contentComponent: props => <Menu {...props} />,
    navigationOptions: { title: 'Example' },
  }
);

const App = createStackNavigator({
  Drawer: { screen: Drawer },
  Top: { screen: Fake, params: { title: 'Top' } },
});

export default App;
