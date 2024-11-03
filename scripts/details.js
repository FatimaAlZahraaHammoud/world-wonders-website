const getWonderDetails = () => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    if (name) {
        fetchWonderDetails(name); 
    }
}

const fetchWonderDetails = async(name) =>{
    try{
        const response = await axios.get("https://www.world-wonders-api.org/v0/wonders");
        const wonders = response.data;
        const wonder = wonders.find(w => w.name === decodeURIComponent(name));
        if (wonder){
            displayWonderDetails(wonder);
        }
        else{{
            console.error("wonder not found");
        }}
        
    }
    catch(error){
        console.log("Error in fetching details ", error);
    }
}

function displayWonderDetails(wonder){
    const title = document.getElementById("title");
    title.innerHTML = `${wonder.name} Details`;

    const details_container = document.getElementById("details-container");
    details_container.innerHTML = "";
    
    const details_html = 
        `<h2>${wonder.name}</h2>
        <div class="images">
            <img src="${wonder.links.images[0]}" alt="${wonder.name} 1">
            <img src="${wonder.links.images[1]}" alt="${wonder.name} 2">
            <img src="${wonder.links.images[2]}" alt="${wonder.name} 3">
        </div>
        <p class="summary"><strong>Summary: </strong>${wonder.summary}</p>
        <p class="location"><strong>Location: </strong>${wonder.location}</p>
        <p class="build_year"><strong>Build year: </strong>${wonder.build_year}</p>
        <p class="time_period"><strong>Time period: </strong>${wonder.time_period}</p>
        <p class="categories"><strong>Categories:</strong> ${wonder.categories.join(", ")}</p>
        <h4>For more details visit:</h4>
        <ul class="resources"> 
            <li><a href="${wonder.links.wiki}" target="_blank">wikipedia</a></li>
            <li><a href="${wonder.links.britannica}" target="_blank">britannica</a></li>
            <li><a href="${wonder.links.google_maps}" target="_blank">Google Maps</a></li>
            <li><a href="${wonder.links.trip_advisor}" target="_blank">Trip Advisor</a></li>
        </ul>`;

    details_container.innerHTML = details_html;
}

window.onload = getWonderDetails;
