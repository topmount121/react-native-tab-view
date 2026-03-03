import React, {useState} from 'react';
import {View, Dimensions, StyleSheet, Text} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';

// Rewritten to use react-native-tab-view directly.
// @react-navigation/material-top-tabs requires missing peer deps
// (@react-navigation/native, react-native-screens, react-native-safe-area-context)
// that are not installed, so we use TabBar from react-native-tab-view instead.

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
    style={{backgroundColor: '#6200ee'}}
    indicatorStyle={{backgroundColor: 'white'}}
    labelStyle={{color: 'white', fontWeight: 'bold'}}
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
});
