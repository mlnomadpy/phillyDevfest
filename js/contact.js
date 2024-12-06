async function loadTeam() {
    try {
        console.log('Fetching team members...');
        const response = await fetch('data/team.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const team = await response.json();
        console.log('Team members fetched:', team);

        const teamContainer = document.querySelector('.team-container');
        if (!teamContainer) {
            throw new Error('Team container not found');
        }
        teamContainer.innerHTML = '';

        if (team.length === 0) {
            teamContainer.innerHTML = '<p>No team members available at the moment.</p>';
            return;
        }

        team.forEach(member => {
            const memberDiv = document.createElement('div');
            memberDiv.className = 'team-member';
            memberDiv.innerHTML = `
                <div class="team-member-inner">
                    <div class="team-member-front">
                        ${member.image ? `<img src="${member.image}" alt="${member.name}">` : ''}
                        <h3>${member.name}</h3>
                    </div>
                    <div class="team-member-back">
                        <h3>${member.name}</h3>
                        <p class="title">Title: ${member.title}</p>
                    </div>
                </div>
            `;
            memberDiv.addEventListener('click', () => showPopup(member));
            teamContainer.appendChild(memberDiv);
        });

    } catch (error) {
        console.error('Error loading team members:', error);
        const teamContainer = document.querySelector('.team-container');
        if (teamContainer) {
            teamContainer.innerHTML = '<p>Error loading team members content</p>';
        }
    }
}

function showPopup(member) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
        <button class="popup-close">&times;</button>
        <h3>${member.name}</h3>
        <p class="title">Title: ${member.title}</p>
        <p class="favorite-dinosaur">Favorite Dinosaur: ${member.favorite_dinosaur}</p>
        <p class="bio">Bio: ${member.bio}</p>
        <p><a href="${member.linkedin}" target="_blank">LinkedIn</a></p>
        ${member.bluesky ? `<p><a href="${member.bluesky}" target="_blank">Bluesky</a></p>` : ''}
        ${member.twitter ? `<p><a href="${member.twitter}" target="_blank">Twitter</a></p>` : ''}
    `;
    document.body.appendChild(popup);
    popup.classList.add('active');

    const closeButton = popup.querySelector('.popup-close');
    closeButton.addEventListener('click', () => {
        popup.classList.remove('active');
        document.body.removeChild(popup);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    loadTeam();
});
