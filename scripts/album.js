var albumPicasso = {
    name: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { name: 'Blue', length: '4:26' },
        { name: 'Green', length: '3:14' },
        { name: 'Red', length: '5:01' },
        { name: 'Pink', length: '3:21' },
        { name: 'Magenta', length: '2:15' }
    ]
};

var albumMarconi = {
    name: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/02.png',
    songs: [
        { name: 'Hello, Operator?', length: '1:01' },
        { name: 'Ring, ring, ring', length: '5:01' },
        { name: 'Fits in your pocket', length: '3:21' },
        { name: 'Can you hear me now?', length: '3:14' },
        { name: 'Wrong phone number', length: '2:15' }
    ]
};

var albumEinstein = {
    name: 'That\'s Relativity For You…',
    artist: 'The Albert Einstein Experiment',
    label: 'E=MC²',
    year: '1955',
    albumArtUrl: 'assets/images/album_covers/22.png',
    songs: [
        { name: 'Bodies in Free Fall', length: '3:31' },
        { name: 'Black Hole Simulations', length: '4:19' },
        { name: 'You\'re Special', length: '8:21' },
        { name: 'I\'m Your Much Younger Father (because I spent the last twenty years in space traveling at relativistic speed)', length: '2:19:47:19.324'},
        { name: 'Partical Physics === Whack', length: '0:22' }
    ]
};

var createSongRow = function createSongRow(songNumber, songName, songLength) {
    var template = 
          '<tr class="album-view-song-item">'
        + '<td class="song-item-number">' + songNumber + '</td>'
        + '<td class="song-item-title">' + songName + '</td>'
        + '<td class="song-item-duration">' + songLength + '</td>'
        + '</tr>'
    ;
    
    return template;
};

var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function(album) {

     albumTitle.firstChild.nodeValue = album.name;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);
 
     albumSongList.innerHTML = '';
 
     for (i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
     }
};
 
window.onload = function() {
    setCurrentAlbum(albumPicasso);
     
    var albums = [albumPicasso, albumMarconi, albumEinstein];
    var i = 1;
    
    albumImage.addEventListener('click', function(event){
        setCurrentAlbum(albums[i]);
        i++;
        
        if (i === albums.length) {
            i = 0;
        }
    });
};

