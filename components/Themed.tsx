import { useThemeColors } from '@/utils/useThemeColors';
import { Text as DefaultText, View as DefaultView } from 'react-native';

/**
 * Base theme properties for themed components
 */
interface ThemeProps {
  backgroundColor?: string;
  color?: string;
}

/**
 * Props for the Themed Text component
 */
export type TextProps = ThemeProps & DefaultText['props'];

/**
 * Props for the Themed View component
 */
export type ViewProps = ThemeProps & DefaultView['props'];

/**
 * A themed Text component that automatically uses the current theme's text color
 * @component
 * @param {TextProps} props - Text component props
 * @returns {React.ReactElement} A text element with theme colors applied
 * @example
 * <Themed.Text style={styles.title}>Hello World</Themed.Text>
 */
export function Text(props: TextProps): React.ReactElement {
  const { style, color: colorOverride, ...otherProps } = props;
  const colors = useThemeColors();
  const { text } = colors;

  return (
    <DefaultText
      style={[{ color: colorOverride || text }, style]}
      {...otherProps}
    />
  );
}

/**
 * A themed View component that automatically uses the current theme's background color
 * @component
 * @param {ViewProps} props - View component props
 * @returns {React.ReactElement} A view element with theme colors applied
 * @example
 * <Themed.View style={styles.container}>
 *   <Text>Content</Text>
 * </Themed.View>
 */
export function View(props: ViewProps): React.ReactElement {
  const { style, backgroundColor: bgOverride, ...otherProps } = props;
  const { background } = useThemeColors();

  return (
    <DefaultView
      style={[{ backgroundColor: bgOverride || background }, style]}
      {...otherProps}
    />
  );
}
