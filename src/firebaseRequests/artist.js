import axios from 'axios';
import constants from '../constants';

const getRequest = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/artist.json`)
      .then(res => {
        const artist = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(fbKey => {
            res.data[fbKey].id = fbKey;
            artist.push(res.data[fbKey]);
          });
        }
        resolve(artist);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default {getRequest};
