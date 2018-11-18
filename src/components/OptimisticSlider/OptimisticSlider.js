/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'rc-slider'
import { lockScrolling } from 'store/modules/ui'
import './OptimisticSlider.css'
// depends on styles/global/rc-slider

export default class OptimisticSlider extends React.Component {
  static propTypes = {
    handle: PropTypes.func.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  state = {
    val: this.props.value,
    isDragging: false,
    isStable: true,
  }

  componentDidUpdate (prevProps) {
    if (!this.state.isStable && this.state.val === this.props.value) {
      this.setState({ isStable: true })
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (!nextState.isDragging && !nextState.isStable && nextProps.value !== nextState.val) {
      return false
    }

    return true
  }

  render () {
    return (
    <>
      <Slider
        {...this.props}
        value={this.state.isDragging ? this.state.val : this.props.value}
        onChange={this.handleChange}
        onBeforeChange={this.handleBeforeChange}
        onAfterChange={this.handleAfterChange}
      />
    </>
    )
  }

  handleChange = val => {
    this.setState({ val }, () => {
      this.props.onChange(val)
    })
  }

  handleBeforeChange = () => {
    lockScrolling(true)

    this.setState({ isDragging: true })
  }

  handleAfterChange = val => {
    lockScrolling(false)

    this.setState({
      isDragging: false,
      // @todo add timeout (value could have been changed by another user)
      isStable: val === this.props.value,
    })
  }
}