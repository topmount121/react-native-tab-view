import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

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

export default function TabView2() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="One" component={TabOne} />
      <Tab.Screen name="Two" component={TabTwo} />
    </Tab.Navigator>
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
