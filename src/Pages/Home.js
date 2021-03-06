import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import NeighborhoodMap from '../components/NeighborhoodMap';
import { SQUARESPACE_CLIENT_ID, SQUARESPACE_CLIENT_SECRET } from '../config';
import Markers from '../components/Markers';
import TextField from '@material-ui/core/TextField';
import ErrorBoundary from '../components/ErrorBoundary';
import NavDrawer from '../components/NavDrawer';

const drawerWidth = 270;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1
  }
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
    places: [],
    searchQuery: '',
    filtered: []
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  componentDidMount() {
    fetch(
      `https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=${SQUARESPACE_CLIENT_ID}&client_secret=${SQUARESPACE_CLIENT_SECRET}&v=20181003`
    )
      .then(response => response.json())
      .then(data => {
        this.setState({ places: data.response.venues });
        console.log(data.response.venues[0].location.lat, data.response.venues);
      })
      .catch(err => {
        // throw new Error('Error Loading places data!');
      });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });

    const filtered = this.state.places.filter(place => {
      return place.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    this.setState({
      filtered
    });
    // console.log(filtered);

    // console.log(event.target.value)
  };

  render() {
    const { classes } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <TextField
          style={{ marginLeft: 10, width: 240 }}
          id="standard-name"
          placeholder="search..."
          className={classes.textField}
          value={this.state.searchQuery}
          onChange={this.handleChange('searchQuery')}
          margin="normal"
        />
        <Divider />
        <List>
          {this.state.places !== undefined
            ? this.state.searchQuery !== ''
              ? this.state.filtered.length > 0
                ? this.state.filtered.map(place => (
                    <Fragment key={place.id}>
                      <ListItem
                        button
                        onClick={() => {
                          this.markers.getPlaceId(place.id);
                          if (this.nav.checkMobileState()) {
                            this.nav.handleDrawerToggle();
                          }
                        }}
                      >
                        <ListItemText primary={place.name} />
                      </ListItem>
                      <Divider />
                    </Fragment>
                  ))
                : 'No place avaliable for above query!'
              : this.state.places.length > 0
                ? this.state.places.map(place => (
                    <Fragment key={place.id}>
                      <ListItem
                        button
                        onClick={() => {
                          this.markers.getPlaceId(place.id);
                          if (this.nav.checkMobileState()) {
                            this.nav.handleDrawerToggle();
                          }
                        }}
                      >
                        <ListItemText primary={place.name} />
                      </ListItem>
                      <Divider />
                    </Fragment>
                  ))
                : 'Loadding...'
            : 'Error Loading Places Data!'}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={() => {
                this.nav.handleDrawerToggle();
              }}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Neighborhood Map
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <NavDrawer
            innerRef={instance => {
              this.nav = instance;
            }}
          >
            {drawer}
          </NavDrawer>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <ErrorBoundary>
            <NeighborhoodMap isMarkerShown>
              <Markers
                markers={
                  this.state.searchQuery !== ''
                    ? this.state.filtered
                    : this.state.places
                }
                ref={instance => {
                  this.markers = instance;
                }}
              />
            </NeighborhoodMap>
            <p>Showing places information from foursquare api</p>
          </ErrorBoundary>
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
