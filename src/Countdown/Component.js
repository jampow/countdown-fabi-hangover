import React from 'react'
import PropTypes from 'prop-types'

class Countdown extends React.Component {
  state = {
    days: '0',
    hours: '00',
    minutes: '00',
    seconds: '00'
  }

  S = 1000
  M = this.S * 60
  H = this.M * 60
  D = this.H * 24

  componentWillMount = () => {
    this.timer = setInterval(this.updateCounter, 1000)
  }

  padZero = n => (n + '').padStart(2, '0')

  updateCounter = () => {
    const { S, M, H, D } = this
    const { target } = this.props

    const now = new Date().getTime()
    const dist = target.getTime() - now

    this.setState({
      days:    Math.floor(dist / D) + '',
      hours:   this.padZero( Math.floor((dist % D) / H) ),
      minutes: this.padZero( Math.floor((dist % H) / M) ),
      seconds: this.padZero( Math.floor((dist % M) / S) )
    })
  }

  render () {
    const { days, hours, minutes, seconds } = this.state
    const { children } = this.props
    return children({days, hours, minutes, seconds})
  }
}

Countdown.propTypes = {
  until: PropTypes.instanceOf(Date)
}

export default Countdown
