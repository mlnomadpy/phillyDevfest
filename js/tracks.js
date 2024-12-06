async function loadTracks() {
    try {
        console.log('Fetching tracks...');
        const response = await fetch('data/tracks.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const tracks = await response.json();
        console.log('Tracks fetched:', tracks);

        const tracksContainer = document.querySelector('.tracks-container');
        if (!tracksContainer) {
            throw new Error('Tracks container not found');
        }
        tracksContainer.innerHTML = '';

        if (tracks.length === 0) {
            tracksContainer.innerHTML = '<p>No tracks available at the moment.</p>';
            return;
        }

        tracks.forEach(track => {
            const trackDiv = document.createElement('div');
            trackDiv.className = 'track-item';
            trackDiv.innerHTML = `
                <h3>${track.title}</h3>
                <img src="${track.thumbnail}" alt="${track.title} thumbnail">
                <p>Type: ${track.type}</p>
                <p>${track.description}</p>
            `;
            tracksContainer.appendChild(trackDiv);
        });

    } catch (error) {
        console.error('Error loading tracks:', error);
        const tracksContainer = document.querySelector('.tracks-container');
        if (tracksContainer) {
            tracksContainer.innerHTML = '<p>Error loading tracks content</p>';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    loadTracks();
});
