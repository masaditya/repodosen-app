import React from 'react';
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
  Avatar,
} from '@ui-kitten/components';
import {DrawerActions, useNavigation} from '@react-navigation/native';

const MenuIcon = style => <Icon {...style} name="menu-2-outline" />;

const NotifIcon = style => <Icon {...style} name="bell-outline" />;

const UserIcon = style => (
  <Avatar
    size="large"
    source={{
      uri: 'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png',
    }}></Avatar>
);

const MenuAction = props => <TopNavigationAction {...props} icon={MenuIcon} />;

const NotifAction = props => (
  <TopNavigationAction {...props} icon={NotifIcon} />
);

const UserAction = props => <TopNavigationAction {...props} icon={UserIcon} />;

export const Header = () => {
  const navigation = useNavigation();

  const onMenuPress = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const renderLeftControl = () => <MenuAction onPress={onMenuPress} />;

  const renderRightControls = () => [
    <UserAction onPress={() => navigation.navigate('Profile')} />,
  ];

  return (
    <TopNavigation
      leftControl={renderLeftControl()}
      rightControls={renderRightControls()}
      style={{paddingVertical: 30, paddingHorizontal: 30}}
    />
  );
};
