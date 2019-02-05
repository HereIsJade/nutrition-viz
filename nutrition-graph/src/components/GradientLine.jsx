import React from 'react';
import * as d3 from 'd3';
import '../styles/GradientLine.scss';

export default function GradientLine(props) {
  const { xScale, yScale, data, ranges } = props;

  // Create a d3 line generator and area generator applied with scales
  const lineGenerator = d3.line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.value));
  const areaGenerator = d3.area()
    .x(d => xScale(d.date))
    .y0(props.height-props.padding)
    .y1(d => yScale(d.value));

  // Create a line and area path of for data.
  const areaPath = areaGenerator(data);
  const linePath = lineGenerator(data);
  // const areaPath = areaGenerator(data);

  const yMin = d3.min(ranges, d => d.min);
  const yMax = d3.max(ranges, d => d.max);
  const yRange = yMax - yMin;

  return (
    <g className="line">
      <defs>
        <linearGradient id="linearGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          {ranges.map(d => 
            <stop
              offset={(d.min-yMin)/yRange} /** Calculate offset based on range percentage */
              stopColor={d.color}
              key={d.color}
            />
          )}
        </linearGradient>
        <linearGradient id="whiteGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="5%"  stopColor="#14111E"/>
            <stop offset="70%" stopColor="white"/>
        </linearGradient>
      </defs>
      <path
        d={linePath}
        className="gradient-line-path"
        stroke="url(#linearGradient)"
      />
      <path
        d={areaPath}
        className="gradient-area-path"
        fill="url(#whiteGradient)"
      />
    </g>
  )
}
