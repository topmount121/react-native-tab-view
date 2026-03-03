import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ScrollableTabView, DefaultTabBar} from 'react-native-scrollable-tab-view';

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

export default function TabView3() {
  return (
    <ScrollableTabView
      renderTabBar={() => <DefaultTabBar />}
      tabBarActiveTextColor="white"
      tabBarInactiveTextColor="gray"
      tabBarUnderlineStyle={{backgroundColor: 'white'}}>
      <TabOne tabLabel="Tab 1" />
      <TabTwo tabLabel="Tab 2" />
      <TabThree tabLabel="Tab 3" />
    </ScrollableTabView>
  );
}

const styles = StyleSheet.create({
  tab: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {color: 'white', fontSize: 20, fontWeight: 'bold'},
});
