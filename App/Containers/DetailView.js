import React from 'react'
import {
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  RefreshControl
} from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Actions as NavigationActions } from 'react-native-router-flux'

// Styles
import styles from './Styles/DetailViewStyle'

class DetailView extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      refreshing: false
    }
  }

  _renderQuoteContent = () => {
    const quote = this.props.quote.asMutable()
    return Object.keys(quote).map(item => {
      return (
        <View style={styles.item}>
          <Text style={styles.text}>{item}: {quote[item]}</Text>
        </View>
      )
    })
  }

  _onRefresh = () => {
    const { requestQuote, symbol } = this.props
    const { refreshing } = this.state
    requestQuote(symbol)
    this.setState({ refreshing: !refreshing })
  }

  componentWillReceiveProps (nextProps) {
    const { refreshing } = this.state
    if (!nextProps.fetching && refreshing) {
      this.setState({ refreshing: !refreshing })
    }
  }

  render () {
    const { fetching } = this.props
    const { refreshing } = this.state
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        {(fetching && !refreshing) ? <ActivityIndicator size='large' style={styles.loading} /> : this._renderQuoteContent()}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    quote: state.quote.results,
    symbol: state.quote.symbol,
    fetching: state.quote.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestQuote: (symbol) => dispatch(Actions.requestQuote(symbol))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailView)
