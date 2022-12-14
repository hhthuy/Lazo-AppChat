import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {Platform, StatusBar, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import PushNotification from 'react-native-push-notification';
import {useDispatch, useSelector} from 'react-redux';
import {setModalVisible} from '../redux/globalSlice';
import AddNewFriendScreen from '../screens/AddNewFriendScreen';
import ConversationOptionsScreen from '../screens/ConversationOptionsScreen';
import ConversationSearchScreen from '../screens/ConversationSearchScreen';
import FileScreen from '../screens/FileScreen';
import ForwardMessageScreen from '../screens/ForwardMessageScreen';
import FriendDetailsScreen from '../screens/FriendDetailsScreen';
import FriendRequestScreen from '../screens/FriendRequestScreen';
import FriendSearchScreen from '../screens/FriendSearchScreen';
import MemberScreen from '../screens/MemberScreen';
import MessageScreen from '../screens/MessageScreen';
import PhonebookScreen from '../screens/PhonebookScreen';
import VoteDetailScreen from '../screens/VoteDetailScreen';
import {globalScreenOptions} from '../styles';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

const MainStackNavigator = ({navigation}) => {
  const dispatch = useDispatch();
  const {modalVisible} = useSelector(state => state.global);

  // const headerRightButton = () => (
  //   <View
  //     style={{
  //       flexDirection: 'row',
  //       justifyContent: 'space-between',
  //       marginRight: 20,
  //     }}>
  //     <TouchableOpacity
  //       onPress={() => dispatch(setModalVisible(!modalVisible))}>
  //       <IconAntDesign name="plus" size={22} color="white" />
  //     </TouchableOpacity>
  //   </View>
  // );
  const headerRightButton = (
    navigation,
    isMessageScreen,
    iconName,
    iconType,
  ) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 20,
      }}>
      <TouchableOpacity
        onPress={() =>
          isMessageScreen
            ? dispatch(setModalVisible(!modalVisible))
            : navigation.navigate('Th??m b???n')
        }>
        <Icon name={iconName} type={iconType} size={22} color="white" />
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    createChannels();
  }, []);

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'new-message',
      channelName: 'Tin nh???n m???i',
    });
  };

  return (
    <>
      <LinearGradient
        // Background Linear Gradient
        // colors={['#257afe', '#00bafa']}
        colors={['#a64bf4', '#cf9ff9']}
        style={{height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight}}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle="light-content"
        />
      </LinearGradient>
      <NavigationContainer>
        <Stack.Navigator screenOptions={globalScreenOptions}>
          <Stack.Screen
            name="Trang ch???"
            component={TabNavigator}
            options={({navigation, route}) => {
              let title = 'Tin nh???n';
              let headerRight = () =>
                headerRightButton(navigation, true, 'plus', 'antdesign');
              const state = navigation.getState()?.routes[0]?.state;
              if (state) {
                const routeNames = state.routeNames;
                const index = state.index;
                const routeName = routeNames[index];

                switch (routeName) {
                  case 'Tin nh???n': {
                    title = 'Tin nh???n';

                    break;
                  }
                  case 'B???n b??': {
                    title = 'B???n b??';
                    headerRight = () =>
                      headerRightButton(
                        navigation,
                        false,
                        'person-add-outline',
                        'ionicon',
                      );
                    break;
                  }
                  case 'C?? nh??n': {
                    title = 'C?? nh??n';
                    headerRight = undefined;
                    break;
                  }
                  default:
                    title = 'Tin nh???n';
                    headerRight = () =>
                      headerRightButton(navigation, true, 'plus', 'antdesign');
                    break;
                }
              }
              return {
                title,
                headerRight,
              };
            }}>
            {/* {props => (
              <TabNavigator
                {...props}
                socket={socket}
                navigation={navigation}
              />
            )} */}
          </Stack.Screen>
          <Stack.Screen name="Nh???n tin" component={MessageScreen} />
          <Stack.Screen name="T??y ch???n" component={ConversationOptionsScreen} />
          <Stack.Screen
            name="L???i m???i k???t b???n"
            component={FriendRequestScreen}
          />
          <Stack.Screen name="???nh, video, file ???? g???i" component={FileScreen} />
          <Stack.Screen name="T??m ki???m b???n b??" component={FriendSearchScreen} />
          <Stack.Screen name="T??m ki???m" component={ConversationSearchScreen} />
          <Stack.Screen name="Th??m b???n" component={AddNewFriendScreen} />
          <Stack.Screen
            name="Chi ti???t b???n b??"
            component={FriendDetailsScreen}
          />
          <Stack.Screen
            name="Chi ti???t b??nh ch???n"
            component={VoteDetailScreen}
          />
          <Stack.Screen name="B???n t??? danh b??? m??y" component={PhonebookScreen} />
          <Stack.Screen name="Th??nh vi??n" component={MemberScreen} />
          <Stack.Screen name="Chia s???" component={ForwardMessageScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default MainStackNavigator;
