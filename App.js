/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow strict-local
 */

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

// Import your tabview demos
// import TabView1 from './tabview1';
import TabView2 from './tabview2';
import TabView3 from './tabview3';

const Colors = {
  darker: '#000',
  light: '#666',
  lighter: '#f5f5f5',
  black: '#000',
  white: '#fff',
};

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'tab1', 'tab2', 'tab3'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'tab1':
        return <TabView2 style={styles.fullScreen} />;
      case 'tab2':
        return <TabView2 style={styles.fullScreen} />;
      case 'tab3':
        return <TabView3 style={styles.fullScreen} />;
      default:
        return renderHomePage();
    }
  };

  const renderHomePage = () => (
    <>
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <Section title="TabView Demos">
          Select a tab view library demo to try:
        </Section>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.demoButton, {backgroundColor: '#ff4081'}]}
            onPress={() => setCurrentPage('tab1')}>
            <Text style={styles.buttonText}>TabView 1 (react-native-tab-view)</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.demoButton, {backgroundColor: '#673ab7'}]}
            onPress={() => setCurrentPage('tab2')}>
            <Text style={styles.buttonText}>TabView 2 (Material Top Tabs)</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.demoButton, {backgroundColor: '#2196F3'}]}
            onPress={() => setCurrentPage('tab3')}>
            <Text style={styles.buttonText}>TabView 3 (Scrollable TabView)</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.demoButton, {backgroundColor: 'gray'}]}
            onPress={() => setCurrentPage('home')}>
            <Text style={styles.buttonText}>← Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {renderPage()}
      </ScrollView>
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
