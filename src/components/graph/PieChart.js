//Imports
import React from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import "./chart.css";

//Data Values for Pie Chart
function GraphData(cadentriesGroup, cadentriesGroupCount) {
  //Data
  const data = {
    labels: cadentriesGroup,
    datasets: [
      {
        title: "Groups of Dispatch",
        backgroundColor: [
          "#3E812B",
          "#C25BC8",
          "#5AC898",
          "#285A79",
          "#3E42BB",
          "#AD3A55",
          "#4E481A",
          "#6D242C",
          "#130A1E"
        ],
        data: cadentriesGroupCount
      }
    ]
  };
  return data;
}

//Organize and group the data appropriate for the Chart
function DataGroup(cadentries) {
  //Create variables to store and count the groups of dispatch
  var cadentriesGroupLookup = {};
  var cadentriesGroup = [];
  var cadentriesGroupCount = [];

  for (var cadentry, i = 0; (cadentry = cadentries[i++]); ) {
    var group = cadentry.group; //Temperarily store the group of dispatch

    //Check if group exists in array if not add it array and assign cadentriesGroupCount 0
    if (!(group in cadentriesGroupLookup)) {
      cadentriesGroupLookup[group] = 1;
      group = group.trim();
      cadentriesGroup.push(group);
      cadentriesGroupCount.push(0);
    }
  }

  //Store number of times a certain dispatch has happened
  for (let i in cadentriesGroup) {
    var count = 0;
    for (var j = 0; (cadentry = cadentries[j++]); ) {
      if (cadentriesGroup[i] === cadentry.group.trim()) {
        cadentriesGroupCount[i] = count;
        count = count + 1;
      }
    }
  }

  return GraphData(cadentriesGroup, cadentriesGroupCount);
}

//Class For Pie Chart
class PieGraph extends React.Component {
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

  //Render the component
  render() {
    const { error, isLoaded, graphdata } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    }

    return (
      <React.Fragment>
        <div className="title">
          Dispatch Groups and the number of times a groups call has gone through
        </div>
        <Pie
          data={graphdata}
          height={100}
          options={{
            legend: {
              position: "bottom"
            }
          }}
          className="doughnut-graph"
        />
      </React.Fragment>
    );
  }
}

export default PieGraph;
