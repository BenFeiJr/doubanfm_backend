const Song = require('./song.js');

const mySong = new Song();
mySong.get().then((res) => {
    console.log(res);
})