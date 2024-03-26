document.addEventListener("DOMContentLoaded", () => {
    const usernameInput = document.getElementById("usernameInput");
    const lookupButton = document.getElementById("lookupButton");
    const playerUsername = document.getElementById("playerUsername");
    const playerUUID = document.getElementById("playerUUID");
    const skinImage = document.getElementById("skinImage");
    const skinHistoryContainer = document.getElementById("skinHistory");

    lookupButton.addEventListener("click", () => {
        const username = usernameInput.value;

        // Fetch the damn player information
        fetch(`https://playerdb.co/api/player/minecraft/${username}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    const playerData = data.data.player;

                    const uuid = playerData.id;
                    const name = playerData.username;
                    const skinUrl = `https://crafatar.com/renders/body/${uuid}?overlay`;

                    playerUsername.textContent = name;
                    playerUUID.textContent = uuid;
                    skinImage.src = skinUrl; // Update the player's skin

                    // Fetch and display skin history (this will be added later...)
                    fetchSkinHistory(username);
                } else {
                    throw new Error("Player not found");
                }
            })
            .catch(error => {
                console.error("Error fetching player data:", error);
                playerUsername.textContent = "Error";
                playerUUID.textContent = "Error";
                skinImage.src = "default_steve_skin.png"; // Set default image in case of an error
                skinHistoryContainer.innerHTML = ""; // Clear the damn skin history
            });
    });

    function fetchSkinHistory(username) {
        // Replace the damn "YOUR_API_OR_WEBSITE_URL_HERE" with your API or website URL to fetch skin history data... (implementing this later)
        fetch(`YOUR_API_OR_WEBSITE_URL_HERE?username=${username}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                // Assuming data is an array of skin URLs
                const skinHistory = data.skinHistory;

                // Create and append mini heads to the skin history container
                skinHistory.forEach(url => {
                    const miniHead = document.createElement("img");
                    miniHead.src = url;
                    miniHead.className = "mini-head"; // You can restyle this class yourself in the CSS..
                    skinHistoryContainer.appendChild(miniHead);
                });
            })
            .catch(error => {
                console.error("Error fetching skin history:", error);
                skinHistoryContainer.innerHTML = ""; // Clear skin history in case of an error...
            });
    }
});
