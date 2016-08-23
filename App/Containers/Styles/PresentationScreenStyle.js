import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  logo: {
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  container: {
    flex: 1
  },
  inputContainer: {
    // flex: 1,
    flexDirection: 'row',
    height: 50,
    width: Metrics.screenWidth - Metrics.marginHorizontal,
    marginTop: Metrics.section,
    alignSelf: 'center'
  },
  input: {
    flex: 4,
    padding: 5,
    borderColor: 'black',
    borderWidth: 3
  },
  button: {
    borderRadius: 5,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: Colors.fire,
    justifyContent: 'center'
  },
  buttonText: {
    color: Colors.snow,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin
  },
  loading: {
    marginTop: Metrics.doubleBaseMargin
  }
})
