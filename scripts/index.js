const fetchWonders = async () =>{
    try{
        const response = await axios.get("https://www.world-wonders-api.org/v0/wonders"); 
        const wonders = response.data;
        displayWonders(wonders);
    }
    catch(error){
        console.error("Error fetching data ", error);
    }
}

function displayWonders(wonders){
    const wonders_container = document.getElementById("wonders-container");
    wonders_container.innerHTML = '';
    wonders.forEach(wonder =>{
        const card = `<div class="wonder-card">
            <img src="${wonder.links.images[0]}" alt="${wonder.name}" class="img-card">
            <h4>${wonder.name}</h4>
            <button class="view-details-btn" onclick="window.open('pages/wonder.html?name=${encodeURIComponent(wonder.name)}', '_blank')">View Details</button>
        </div>`;

        wonders_container.innerHTML += card;
    });
}

document.addEventListener("DOMContentLoaded", fetchWonders);