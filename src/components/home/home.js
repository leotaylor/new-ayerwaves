import React from 'react';
import './home.css';
import artistRequest from '../../firebaseRequests/artist';

class home extends React.Component {
  state = {
    artists: [],
  }

  componentDidMount () {
    artistRequest
      .getRequest()
      .then((artists) => {
        console.log(artists);
        this.setState({artists});
      })
      .catch((err) => {
        console.error('error with getting artist', err);
      });
  }

  render () {

    const singleArtist = (id) => {
      this.props.history.push(`/artist/${id}`);
    };

    const artistComponent = this.state.artists.map((artist) => {
      return (
        <button className="btn-info btn-lg bandbtn" key={artist.id} value={artist.id} onClick={() => singleArtist(artist.id)}>{artist.name}</button>
      );
    });

    return (
      <div className="home">
        <div className="newFont">
          <h1>Welcome To</h1>
          <h1>The 4th Annual AyerWaves</h1>
          <h1>May 31st - June 2nd, 2019</h1>
          <a href="https://www.google.com/maps/place/Further+Farms/@36.234395,-86.868238,15z/data=!4m5!3m4!1s0x0:0x2e9b9005b4be5685!8m2!3d36.234395!4d-86.868238" className="farmlink" rel="noopener noreferrer" target="_blank"><h1>Further Farms Nashville</h1></a>
        </div>
        <img className="ufo" src={require('../../images/ayerUFO.JPG')} alt="ufo"></img>
        <div>
          {artistComponent}
        </div>
        <footer className="footer">
          <p>AyerWaves Entertainment © 2018 All Rights Reserved<br/>
          Contact: ayerwavesmusic@gmail.com<br/>
          </p>
          <p>
          A Sound Farm Events Production<br></br>
            <a href="https://soundfarm.us/">www.soundfarm.us</a>
          </p>
          <div>
            <a href="https://www.facebook.com/AyerWavesMusic/"><i className="fab fa-facebook-f icon"></i></a>
            <a href="https://www.youtube.com/channel/UCbzDiCYcUFJaULli4zTESwQ"><i className="fab fa-youtube icon"></i></a>
            <a href="https://www.instagram.com/ayerwavesmusic"><i className="fab fa-instagram icon"></i></a>
          </div>
        </footer>
      </div>
    );
  }
}

export default home;
