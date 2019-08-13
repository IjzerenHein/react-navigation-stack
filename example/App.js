import * as React from 'react';
import { Asset } from 'expo-asset';
import {
  FlatList,
  I18nManager,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  createAppContainer,
  SafeAreaView,
  ScrollView,
} from '@react-navigation/native';
import { ThemeContext, ThemeColors } from '@react-navigation/core';
import {
  Assets as StackAssets,
  createStackNavigator,
} from 'react-navigation-stack';
import { List, Divider } from 'react-native-paper';

import FullScreen from './src/FullScreen';
import SimpleStack from './src/SimpleStack';
import ImageStack from './src/ImageStack';
import TransparentStack from './src/TransparentStack';
import ModalStack from './src/ModalStack';
import LifecycleInteraction from './src/LifecycleInteraction';
import GestureInteraction from './src/GestureInteraction';
import SwitchWithStacks from './src/SwitchWithStacks';
import StackWithDrawer from './src/StackWithDrawer';
import HeaderPreset from './src/HeaderPreset';
import {
  HeaderBackgroundDefault,
  HeaderBackgroundTranslate,
  HeaderBackgroundFade,
} from './src/HeaderBackgrounds';

// Comment the following two lines to stop using react-native-screens
import { useScreens } from 'react-native-screens';

// Uncomment the following line to force RTL. Requires closing and re-opening
// your app after you first load it with this option enabled.
I18nManager.forceRTL(false);

const data = [
  { component: SimpleStack, title: 'Simple', routeName: 'SimpleStack' },
  { component: HeaderPreset, title: 'UIKit Preset', routeName: 'UIKit' },
  { component: ImageStack, title: 'Image', routeName: 'ImageStack' },
  { component: ModalStack, title: 'Modal', routeName: 'ModalStack' },
  { component: FullScreen, title: 'Full Screen', routeName: 'FullScreen' },
  {
    component: LifecycleInteraction,
    title: 'Lifecycle',
    routeName: 'LifecycleStack',
  },
  {
    component: TransparentStack,
    title: 'Transparent',
    routeName: 'TransparentStack',
  },
  {
    component: GestureInteraction,
    title: 'Gesture Interaction',
    routeName: 'GestureInteraction',
  },
  {
    component: SwitchWithStacks,
    title: 'Switch with Stacks',
    routeName: 'SwitchWithStacks',
  },
  {
    component: StackWithDrawer,
    title: 'Stack with drawer inside',
    routeName: 'StackWithDrawer',
  },
  {
    component: HeaderBackgroundDefault,
    title: 'Header background (default transition)',
    routeName: 'HeaderBackgroundDefault',
  },
  {
    component: HeaderBackgroundFade,
    title: 'Header background (fade transition)',
    routeName: 'HeaderBackgroundFade',
  },
  {
    component: HeaderBackgroundTranslate,
    title: 'Header background (translate transition)',
    routeName: 'HeaderBackgroundTranslate',
  },
];

// Cache images
Asset.loadAsync(StackAssets);

class Home extends React.Component {
  static contextType = ThemeContext;

  static navigationOptions = {
    title: 'Examples',
  };

  _renderItem = ({ item }) => (
    <List.Item
      title={item.title}
      onPress={() => this.props.navigation.navigate(item.routeName)}
      style={{ backgroundColor: ThemeColors[this.context].bodyContent }}
      titleStyle={{ color: ThemeColors[this.context].label }}
    />
  );

  _keyExtractor = item => item.routeName;

  render() {
    return (
      <>
        <FlatList
          ItemSeparatorComponent={() => (
            <Divider
              style={{
                backgroundColor: ThemeColors[this.context].bodyBorder,
              }}
            />
          )}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          renderScrollComponent={props => <SafeAreaScrollView {...props} />}
          data={data}
          style={{ backgroundColor: ThemeColors[this.context].body }}
        />
        <StatusBar
          barStyle={this.context === 'dark' ? 'light-content' : 'default'}
        />
      </>
    );
  }
}

class SafeAreaScrollView extends React.Component {
  render() {
    let { children, ...scrollViewProps } = this.props;
    return (
      <ScrollView {...scrollViewProps}>
        <SafeAreaView forceInset={{ top: 'never' }}>{children}</SafeAreaView>
      </ScrollView>
    );
  }
}

const Root = createStackNavigator(
  {
    Home: createStackNavigator({ Home }),
    ...data.reduce((acc, it) => {
      acc[it.routeName] = {
        screen: it.component,
        navigationOptions: {
          title: it.title,
        },
      };

      return acc;
    }, {}),
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

useScreens();
useScreens();
let AppContainer = createAppContainer(Root);
export default () => {
  let [theme, setTheme] = React.useState('light');

  return (
    <View style={{ flex: 1 }}>
      <AppContainer theme={theme} />
      <View style={{ position: 'absolute', bottom: 30, right: 30 }}>
        <TouchableOpacity
          onPress={() => {
            setTheme(theme === 'light' ? 'dark' : 'light');
          }}
        >
          <View
            style={{
              backgroundColor: ThemeColors[theme].bodyContent,
              borderRadius: 10,
              padding: 5,
              borderColor: ThemeColors[theme].bodyBorder,
              paddingHorizontal: 15,
              borderWidth: 1,
            }}
          >
            <Text style={{ fontSize: 15, color: ThemeColors[theme].label }}>
              Toggle theme
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Uncomment this to test immediate transitions
// import ImmediateTransition from './src/ImmediateTransition';
// Expo.registerRootComponent(ImmediateTransition);
