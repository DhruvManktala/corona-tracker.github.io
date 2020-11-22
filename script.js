$(document).ready(function(){
       
        /*Mapbox*/
	mapboxgl.accessToken = 'pk.eyJ1IjoiZGhydXYxNSIsImEiOiJja2hzenUyZzI0ZjEzMzVsNjdrejdpZW82In0.5s_JQqF4SkWhx4cEuukVuQ';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        center: [0,10],
        zoom: 1.2
    });

    // create the popup
    $.getJSON(
            "https://disease.sh/v3/covid-19/countries?sort=cases",
            function(data)
            {
              $.each(data,function(key,value){
                  
                 var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                     `
                    <img src="${value.countryInfo.flag}">
                    <h1>${value.country}</h1>
                     <h3 id="cases">Total Cases:${value.cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h3>
                     <h3 id="recovered">Total Recovered:${value.recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h3>
                    <h3 id="deaths">Total Recovered:${value.deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h3>
                    <h4>Today's cases:${value.todayCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h4>
                    <h4>Today's death:${value.todayRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h4>
`
 );

    // create DOM element for the marker
    var el = document.createElement('div');
    el.id = 'marker';

    // create the marker
    new mapboxgl.Marker(el)
        .setLngLat([value.countryInfo.long,value.countryInfo.lat])
        .setPopup(popup) // sets a popup on this marker
        .addTo(map);
 
              });  
            });
        
        
        
        
/*States*/        
            $.getJSON(
            "https://www.trackcorona.live/api/provinces",
            function(data)
            {
                $.each(data.data,function(key,value){
                    if(value.country_code=="in")
                        {
                            
                            var popup = new mapboxgl.Popup({ offset: 25,}).setHTML(`
                    <h1>${value.location}</h1>
                     <h3 id="cases">Total Cases:${value.confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h3>
                     <h3 id="recovered">Total Recovered:${value.recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h3>
                    <h3 id="deaths">Total Recovered:${value.dead.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h3>

`
 );

    // create DOM element for the marker
    var el = document.createElement('div');
    el.className = 'marker';

    // create the marker
    new mapboxgl.Marker(el)
        .setLngLat([value.longitude,value.latitude])
        .setPopup(popup) // sets a popup on this marker
        .addTo(map); 
                            
                            
                            
                        }
                     
                });
                
             
            });
    
    });