async function loadSponsors() {
    try {
        console.log('Fetching sponsors...');
        const response = await fetch('data/sponsors.json'); // Remove ../
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const sponsors = await response.json();
        console.log('Sponsors fetched:', sponsors);

        const sponsorsContainer = document.querySelector('.sponsors-container');
        if (!sponsorsContainer) {
            throw new Error('Sponsors container not found');
        }
        console.log('Sponsors container found:', sponsorsContainer);
        sponsorsContainer.innerHTML = '';

        if (sponsors.length === 0) {
            sponsorsContainer.innerHTML = '<p>No sponsors available at the moment.</p>';
            return;
        }

        sponsors.forEach(sponsor => {
            const sponsorDiv = document.createElement('div');
            sponsorDiv.className = 'sponsor-item';
            sponsorDiv.innerHTML = `
                <h3>${sponsor.name}</h3>
                <a href="${sponsor.website}" target="_blank">
                    <img src="${sponsor.logo_url}" alt="${sponsor.name} logo">
                </a>
            `;
            sponsorsContainer.appendChild(sponsorDiv);
        });

    } catch (error) {
        console.error('Error loading sponsors:', error);
        const sponsorsContainer = document.querySelector('.sponsors-container');
        if (sponsorsContainer) {
            sponsorsContainer.innerHTML = '<p>Error loading sponsors content</p>';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    loadSponsors();
});
