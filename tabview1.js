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
const ITEM_HEIGHT = 72;

const generateArticles = (accentColor, section) =>
  Array.from({length: 500}, (_, i) => ({
    id: String(i),
    title: `${section} — Article ${i + 1}`,
    subtitle: `Published on day ${i + 1} · 3 min read · Category ${(i % 5) + 1}`,
    accentColor,
  }));

// ─── Item row (memoised so FlatList never re-renders unchanged rows) ──────────
const ArticleRow = React.memo(({item}) => (
  <View style={styles.row}>
    <View style={[styles.rowAccent, {backgroundColor: item.accentColor}]} />
    <View style={styles.rowBody}>
      <Text style={styles.rowTitle} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.rowSub}   numberOfLines={1}>{item.subtitle}</Text>
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
// InteractionManager defers data generation until the swipe animation is done,
// so the gesture thread is never starved by JS work.
const Scene = React.memo(({accentColor, section}) => {
  const [data,  setData]  = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      setData(generateArticles(accentColor, section));
      setReady(true);
    });
    return () => task.cancel();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!ready) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={accentColor} />
        <Text style={[styles.loaderText, {color: accentColor}]}>
          Loading {section}…
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={({item}) => <ArticleRow item={item} />}
      // O(1) scroll-position lookup — essential for big lists
      getItemLayout={getItemLayout}
      // Only render 15 items on first paint
      initialNumToRender={15}
      // Render 15 items per JS batch
      maxToRenderPerBatch={15}
      // Keep 7 screen-heights of items in memory (3 above + viewport + 3 below)
      windowSize={7}
      // Batch interval in ms — lower = more responsive scroll, higher = less JS work
      updateCellsBatchingPeriod={30}
      // Unmount off-screen views from the native layer (Android memory saving)
      removeClippedSubviews
    />
  );
});

// ─── Route components ─────────────────────────────────────────────────────────
const FirstRoute  = () => <Scene accentColor="#ff4081" section="Top Stories" />;
const SecondRoute = () => <Scene accentColor="#673ab7" section="Latest News"  />;

const renderScene = ({route}) => {
  switch (route.key) {
    case 'first':  return <FirstRoute />;
    case 'second': return <SecondRoute />;
    default:       return null;
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

// Show while the lazy scene hasn't mounted yet
const LazyPlaceholder = () => (
  <View style={styles.loader}>
    <ActivityIndicator size="large" color="#ff4081" />
  </View>
);

// ─── TabView ──────────────────────────────────────────────────────────────────
export default function TabView1() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first',  title: 'Top Stories'},
    {key: 'second', title: 'Latest News'},
  ]);
  const layout = Dimensions.get('window');

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={renderTabBar}
      // lazy={true}: scenes mount only when first visited →
      // swipe animation never blocked by off-screen renders
      lazy
      renderLazyPlaceholder={() => <LazyPlaceholder />}
    />
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Tab bar
  tabBar:    {backgroundColor: '#ff4081', elevation: 0, shadowOpacity: 0},
  indicator: {backgroundColor: 'white', height: 3, borderRadius: 2},
  label:     {color: 'white', fontWeight: 'bold', fontSize: 14},

  // Loading state
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loaderText: {fontSize: 14, fontWeight: '600'},

  // List row
  row: {
    flexDirection: 'row',
    height: ITEM_HEIGHT,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  rowAccent: {width: 4, height: '60%', borderRadius: 2, marginHorizontal: 12},
  rowBody:   {flex: 1, paddingRight: 12},
  rowTitle:  {fontSize: 15, fontWeight: '600', color: '#111', marginBottom: 4},
  rowSub:    {fontSize: 12, color: '#888'},
});
