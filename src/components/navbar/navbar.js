import React from 'react';
import {Link} from 'react-router-dom';
import artistRequest from '../../firebaseRequests/artist';
// import { NavDropdown } from 'react-bootstrap';
import { withRouter } from "react-router-dom";

import './navbar.css';

import authRequests from '../../firebaseRequests/auth';
import ArtistSelect from './artistSelect/ArtistSelect';

class Navbar extends React.Component {

  state = {
    artists: [],
  }

  componentDidMount () {
    artistRequest
      .getRequest()
      .then((artists) => {
        this.setState({artists});
      })
      .catch((err) => {
        console.error('error with getting artist', err);
      });
  }

  singleArtist = (e) => {
    const Aid = e.target.value * 1;
    this.props.history.push(`/artist/${Aid}`);
  };

  render () {
    const {authed, logout} = this.props;
    const logoutClickEvent = (e) => {
      authRequests.logoutUser();
      logout();
    };

    const artistComponent = this.state.artists.map((artist) => {
      return (
        <ArtistSelect
          details={artist}
          key={artist.id}
          type="text"
          value={artist.id}
          id={artist.id}
        />
      );
    });

    return (
      <div className="Navbar">
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand" onClick={logoutClickEvent}>Ayerwaves</Link>
            </div>
            {
              authed ? (
                <ul className="nav navbar-nav navbar-right">
                  <li className="navbar-form">
                    <button onClick={logoutClickEvent} className="btn btn-danger">Logout</button>
                  </li>
                </ul>
              ) : (
                <ul className="nav navbar-nav navbar-right top">
                  <li className="navlink">
                    <a href="https://www.eventbrite.com/e/ayerwaves-at-further-farms-tickets-49259383141" rel="noopener noreferrer" target="_blank">Tickets</a>
                  </li>
                  <li className="navlink">
                    <Link to="/about">About</Link>
                  </li>
                  <li className="navlink">
                    <Link to="/contact">Contact</Link>
                  </li>
                  <li className="navlink">
                    <Link to="/bring">What To Bring</Link>
                  </li>
                  <li className='dropdown navlink'>
                    <select className='select' onChange={this.singleArtist}>
                      <option>Artists</option>
                      {artistComponent}
                    </select>
                  </li>
                  <li className="navlink">
                    <Link to="/admin">Admin</Link>
                  </li>
                </ul>
              )
            }
          </div>
        </nav>
      </div>
    );
  }
};

export default withRouter(Navbar);
