import React, { Component } from 'react';
import { Query, withApollo, compose } from "react-apollo";
import gql from "graphql-tag";
import LineChart from './LineChart';
import '../styles/Main.scss';

const minRangeIndex = 2;

// Chart size dimension and general padding, unit in pixels
const dimensionConfig = {
  height: 700,
  width: 1000,
  padding: 100,
}

class Main extends Component {
  state = {
    ranges: [],
  }
  componentDidMount() {
    // Fetch ranges data, slice the array from minRangeIndex
    this.props.client.query({
      query: RANGES_QUERY
    }).then(({data}) => {
      const ranges = data.ranges.map(range => {
        return {
          ...range,
          min: range.min.toFixed(2),
          max: range.max.toFixed(2),
        }
      }).slice(minRangeIndex);

      this.setState({ranges});
    });
  }
  render() {
    const { ranges } = this.state;
    return (
      <Query
        query={VISIT_DATA_QUERY}
      >
      {({ loading, error, data }) => {
        if (error) return <p>Error :(</p>;
        if (!loading && !error && ranges.length > 0) {
          const visitData = data.visitData.map(datum => ({
            date: new Date(datum.date),
            value: datum.value.toFixed(2),
          }));
          return (
            <div className="main-container">
              <h1 className="graph-title">Nutrition</h1>
              <LineChart
                data={visitData}
                ranges={ranges}
                {...dimensionConfig}
              />
            </div>
          )
        } else {
          return <p>Loading...</p>;
        }
      }}
    </Query>)
  }
}

export default compose(
  withApollo,
)(Main)

const RANGES_QUERY = gql`
  {
    ranges {
      interpretation
      color
      min
      max
    }
  }
`

const VISIT_DATA_QUERY = gql`
  {
    visitData {
      date
      value
    }
  }
`
