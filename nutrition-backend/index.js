const { ApolloServer, gql } = require('apollo-server');

const data = {
  "id": "1hj48b60fh4",
  "path": "nutrition.vegetables",
  "ranges": [
    {
      "interpretation": "Extremely Below Average",
      "color": "#ff3548",
      "min": 0.8931414465832859,
      "max": 0.9042688209593669
    },
    {
      "interpretation": "Significantly Below Average",
      "color": "#f83863",
      "min": 0.9042688209593669,
      "max": 0.919549
    },
    {
      "interpretation": "Below Average",
      "color": "#ee4594",
      "min": 0.919549,
      "max": 1.005282290325151
    },
    {
      "interpretation": "Average",
      "color": "#de56f5",
      "min": 1.005282290325151,
      "max": 1.8278898694247774
    },
    {
      "interpretation": "Above Average",
      "color": "#754bff",
      "min": 1.8278898694247774,
      "max": 2.6199146786799092
    },
    {
      "interpretation": "Significantly Above Avg",
      "color": "#4c76ff",
      "min": 2.6199146786799092,
      "max": 3.6508570509221245
    },
    {
      "interpretation": "Extremely Above Avg",
      "color": "#29adff",
      "min": 3.6508570509221245,
      "max": 6.07901706
    }
  ],
  "visit_data": [
    {
      "date": "6/13/2018",
      "value": 2.58938390329389378
    },
    {
      "date": "09/15/2018",
      "value": 1.8225067760952367
    },
    {
      "date": "12/28/2018",
      "value": 2.92834735653635737
    },
    {
      "date": "01/15/2019",
      "value": 4.87348793587355737
    }
  ]
};

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  type Range {
    interpretation: String
    color: String
    min: Float
    max: Float
  }

  type VisitData {
    date: String
    value: Float
  }

  type Query {
    ranges: [Range]
    visitData: [VisitData]
  }
`;

// Resolvers define the technique for fetching the types in the schema
const resolvers = {
  Query: {
    ranges: () => data.ranges,
    visitData: () => data.visit_data,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
