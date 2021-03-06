import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.snow
  },
  item: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1
  },
  text: {
    fontSize: 18
  },
  loading: {
    marginTop: Metrics.doubleBaseMargin
  }
})
