import React, {useState} from 'react';
import {View, Dimensions, StyleSheet, Text} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';

const TabOne = () => (
  <View style={[styles.tab, {backgroundColor: '#ff4081'}]}>
    <Text style={styles.text}>Scrollable Tab 1</Text>
  </View>
);
const TabTwo = () => (
  <View style={[styles.tab, {backgroundColor: '#673ab7'}]}>
    <Text style={styles.text}>Scrollable Tab 2</Text>
  </View>
);
const TabThree = () => (
  <View style={[styles.tab, {backgroundColor: '#2196F3'}]}>
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
    scrollEnabled                        // tabs scroll horizontally
    style={styles.tabBar}
    indicatorStyle={styles.indicator}
    labelStyle={styles.label}
    tabStyle={styles.tabStyle}
    pressColor="#ff408140"   // instant ripple on Android
    pressOpacity={0.6}       // instant feedback on iOS
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
      lazy={false}           // pre-render all tabs — no blank flash on switch
      swipeEnabled={true}
    />
  );
}

const styles = StyleSheet.create({
  tab: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {color: 'white', fontSize: 20, fontWeight: 'bold'},
  tabBar: {
    backgroundColor: '#37474f',
    elevation: 0,
    shadowOpacity: 0,
  },
  indicator: {
    backgroundColor: '#ff4081',
    height: 3,
    borderRadius: 2,
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tabStyle: {
    width: 120,
  },
});
