import React, {useState} from 'react';
import {View, Dimensions, StyleSheet, Text} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';

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
    />
  );
}

const styles = StyleSheet.create({
  scene: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {color: 'white', fontSize: 20, fontWeight: 'bold'},
});
