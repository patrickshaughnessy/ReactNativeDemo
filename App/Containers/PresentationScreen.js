import React, {PropTypes} from 'react'
import {
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'

import LookupResults from './LookupResults'

import Actions from '../Actions/Creators'

import styles from './Styles/PresentationScreenStyle'

class PresentationScreen extends React.Component {

  static propTypes = {
    componentExamples: PropTypes.func,
    usageExamples: PropTypes.func,
    apiTesting: PropTypes.func,
    theme: PropTypes.func,
    deviceInfo: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {
      input: 'NFLX'
    }
  }

  _handleSubmit = () => {
    const { requestLookup } = this.props
    const { input } = this.state
    requestLookup(input)
    this.setState({ input: '' })
  }

  render () {
    const { input } = this.state
    const { fetching } = this.props
    return (
      <View style={styles.mainContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(input) => this.setState({ input })}
            value={input}
          />
          <TouchableOpacity style={styles.button} onPress={this._handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.container}>
          {fetching ? <ActivityIndicator size='large' style={styles.loading} /> : <LookupResults />}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.lookup.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestLookup: (input) => dispatch(Actions.requestLookup(input))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationScreen)
