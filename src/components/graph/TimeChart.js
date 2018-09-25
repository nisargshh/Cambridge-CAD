import React from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "./chart.css";

//Chart Options
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
function GraphData(cadentriesDate, cadentriesDateCount) {
  const data = {
    labels: cadentriesDate,
    datasets: [
      {
        label: "Time",
        fill: true,
        lineTension: 0.1,
        backgroundColor: "#5AC898",
        data: cadentriesDateCount
      }
    ]
  };
  return data;
}

function DataGroup(cadentries) {
  //Create variables to store and count the groups of dispatch
  var cadentriesDateLookup = {};
  var cadentriesDate = [];
  var cadentriesDateCount = [];

  for (var cadentry, i = 0; (cadentry = cadentries[i++]); ) {
    var date = cadentry.datetimereceived; //Temperarily store the group of dispatch
    date = date.substring(0, 10);
    //Check if group exists in array if not add it array and assign cadentriesDateCount 0
    if (!(date in cadentriesDateLookup)) {
      cadentriesDateLookup[date] = 1;
      cadentriesDate.push(date);
      cadentriesDateCount.push(0);
    }
    console.log(cadentriesDate);
  }

  //Store number of times a certain dispatch has happened
  for (let i in cadentriesDate) {
    var count = 0;
    for (var j = 0; (cadentry = cadentries[j++]); ) {
      if (cadentriesDate[i] === cadentry.datetimereceived.substring(0, 10)) {
        cadentriesDateCount[i] = count;
        count = count + 1;
      }
    }
  }

  return GraphData(cadentriesDate, cadentriesDateCount);
}

class TimeChart extends React.Component {
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
          The time the dispatch was entered.
        </div>
        <Line data={DataGroup(this.state.cadentries)} options={chartOptions} />
      </React.Fragment>
    );
  }
}

export default TimeChart;
