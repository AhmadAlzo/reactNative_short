source={
    "View":{
        "Type":2,
        "parameter":"",
        "methode":""
    },
    "ActivityIndicator":{
        "Type":1,
        "parameter":"size='large' color='#00ff00'",
        "methode":""
    },
    "FlatList":{
        "Type":1,
        "parameter":"""data={DATA} renderItem={({item}) => <Item title={item.title} />} keyExtractor={item => item.id} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}""",
        "methode":"""
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);"""
    },
    "SectionList":{
        "Type":1,
        "parameter":"""data={DATA} renderItem={({item}) => <Item title={item.title} />} keyExtractor={item => item.id} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}""",
        "methode":"""
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);"""
    },

    "Image":{
        "Type":1,
        "parameter":"""source={{uri:'https://reactnative.dev/img/tiny_logo.png'}}""",
        "methode":""
    },
     "ImageBackground":{
        "Type":2,
        "parameter":"source={{uri:'https://reactnative.dev/img/tiny_logo.png'}} resizeMode='cover' ",
        "methode":""
    },
    "ScrollView":{
        "Type":2,
        "parameter":"refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}",
        "methode":"""
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);"""
    },
    "Text":{
        "Type":2,
        "parameter":"",
        "methode":""
    },
    "Switch":{
        "Type":1,
        "parameter":"""   trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}""",
        "methode":"""
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);"""
    },
}