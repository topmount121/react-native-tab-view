import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';

import TabView1 from './tabview1';
import TabView2 from './tabview2';
import TabView3 from './tabview3';

const Colors = {
  darker: '#000',
  light: '#666',
  lighter: '#f5f5f5',
  black: '#000',
  white: '#fff',
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentPage, setCurrentPage] = useState('home');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  // Tab views need flex:1 and must NOT be inside a ScrollView
  const renderTabView = () => {
    let TabComponent = null;
    switch (currentPage) {
      case 'tab1':
        TabComponent = TabView1;
        break;
      case 'tab2':
        TabComponent = TabView2;
        break;
      case 'tab3':
        TabComponent = TabView3;
        break;
    }
    return (
      <View style={styles.fullScreen}>
        <TabComponent />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setCurrentPage('home')}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderHomePage = () => (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}>
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <View style={styles.sectionContainer}>
          <Text
            style={[
              styles.sectionTitle,
              {color: isDarkMode ? Colors.white : Colors.black},
            ]}>
            TabView Demos
          </Text>
          <Text
            style={[
              styles.sectionDescription,
              {color: isDarkMode ? Colors.light : Colors.darker},
            ]}>
            Select a tab view library demo to try:
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.demoButton, {backgroundColor: '#ff4081'}]}
            onPress={() => setCurrentPage('tab1')}>
            <Text style={styles.buttonText}>TabView 1 (react-native-tab-view)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.demoButton, {backgroundColor: '#673ab7'}]}
            onPress={() => setCurrentPage('tab2')}>
            <Text style={styles.buttonText}>TabView 2 (Material Style)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.demoButton, {backgroundColor: '#2196F3'}]}
            onPress={() => setCurrentPage('tab3')}>
            <Text style={styles.buttonText}>TabView 3 (Scrollable TabView)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {currentPage === 'home' ? renderHomePage() : renderTabView()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  demoButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default App;
