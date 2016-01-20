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

var createSongRow = function createSongRow(songNumber, songName, songLength) {
    var template = 
          '<tr class="album-view-song-item">'
        + '<td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
        + '<td class="song-item-title">' + songName + '</td>'
        + '<td class="song-item-duration">' + songLength + '</td>'
        + '</tr>'
    ;
    
    return template;
};

 var setCurrentAlbum = function(album) {
     var albumTitle = document.getElementsByClassName('album-view-title')[0];
     var albumArtist = document.getElementsByClassName('album-view-artist')[0];
     var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
     var albumImage = document.getElementsByClassName('album-cover-art')[0];
     var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

     albumTitle.firstChild.nodeValue = album.name;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);
 
     albumSongList.innerHTML = '';
 
     for (i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
     }
 };

var findParentByClassName = function findParentByClassName(element, targetClass) {
  // check to see if the element being evaluated has a parent element
  var parent = element.parentElement;
  
  if (!parent) {
    alert('No parent found');
    return;
  }
  // traverse up the element's node until an element with the target class is found, if it exists
  
  while ( parent.className && parent.className != targetClass) {
    parent = parent.parentElement;
  }
  // when the while statement is exhausted, confirm that the element with the targetted class was found
  if (parent.className === targetClass) {
    return parent;
  }
  // otherwise, a parent element was not found with the targetted class
  else {
    alert('No parent found with that class name');
    return;
  }
};

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

var bodyTest = document.getElementsByTagName('body');

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
 
 window.onload = function() {
     setCurrentAlbum(albumPicasso);
     
     songListContainer.addEventListener('mouseover', function(event) {
        if (event.target.parentElement.className === 'album-view-song-item') {
            event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
        }
     });
     
     for (var i = 0; i < songRows.length; i++) {
         songRows[i].addEventListener('mouseleave', function(event) {
             this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
         });
     }
     
 };