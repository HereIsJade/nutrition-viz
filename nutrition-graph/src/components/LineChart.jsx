import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import DataCircles from './DataCircles';
import XYAxis from './XYAxis';
import GradientLine from './GradientLine';

export default class LineChart extends Component {
  state = {
    selectedDatum: {}
  }

  /**
   * Generate a function to scale X coords from visit data
   */
  xScale = () => {
    const { data, padding, width } = this.props;
    return d3.scaleTime()
      .domain(d3.extent(data, datum => datum.date))
      .range([padding*2, width-padding/2]);
  };

  /**
   * Generate a function to scale Y coords from ranges data
   */
  yScale = () => {
      const { ranges, height, padding } = this.props;
      return d3.scaleLinear()
        .domain([d3.min(ranges, d => d.min), d3.max(ranges, d => d.max)])
        .range([height - padding, padding]);
    };

  updateSelectedDatum = (index) => this.setState({ selectedDatum: this.props.data[index] });
  // clearSelectedDatum = () => this.setState({ selectedDatum: {} });

  render() {
    const { height, width } = this.props;
    const { selectedDatum } = this.state;
    const scales = { xScale: this.xScale(), yScale: this.yScale() };

    return (
      <div>
        <svg width={width} height={height}>
          <XYAxis
            {...scales}
            {...this.props}
            selectedDatum={selectedDatum}
          />
          <GradientLine
            {...scales} 
            {...this.props} 
          />
          <DataCircles
            {...scales}
            {...this.props} 
            onCircleMouseOver={this.updateSelectedDatum}
            // onCircleMouseOut={this.clearSelectedDatum}
            selectedDatum={selectedDatum}
          />
        </svg>
      </div>
    )
  }
}

LineChart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  padding: PropTypes.number,
  data: PropTypes.array.isRequired, /** data array for rendering data points */
  ranges: PropTypes.array.isRequired, /** data array for rendering y-axis */
};

LineChart.defaultProps = {
  padding: 0
};
