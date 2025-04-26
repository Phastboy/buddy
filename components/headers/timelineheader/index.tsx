import React from 'react';
import { View } from 'react-native';
import ScrollAwareHeader from '../scrollAwareHeader';
import { DrawerOpener, Logo, NotificationIcon } from './children';
import { TimelineHeaderProps } from './types';
import { styles } from './styles';

/**
 * TimelineHeader using ScrollAwareHeader under the hood
 */
const TimelineHeader = ({
  scrollY,
  isScrollingUp,
  headerHeight,
}: TimelineHeaderProps) => {
  return (
    <ScrollAwareHeader
      scrollY={scrollY}
      isScrollingUp={isScrollingUp}
      height={headerHeight}
      containerStyle={styles.container}
      childrenContainerStyle={styles.childrenContainer}
    >
      <View style={styles.left}>
        <DrawerOpener />
      </View>

      <View style={styles.center}>
        <Logo />
      </View>

      <View style={styles.right}>
        <NotificationIcon />
      </View>
    </ScrollAwareHeader>
  );
};

export default TimelineHeader;
