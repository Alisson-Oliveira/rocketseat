import React, { Fragment } from 'react';
import { 
  TouchableOpacity, 
  TouchableOpacityProps, 
  Text, 
  ColorValue,
  ActivityIndicator
} from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import { styles } from './styles';

type Props = TouchableOpacityProps & {
  title: string,
  color: ColorValue,
  backgroundColor: ColorValue,
  icon?: React.ComponentProps<typeof AntDesign>['name']; 
  isLoading?: boolean
}

export function Button({ icon, title, color, backgroundColor, isLoading = false, ...rest }: Props) {
  return (
    <TouchableOpacity
      style={[ styles.button, { backgroundColor }]}
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}
    >
    {
      isLoading ? (
        <ActivityIndicator color={color} />
      ) : (
        <Fragment>
          <AntDesign name={icon} size={24} style={styles.icon} />
          <Text style={[ styles.title, { color }]}>
            { title }
          </Text>
        </Fragment>
      )
    }
    </TouchableOpacity>
  )
}