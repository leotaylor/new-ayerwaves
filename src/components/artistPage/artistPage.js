import React from 'react';
import './artistPage.css';
import artistRequest from '../../firebaseRequests/artist';

class artistPage extends React.Component {

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
      if (artist.id === 0) {
        console.log(artist);
        return (
          <div className="artistPage">
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
    // const artistId = this.props.match.params.id;

    return (
      // <div className="artistPage">
      //   <h1 className="artName">{singleArtistComponent.name}</h1>
      //   <img className="bandimage" alt="bandphoto" src={singleArtistComponent.imageLink}></img>
      //   <h3>Genre: {singleArtistComponent.genreName}</h3>
      //   <h4>{singleArtistComponent.description}</h4>
      //   <h3>Playing on: {singleArtistComponent.day}</h3>
      //   <h3>Stage: {singleArtistComponent.stageName}</h3>
      // </div>
      <div>
        {singleArtistComponent}
      </div>
    );
  }
}

export default artistPage;
