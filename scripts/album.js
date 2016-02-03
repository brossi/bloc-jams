var getSongNumberTD = function getSongNumberTD(number) {
  
  return $('.song-item-number[data-song-number="' + number + '"]');
};

var createSongRow = function createSongRow(songNumber, songName, songLength) {
    var template = 
          '<tr class="album-view-song-item">'
        + '<td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
        + '<td class="song-item-title">' + songName + '</td>'
        + '<td class="song-item-duration">' + songLength + '</td>'
        + '</tr>'
    ;
    
    var $row = $(template);
  
    var clickHandler = function() {
      var songNumber = parseInt($(this).attr('data-song-number'));

      if (currentlyPlayingSongNumber !== null) {
          var currentlyPlayingTD = getSongNumberTD(currentlyPlayingSongNumber);
          currentlyPlayingTD.html(currentlyPlayingSongNumber);
      }
      
      if (currentlyPlayingSongNumber !== songNumber) {
          $(this).html(pauseButtonTemplate);
          setSong(songNumber);
          currentSoundFile.play();
          updatePlayerBarSong();
      } else if (currentlyPlayingSongNumber === songNumber) {
          if (currentSoundFile.isPaused()) {
            $(this).html(pauseButtonTemplate);
            $('.main-controls .play-pause').html(playerBarPauseButton);
            currentSoundFile.play();
          }
          else {
            $(this).html(playButtonTemplate);
            $('.main-controls .play-pause').html(playerBarPlayButton);
            currentSoundFile.pause();
          }
      }
    };
  
    var onHover = function(event) {
      var songNumberTD = $(this).find('.song-item-number');
      var songNumber = parseInt(songNumberTD.attr('data-song-number'));
      if (songNumber !== currentlyPlayingSongNumber) {
        songNumberTD.html(playButtonTemplate);
      }
    };
  
    var offHover = function(event) {
      var songNumberTD = $(this).find('.song-item-number');
      var songNumber = parseInt(songNumberTD.attr('data-song-number'));
      if (songNumber !== currentlyPlayingSongNumber) {
        songNumberTD.html(songNumber);
      }
    };
  
    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    
    return $row;
};

var setSong = function setSong(songNumber) {
  
  if (currentSoundFile) {
    currentSoundFile.stop();
  }
  
  currentlyPlayingSongNumber = parseInt(songNumber);
  currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
  
  currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
    formats: [ 'mp3' ],
    preload: true
  });
  
  setVolume(currentVolume);
};

var setVolume = function setVolume(volume) {
  if (currentSoundFile) {
    currentSoundFile.setVolume(volume);
  }
};

var setCurrentAlbum = function(album) {
  currentAlbum = album;
  var $albumTitle = $('.album-view-title');
  var $albumArtist = $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage = $('.album-cover-art');
  var $albumSongList = $('.album-view-song-list');

  $albumTitle.text(album.name);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year + ' ' + album.label);
  $albumImage.attr('src', album.albumArtUrl);

  $albumSongList.empty();

  for (i = 0; i < album.songs.length; i++) {
    var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
    $albumSongList.append($newRow);
  }
};

var trackIndex = function trackIndex(album, song) {
  return album.songs.indexOf(song);
};

var nextSong = function nextSong() {
  // get the index of the previously played song
  var prevSongIndex = currentlyPlayingSongNumber - 1;
  var prevSongNumber = prevSongIndex + 1;

  // set new current song
  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
  currentSongIndex++;
  
  // if previous song is the last one on the album, wrap back around to the first song when nextSong() is called
  if (currentSongIndex >= currentAlbum.songs.length ) {
    currentSongIndex = 0;
  }
  
  currentlyPlayingSongNumber = currentSongIndex + 1;
  
  // update player bar to show new song
  currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
  currentSoundFile.play();
  updatePlayerBarSong();
  
  // update html of previous song's element with number
  var prevPlayingTD = getSongNumberTD(prevSongNumber);
  var prevSongNumber = prevPlayingTD.attr('data-song-number');
  prevPlayingTD.html(prevSongNumber);
  
  // update html of new song's element with pause button
  var currentSongTD = getSongNumberTD(currentlyPlayingSongNumber);
  currentSongTD.html(pauseButtonTemplate);
};

var previousSong = function previousSong() {
  // get the index of the previously played song
  var prevSongIndex = currentlyPlayingSongNumber - 1;
  var prevSongNumber = prevSongIndex + 1;

  // set new current song
  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
  currentSongIndex--;
  
  // if previous song is the first one on the album, wrap back around to the last song when previousSong() is called
  if (currentSongIndex === -1 ) {
    currentSongIndex = currentAlbum.songs.length - 1;
    currentlyPlayingSongNumber = currentAlbum.songs.length;
  }
  else {
    currentlyPlayingSongNumber = currentSongIndex + 1; 
  }  
  // update player bar to show new song
  currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
  currentSoundFile.play();
  updatePlayerBarSong();
  
  // update html of previous song's element with number
  var prevPlayingTD = getSongNumberTD(prevSongNumber);
  var prevSongNumber = prevPlayingTD.attr('data-song-number');
  prevPlayingTD.html(prevSongNumber);
  
  // update html of new song's element with pause button
  var currentSongTD = getSongNumberTD(currentlyPlayingSongNumber);
  currentSongTD.html(pauseButtonTemplate);
};

var updatePlayerBarSong = function updatePlayerBarSong() {
  $('.currently-playing .song-name').text(currentSongFromAlbum.name);
  $('.currently-playing .artist-name').text(currentAlbum.artist);
  $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.artist);
  $('.main-controls .play-pause').html(playerBarPauseButton);
};

var togglePlayFromPlayerBar = function togglePlayFromPlayerBar() {
  var $currentlyPlayingSongTD = getSongNumberTD(currentlyPlayingSongNumber);
  if (currentSoundFile.isPaused()) {
    $currentlyPlayingSongTD.html(pauseButtonTemplate);
    $(this).html(playerBarPauseButton);
    currentSoundFile.play();
  }
  else if (currentSoundFile) {
    $currentlyPlayingSongTD.html(playButtonTemplate);
    $(this).html(playerBarPlayButton);
    currentSoundFile.pause();
  }
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');
var $playPauseButton = $('.main-controls .play-pause');
 
$(document).ready(function() {
  setCurrentAlbum(albumPicasso);
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);
  $playPauseButton.click(togglePlayFromPlayerBar);
});