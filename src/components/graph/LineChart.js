import React from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "./chart.css";

var chartOptions = {
  showScale: true,
  pointDot: true,
  scales: {
    xAxes: [
      {
        ticks: {
          min: 0,
          max: 10000,
          stepSize: 100
        }
      }
    ]
  },
  legend: {
    position: "bottom"
  }
};

//Data values for chart
function GraphData(cadentriesNeighborhood, cadentriesNeighborhoodCount) {
  const data = {
    labels: cadentriesNeighborhood,
    datasets: [
      {
        label: "Neighborhood",
        fill: true,
        lineTension: 0.1,
        backgroundColor: "#5AC898",
        data: cadentriesNeighborhoodCount
      }
    ]
  };
  return data;
}

function DataGroup(cadentries) {
  //Create variables to store and count the groups of dispatch
  var cadentriesNeighborhoodLookup = {};
  var cadentriesNeighborhood = [];
  var cadentriesNeighborhoodCount = [];

  for (var cadentry, i = 0; (cadentry = cadentries[i++]); ) {
    var neighborhood = cadentry.neighborhood; //Temperarily store the group of dispatch

    //Check if group exists in array if not add it array and assign cadentriesGroupCount 0
    if (!(neighborhood in cadentriesNeighborhoodLookup)) {
      cadentriesNeighborhoodLookup[neighborhood] = 1;
      neighborhood = neighborhood.trim();
      cadentriesNeighborhood.push(neighborhood);
      cadentriesNeighborhoodCount.push(0);
    }
  }

  //Store number of times a certain dispatch has happened
  for (let i in cadentriesNeighborhood) {
    var count = 0;
    for (var j = 0; (cadentry = cadentries[j++]); ) {
      if (cadentriesNeighborhood[i] === cadentry.neighborhood.trim()) {
        cadentriesNeighborhoodCount[i] = count;
        count = count + 1;
      }
    }
  }

  console.log(cadentriesNeighborhood);

  return GraphData(cadentriesNeighborhood, cadentriesNeighborhoodCount);
}

class LineChart extends React.Component {
  //Class For LineChart
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      cadentries: [],
      graphdata: null
    };
  }

  componentDidMount() {
    //Get data from API
    axios.get("https://data.cambridgema.gov/resource/nt6q-kmgy.json").then(
      result => {
        const cadentries = result.data;
        this.setState({
          isLoaded: true,
          cadentries
        });
        var graphdata = DataGroup(this.state.cadentries);
        this.setState({ graphdata });
      },
      error => {
        this.setState({
          isLoaded: false,
          error
        });
      }
    );
  }

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <React.Fragment>
        <div className="title">
          The neighborhood where the dispatch was entered.
        </div>
        <Line data={DataGroup(this.state.cadentries)} options={chartOptions} />
      </React.Fragment>
    );
  }
}

export default LineChart;
