
(function() {
    const audioPlayer = document.getElementById('music-player');
    const playPauseButton = document.getElementById('play-pause');
    const nextTrackButton = document.getElementById('next-track');
    const progressBar = document.getElementById('progress-bar');
    const progress = document.getElementById('progress');
    const volumeSlider = document.getElementById('volume');

    // Audio tracks (replace with your files)
    const tracks = [
      'audio/track1.mp3',
      'audio/track2.mp3'
    ];
    let currentTrackIndex = 0;

    // Initialize player
    function loadTrack() {
      audioPlayer.src = tracks[currentTrackIndex];
      playPauseButton.innerHTML = '<i class="fas fa-play text-3xl"></i>';
    }

    function playTrack() {
      audioPlayer.play();
      playPauseButton.innerHTML = '<i class="fas fa-pause text-3xl"></i>';
    }

    // Play/Pause toggle
    playPauseButton.addEventListener('click', () => {
      if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseButton.innerHTML = '<i class="fas fa-pause text-3xl"></i>';
      } else {
        audioPlayer.pause();
        playPauseButton.innerHTML = '<i class="fas fa-play text-3xl"></i>';
      }
    });

    // Next track (random)
    nextTrackButton.addEventListener('click', () => {
      currentTrackIndex = Math.floor(Math.random() * tracks.length);
      loadTrack();
      playTrack();;
    });

    // Progress bar update
    audioPlayer.addEventListener('timeupdate', () => {
      const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      progress.style.width = `${progressPercent}%`;
    });

    // Click progress bar to seek
    progressBar.addEventListener('click', (e) => {
      const rect = progressBar.getBoundingClientRect();
      const seekTime = ((e.clientX - rect.left) / rect.width) * audioPlayer.duration;
      audioPlayer.currentTime = seekTime;
    });

    // Volume control
    volumeSlider.addEventListener('input', (e) => {
      audioPlayer.volume = e.target.value;
    });

    // Auto-play next track
    audioPlayer.addEventListener('ended', () => {
      currentTrackIndex = Math.floor(Math.random() * tracks.length);
      loadTrack();
      playTrack();
    });

    // Start with first track
    loadTrack();
})();