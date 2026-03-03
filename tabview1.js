import React, {useState} from 'react';
import {View, Dimensions, StyleSheet, Text} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

const FirstRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#ff4081'}]}>
    <Text style={styles.text}>Tab 1 Content</Text>
  </View>
);
const SecondRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#673ab7'}]}>
    <Text style={styles.text}>Tab 2 Content</Text>
  </View>
);

const renderScene = SceneMap({first: FirstRoute, second: SecondRoute});

const renderTabBar = props => (
  <TabBar
    {...props}
    style={styles.tabBar}
    indicatorStyle={styles.indicator}
    labelStyle={styles.label}
    pressColor="#ffffff40"   // instant ripple on Android
    pressOpacity={0.6}       // instant feedback on iOS
  />
);

export default function TabView1() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
  ]);
  const layout = Dimensions.get('window');

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={renderTabBar}
      lazy={false}           // pre-render all tabs — no blank flash on switch
      swipeEnabled={true}
    />
  );
}

const styles = StyleSheet.create({
  scene: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {color: 'white', fontSize: 20, fontWeight: 'bold'},
  tabBar: {
    backgroundColor: '#ff4081',
    elevation: 0,
    shadowOpacity: 0,
  },
  indicator: {
    backgroundColor: 'white',
    height: 3,
    borderRadius: 2,
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
