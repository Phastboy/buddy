import React from 'react';
import { styles } from './styles';
import { View } from '@/components/Themed';
import { BackButton, Title } from './children';

const NotificationHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <BackButton />
      </View>
      <View style={styles.titleContainer}>
        <Title />
      </View>
    </View>
  );
};

export default NotificationHeader;
