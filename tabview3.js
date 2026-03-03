import React, {useState} from 'react';
import {View, Dimensions, StyleSheet, Text} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';

// react-native-scrollable-tab-view needs @react-native-community/viewpager
// (a native module not installed). Using react-native-tab-view with
// scrollEnabled instead — pure JS, no native linking required.

const COLORS = ['#ff4081', '#673ab7', '#2196F3'];

const TabOne = () => (
  <View style={[styles.tab, {backgroundColor: COLORS[0]}]}>
    <Text style={styles.text}>Scrollable Tab 1</Text>
  </View>
);
const TabTwo = () => (
  <View style={[styles.tab, {backgroundColor: COLORS[1]}]}>
    <Text style={styles.text}>Scrollable Tab 2</Text>
  </View>
);
const TabThree = () => (
  <View style={[styles.tab, {backgroundColor: COLORS[2]}]}>
    <Text style={styles.text}>Scrollable Tab 3</Text>
  </View>
);

const renderScene = ({route}) => {
  switch (route.key) {
    case 'one':   return <TabOne />;
    case 'two':   return <TabTwo />;
    case 'three': return <TabThree />;
    default:      return null;
  }
};

const renderTabBar = props => (
  <TabBar
    {...props}
    scrollEnabled
    style={{backgroundColor: '#37474f'}}
    indicatorStyle={{backgroundColor: '#ff4081'}}
    labelStyle={{color: 'white', fontWeight: 'bold'}}
    tabStyle={{width: 120}}
  />
);

export default function TabView3() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'one',   title: 'Tab 1'},
    {key: 'two',   title: 'Tab 2'},
    {key: 'three', title: 'Tab 3'},
  ]);
  const layout = Dimensions.get('window');

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={renderTabBar}
    />
  );
}

const styles = StyleSheet.create({
  tab: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {color: 'white', fontSize: 20, fontWeight: 'bold'},
});
