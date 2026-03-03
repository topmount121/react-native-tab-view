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
const ITEM_HEIGHT = 76;

const generateProducts = (category, badgeColor) =>
  Array.from({length: 500}, (_, i) => ({
    id: String(i),
    name: `${category} Product ${i + 1}`,
    price: `$${((i + 1) * 3.99).toFixed(2)}`,
    stock: `${(i % 50) + 1} in stock`,
    badgeColor,
  }));

// ─── Item row ─────────────────────────────────────────────────────────────────
const ProductRow = React.memo(({item}) => (
  <View style={styles.row}>
    <View style={[styles.badge, {backgroundColor: item.badgeColor}]}>
      <Text style={styles.badgeText}>{item.name.slice(0, 1)}</Text>
    </View>
    <View style={styles.rowBody}>
      <Text style={styles.rowName}  numberOfLines={1}>{item.name}</Text>
      <Text style={styles.rowStock} numberOfLines={1}>{item.stock}</Text>
    </View>
    <Text style={styles.rowPrice}>{item.price}</Text>
  </View>
));

const keyExtractor = item => item.id;
const getItemLayout  = (_, index) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
});

// ─── Scene ────────────────────────────────────────────────────────────────────
const Scene = React.memo(({category, badgeColor}) => {
  const [data,  setData]  = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Defer data generation until the swipe animation has fully settled
    const task = InteractionManager.runAfterInteractions(() => {
      setData(generateProducts(category, badgeColor));
      setReady(true);
    });
    return () => task.cancel();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!ready) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={badgeColor} />
        <Text style={[styles.loaderText, {color: badgeColor}]}>
          Loading {category}…
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={({item}) => <ProductRow item={item} />}
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
const TabOne   = () => <Scene category="Electronics" badgeColor="#ff4081" />;
const TabTwo   = () => <Scene category="Clothing"    badgeColor="#673ab7" />;
const TabThree = () => <Scene category="Furniture"   badgeColor="#2196F3" />;

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
    scrollEnabled                 // scrollable when there are many tabs
    style={styles.tabBar}
    indicatorStyle={styles.indicator}
    labelStyle={styles.label}
    tabStyle={styles.tabStyle}
    pressColor="#ff408140"
    pressOpacity={0.6}
  />
);

const LazyPlaceholder = () => (
  <View style={styles.loader}>
    <ActivityIndicator size="large" color="#ff4081" />
  </View>
);

// ─── TabView ──────────────────────────────────────────────────────────────────
export default function TabView3() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'one',   title: 'Electronics'},
    {key: 'two',   title: 'Clothing'},
    {key: 'three', title: 'Furniture'},
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
  tabBar:    {backgroundColor: '#37474f', elevation: 0, shadowOpacity: 0},
  indicator: {backgroundColor: '#ff4081', height: 3, borderRadius: 2},
  label:     {color: 'white', fontWeight: 'bold', fontSize: 14},
  tabStyle:  {width: 130},

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
  badge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  badgeText: {color: 'white', fontWeight: 'bold', fontSize: 18},
  rowBody:   {flex: 1},
  rowName:   {fontSize: 15, fontWeight: '600', color: '#111', marginBottom: 3},
  rowStock:  {fontSize: 12, color: '#888'},
  rowPrice:  {fontSize: 15, fontWeight: '700', color: '#333', marginLeft: 8},
});
