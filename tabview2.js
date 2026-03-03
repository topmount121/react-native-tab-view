import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  InteractionManager,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';

// ─── Mock data ────────────────────────────────────────────────────────────────
const ITEM_HEIGHT = 68;

const AVATARS = ['🧑', '👩', '👨', '🧔', '👩‍💼', '👨‍💼', '🧑‍💻', '👩‍🔬'];

const generateContacts = (department) =>
  Array.from({length: 500}, (_, i) => ({
    id: String(i),
    avatar: AVATARS[i % AVATARS.length],
    name: `Contact ${i + 1}`,
    role: `${department} · Level ${(i % 4) + 1}`,
  }));

// ─── Item row ─────────────────────────────────────────────────────────────────
const ContactRow = React.memo(({item}) => (
  <View style={styles.row}>
    <Text style={styles.avatar}>{item.avatar}</Text>
    <View style={styles.rowBody}>
      <Text style={styles.rowName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.rowRole} numberOfLines={1}>{item.role}</Text>
    </View>
  </View>
));

const keyExtractor = item => item.id;
const getItemLayout = (_, index) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
});

// ─── Scene ────────────────────────────────────────────────────────────────────
const Scene = React.memo(({department, loaderColor}) => {
  const [data,  setData]  = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Wait for swipe animation to finish before loading data
    const task = InteractionManager.runAfterInteractions(() => {
      setData(generateContacts(department));
      setReady(true);
    });
    return () => task.cancel();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!ready) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={loaderColor} />
        <Text style={[styles.loaderText, {color: loaderColor}]}>
          Loading {department}…
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={({item}) => <ContactRow item={item} />}
      getItemLayout={getItemLayout}
      initialNumToRender={15}
      maxToRenderPerBatch={15}
      windowSize={7}
      updateCellsBatchingPeriod={30}
      removeClippedSubviews
    />
  );
});

// ─── Route components ─────────────────────────────────────────────────────────
const TabOne = () => <Scene department="Engineering" loaderColor="#6200ee" />;
const TabTwo = () => <Scene department="Design"      loaderColor="#03dac6" />;

const renderScene = ({route}) => {
  switch (route.key) {
    case 'one': return <TabOne />;
    case 'two': return <TabTwo />;
    default:    return null;
  }
};

const renderTabBar = props => (
  <TabBar
    {...props}
    style={styles.tabBar}
    indicatorStyle={styles.indicator}
    labelStyle={styles.label}
    pressColor="#ffffff40"
    pressOpacity={0.6}
  />
);

const LazyPlaceholder = () => (
  <View style={styles.loader}>
    <ActivityIndicator size="large" color="#6200ee" />
  </View>
);

// ─── TabView ──────────────────────────────────────────────────────────────────
export default function TabView2() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'one', title: 'Engineering'},
    {key: 'two', title: 'Design'},
  ]);
  const layout = Dimensions.get('window');

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={renderTabBar}
      lazy
      renderLazyPlaceholder={() => <LazyPlaceholder />}
    />
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  tabBar:    {backgroundColor: '#6200ee', elevation: 0, shadowOpacity: 0},
  indicator: {backgroundColor: '#03dac6', height: 3, borderRadius: 2},
  label:     {color: 'white', fontWeight: 'bold', fontSize: 14},

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {fontSize: 14, fontWeight: '600', marginTop: 12},

  row: {
    flexDirection: 'row',
    height: ITEM_HEIGHT,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  avatar:  {fontSize: 28, marginRight: 14},
  rowBody: {flex: 1},
  rowName: {fontSize: 15, fontWeight: '600', color: '#111', marginBottom: 3},
  rowRole: {fontSize: 12, color: '#888'},
});
