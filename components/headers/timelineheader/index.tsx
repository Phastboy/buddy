import React from 'react';
import { DrawerOpener, Logo, NotificationIcon } from './children';
import { styles } from './styles';
import { View } from '@/components/Themed';

/**
 * TimelineHeader using ScrollAwareHeader under the hood
 */
const TimelineHeader = () => {
  return (
    <View style={styles.childrenContainer}>
      <View style={styles.left}>
        <DrawerOpener />
      </View>

      <View style={styles.center}>
        <Logo />
      </View>

      <View style={styles.right}>
        <NotificationIcon />
      </View>
    </View>
  );
};

export default TimelineHeader;
