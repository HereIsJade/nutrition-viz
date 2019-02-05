import React from 'react';
import Axis from './Axis';
import * as d3 from 'd3';
import '../styles/XYAxis.scss';

export default function XYAxis(props) {
  const {height, width, padding, ranges} = props;

  const threshold = d3.scaleThreshold()
    .domain(ranges.slice(1).map(d => d.max))
    .range(ranges.slice(1).map(d => d.interpretation))

  // const xSettings = {
  //   translate: `translate(${-padding}, ${height-padding})`,
  //   scale: props.xScale,
  //   axis: d3.axisBottom(props.xScale).tickValues([])
  // };
  const ySettings = {
    scale: props.yScale,
    className: 'y-axis',
    axis: d3.axisLeft(props.yScale).tickValues(threshold.domain())
        .tickFormat('')
        // .tickFormat(d => threshold(d))
  };

  const customYAxis = (g) => {
    const selection = g.selection ? g.selection() : g;
    g.call(ySettings.axis);
    selection.selectAll('.tick line').attr('x1',-5).attr('x2', width);
  }

  const getTextClassName = (interpretation) => {
    const { selectedDatum } = props;
    return `y-axis-text ${threshold(selectedDatum.value) === interpretation && `active`}`
  }

  const renderYAxisText = () => {
    const { yScale } = props;

    return ranges.slice(1).map(d =>
      <text
        x="0"
        y={yScale(d.max)}
        className={getTextClassName(d.interpretation)}
        key={d.interpretation}
      >
        {d.interpretation}
      </text>
    )
  }

  return <g className="xy-axis">
    {/* <Axis {...xSettings}  /> */}
    <Axis {...ySettings} customAxis={customYAxis}/>
    <line
      x1="0"
      x2="100%"
      y={height-padding}
      y1={height-padding}
      y2={height-padding}
      stroke="black"
    />
    {renderYAxisText()}
  </g>
}

