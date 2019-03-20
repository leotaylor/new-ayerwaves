import React from 'react';
import './artistPage.css';
import artistRequest from '../../firebaseRequests/artist';

class artistPage extends React.Component {

  state = {
    artists: [],
  }

  componentDidMount () {
    artistRequest
      // .getSingleArtist(this.props.match.params.id)
      .getRequest()
      .then((artists) => {
        this.setState({artists});
      })
      .catch((err) => {
        console.error('error with getting artist', err);
      });
  }

  // state = {
  //   singleArtists: [],
  // }

  // loadData () {
  //   const artistId = this.props.match.params.id;
  //   artistRequest
  //     .getSingleArtist(artistId)
  //     .then((res) => {
  //       this.setState({singleArtists: res});
  //     })
  //     .catch((err) => {
  //       console.error('error with getting artist', err);
  //     });
  // }

  // componentDidMount () {
  //   this.loadData();
  // }

  // componentDidUpdate () {
  //   this.loadData();
  // }

  render () {
    const singleArtistComponent = this.state.artists.map((artist) => {
      if (artist.id === this.props.match.params.id) {
        return (
          <div className="artistPage" key={artist.id}>
            <h1 className="artName">{artist.name}</h1>
            <img className="bandimage" alt="bandphoto" src={artist.imageLink}></img>
            <h3>Genre: {artist.genreName}</h3>
            <h4>{artist.description}</h4>
            <h3>Playing on: {artist.day}</h3>
            <h3>Stage: {artist.stageName}</h3>
          </div>
        );
      } else return null;
    });

    return (
      <div>
        {singleArtistComponent}
      </div>
    );
  }
}

export default artistPage;
