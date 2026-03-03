import React, {useState} from 'react';
import {View, Dimensions, StyleSheet, Text} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';

function TabOne() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Material Tab 1</Text>
    </View>
  );
}
function TabTwo() {
  return (
    <View style={[styles.container, {backgroundColor: '#673ab7'}]}>
      <Text style={styles.text}>Material Tab 2</Text>
    </View>
  );
}

const renderScene = ({route}) => {
  switch (route.key) {
    case 'one':
      return <TabOne />;
    case 'two':
      return <TabTwo />;
    default:
      return null;
  }
};

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

export default function TabView2() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'one', title: 'One'},
    {key: 'two', title: 'Two'},
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff4081',
  },
  text: {color: 'white', fontSize: 20, fontWeight: 'bold'},
  tabBar: {
    backgroundColor: '#6200ee',
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
