//Imports
import React from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import "./chart.css";

//Chart Options
var chartOptions = {
  showScale: true,
  pointDot: true,
  scales: {
    yAxes: [
      {
        ticks: {
          min: 0,
          max: 800,
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
function GraphData(cadentriesPAgency, cadentriesPAgencyCount) {
  const data = {
    labels: cadentriesPAgency,
    datasets: [
      {
        label: "Primary Dispatch Department",
        backgroundColor: ["#3E812B", "#5AC898"],
        data: cadentriesPAgencyCount
      }
    ]
  };
  return data;
}

//Collect data from the state and sort them in array and count the number of times the each department was dispatched department.
function DataGroup(cadentries) {
  var cadentriesPAgencyLookup = {};
  var cadentriesPAgency = [];
  var cadentriesPAgencyCount = [];

  for (var cadentry, i = 0; (cadentry = cadentries[i++]); ) {
    var pAgency = cadentry.primaryagency; //Temperarily store the group of dispatch

    //Check if group exists in array if not add it array and assign cadentriesGroupCount 0
    if (!(pAgency in cadentriesPAgencyLookup)) {
      cadentriesPAgencyLookup[pAgency] = 1;
      pAgency = pAgency.trim();
      cadentriesPAgency.push(pAgency);
      cadentriesPAgencyCount.push(0);
    }
  }

  pAgency = cadentriesPAgency[0];
  //Store number of times a certain dispatch has happened
  for (let i in cadentriesPAgency) {
    var count = 0;
    for (var j = 0; (cadentry = cadentries[j++]); ) {
      if (cadentriesPAgency[i] === cadentry.primaryagency.trim()) {
        cadentriesPAgencyCount[i] = count;
        count = count + 1;
      }
    }
  }

  for (let i in cadentriesPAgency) {
    if (cadentriesPAgency[i] === "F") {
      cadentriesPAgency[i] = "Fire Department";
    } else if (cadentriesPAgency[i] === "P") {
      cadentriesPAgency[i] = "Police Department";
    }
  }

  var data = GraphData(cadentriesPAgency, cadentriesPAgencyCount);
  return data;
}

//Component
class BarChart extends React.Component {
  constructor(props) {
    super(props);
    //State
    this.state = {
      error: null,
      isLoaded: false,
      cadentries: []
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
      },
      error => {
        this.setState({
          isLoaded: false,
          error
        });
      }
    );
  }

  //Render the component
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
          Chart of the primary departments that are dispatched from the CAD
        </div>
        <Bar data={DataGroup(this.state.cadentries)} options={chartOptions} />
      </React.Fragment>
    );
  }
}

export default BarChart;
