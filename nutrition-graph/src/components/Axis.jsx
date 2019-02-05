import React, { Component } from 'react';
import * as d3 from 'd3';

export default class Axis extends Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    const node  = this.refs.axis;
    const { axis, customAxis } = this.props;
    d3.select(node).attr("class", this.props.className).call(customAxis || axis);
  }

  render() {
    return <g className="axis" ref="axis" transform={this.props.translate}></g>
  }
}
