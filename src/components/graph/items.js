import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import PieChartIcon from "@material-ui/icons/PieChart";
import BarChartIcon from "@material-ui/icons/BarChart";
import DraftsIcon from "@material-ui/icons/Drafts";
import ShowChart from "@material-ui/icons/ShowChart";
import { Link } from "react-router-dom";

export const chartItems = (
  <div>
    <Link to="/home" style={{ textDecoration: "none" }}>
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </Link>
    <Link to="/pie" style={{ textDecoration: "none" }}>
      <ListItem button>
        <ListItemIcon>
          <PieChartIcon />
        </ListItemIcon>
        <ListItemText primary="Groups of Dispatch" />
      </ListItem>
    </Link>
    <Link to="/bar" style={{ textDecoration: "none" }}>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Primary Dispatch Department" />
      </ListItem>
    </Link>
    <Link to="/line" style={{ textDecoration: "none" }}>
      <ListItem button>
        <ListItemIcon>
          <ShowChart />
        </ListItemIcon>
        <ListItemText primary="Neighborhood" />
      </ListItem>
    </Link>
    <Link to="/time" style={{ textDecoration: "none" }}>
      <ListItem button>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Time Chart" />
      </ListItem>
    </Link>
  </div>
);

export default chartItems;
