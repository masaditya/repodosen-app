import React from 'react';
import {Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';

const MenuIcon = style => <Icon {...style} name="menu-2-outline" />;

const NotifIcon = style => <Icon {...style} name="bell-outline" />;

const UserIcon = style => <Icon {...style} name="person-outline" />;

const MenuAction = props => <TopNavigationAction {...props} icon={MenuIcon} />;

const NotifAction = props => (
  <TopNavigationAction {...props} icon={NotifIcon} />
);

const UserAction = props => <TopNavigationAction {...props} icon={UserIcon} />;

export const Header = () => {
  const onMenuPress = () => {};

  const renderLeftControl = () => <MenuAction onPress={onMenuPress} />;

  const renderRightControls = () => [
    <NotifAction />,
    <UserAction style={{paddingHorizontal: 20}} />,
  ];

  return (
    <TopNavigation
      leftControl={renderLeftControl()}
      rightControls={renderRightControls()}
      style={{paddingVertical: 30, paddingHorizontal: 30}}
    />
  );
};
