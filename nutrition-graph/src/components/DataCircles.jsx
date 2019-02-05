import React, { Component } from 'react';
import * as d3 from 'd3';
import '../styles/DataCircles.scss';

export default class DataCircles extends Component {
  renderDateText = (date) => {
    const { height, xScale, padding, selectedDatum } = this.props;

    const dateFormat = {
      year: 'numeric', month: 'short', day: 'numeric'
    }
    const [month, day, year] = new Date(date).toLocaleDateString('en-US', dateFormat)
      .replace(',', '').split(' ');

    const textConfig = {
      x: xScale(new Date(date)),
      y: height - padding + 30,
      className: `date-text ${selectedDatum.date === date && `selected`}`
    }
    return (
      <text
        {...textConfig}
      >
        <tspan x={textConfig.x} y={textConfig.y}>
          {`${month} ${day}`}
        </tspan>
        <tspan x={textConfig.x} y={textConfig.y+20}>
          {year}
        </tspan>
      </text>
    )
  }
  
  renderTooltip = () => {
    const { xScale, yScale, selectedDatum } = this.props;
    const width = 50;
    const height = 30;
    const rectConfig = {
      width,
      height,
      rx: 5,
      x: xScale(selectedDatum.date) - width/2,
      y: yScale(selectedDatum.value) - height*1.5,
    }
    
    return (
      <g className="tooltip">
        <rect
          {...rectConfig}
        />
        <polygon
          transform={`translate(${rectConfig.x + width/2 - 4}, ${rectConfig.y + height})`}
          points="0 0, 5 6, 10 0"
        />
        <text
          x={rectConfig.x + width/5 }
          y={rectConfig.y + height/1.5}
        >{selectedDatum.value}</text>
      </g>
    )
  }

  renderDataPoint = () => (coords, index) => {
    const { xScale, yScale, ranges, onCircleMouseOver, onCircleMouseOut, selectedDatum } = this.props;

    const circleRadius = 4; /** in pixel */
    const getCircleColor = d3.scaleThreshold()
      .domain(ranges.map(d => d.max))
      .range(ranges.map(d => d.color)); 

    return (
      <g key={index}>
        <circle
          cx={xScale(coords.date)}
          cy={yScale(coords.value).toString()}
          r={4}
          stroke={getCircleColor(coords.value)}
          onMouseOver={onCircleMouseOver.bind(this, index)}
          // onMouseOut={onCircleMouseOut}
        />
        <line
          className="dash-line"
          y1={yScale(d3.min(ranges, d => d.min)) -  circleRadius}
          y2={yScale(coords.value) + circleRadius}
          x1={xScale(coords.date)}
          x2={xScale(coords.date)}
        />
        {this.renderDateText(coords.date)}
        {selectedDatum.date && this.renderTooltip()}
      </g>
    );
  };
  
  render() {  
    return (
      <g className="data-points">
        { this.props.data.map(this.renderDataPoint()) }
      </g>
    )
  }
}
