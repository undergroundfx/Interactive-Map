window.document.onload = closetimer();

function getValue() {
	var value = document.getElementById('quickfind').value;
	switch (value) {
    case 'tennis':
		map.setZoom(18);
		map.panTo(marker4.getPosition());
		infowindow4.open(map, marker4);
		var value = '#';
        break;
    case 'pio':
		map.setZoom(18);
		map.panTo(marker.getPosition());
		infowindow.open(map, marker);
		var value = '#';
        break;
    case 'south':
		map.setZoom(18);
		map.panTo(marker3.getPosition());
		infowindow3.open(map, marker3);
		var value = '#';
        break;
}
	setTimeout(timer, 2500);
	function timer() {
		document.getElementById('quickfind').selectedIndex=0;
	}
}

function closetimer() {
	setTimeout(closebox, 8000);
}

function closebox() {
	document.getElementById("box").style.display = 'none';
}

document.addEventListener('DOMContentLoaded', drawMap);
// initialize map and use event listener to load and run initialize() on window load event

function drawMap() {
	mapOptions = {
		center: { lat: 47.547632, lng: -122.351892},
		zoom: 18,
        streetViewControl: false,

		// can use either way to set map type, one way drills down and the other uses a constant definition in the namespace
		//mapTypeId: google.maps.MapTypeId.HYBRID,
		mapTypeId: 'satellite',
		draggable: true
	};

	// using the APIs methods, set map object, use object mapOptions		
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

//////////////////// Map Markers		
// no var so they are global
	marker = new google.maps.Marker({
		position: {lat: 47.5478588, lng: -122.3524329},
		map: map,
		title: 'PIO & Student Services',
		animation: google.maps.Animation.DROP
	});
    marker2 = new google.maps.Marker({
        position: {lat:47.548013, lng: -122.352595},
        map: map,
        title: 'PIO & Student Services',
        animation: google.maps.Animation.DROP
    });
    marker3 = new google.maps.Marker({
        position: {lat:47.546098, lng: -122.352352},
        map: map,
        title: 'South Parking Lot',
        animation: google.maps.Animation.DROP
    });
    marker4 = new google.maps.Marker({
        position: {lat:47.546420, lng: -122.351145},
        map: map,
        title: 'Tennis & Basketball Courts',
        animation: google.maps.Animation.DROP
    });

///////////////// Popup Information
	popupInfo = "<div style='width:200px; height:80px;'><b>PIO & Student Services</b><br>";
	popupInfo += "<a href='https://maps.google.com?saddr=Current+Location&daddr=47.5478588,-122.352595' class='poplinks'>Get Directions</a>		<br>";
	popupInfo += "<a href='http://www.southseattle.edu/pio/' class='poplinks'>More Information</a>";
	popupInfo += "<br>(206) 934-6875</div>";

	popupInfo2 = "<div style='width:200px; height:80px;'><b>Teachers Offices</b><br>";
	popupInfo2 += "<a href='http://www.southseattle.edu/pio/' class='poplinks'>More Information</a>";
	popupInfo2 += "<br>(206) 934-6875</div>";

	popupInfo3 = "<div style='width:200px; height:70px;'><b>South Parking Lot</b><br>";
	popupInfo3 += "<a class='poplinks' href='http://www.southseattle.edu/services/parking.aspx'>Buy Parking Pass</a>";
	popupInfo3 += "<br>Security: (206) 934-6875</div>";

	popupInfo4 = "<div style='width:200px; height:70px;'><b>Tennis & Basketball Courts</b><br>";
	popupInfo4 += "<a href='https://maps.google.com?saddr=Current+Location&daddr=47.546420,-122.351145' class='poplinks'>Get Directions</a>		<br>";
	popupInfo4 += "<a href='http://www.southseattle.edu/student-life/campus-recreation/' class='poplinks'>More Information</a></div>";

//////////////// Info Windows		
	infowindow = new google.maps.InfoWindow({
		content: popupInfo
	});
	infowindow2 = new google.maps.InfoWindow({
		content: popupInfo2
	});
	infowindow3 = new google.maps.InfoWindow({
		content: popupInfo3
	});
	infowindow4 = new google.maps.InfoWindow({
		content: popupInfo4
	});

//////////////// Event Listeners
	document.getElementById('text1').addEventListener('click', function() {
		document.getElementById('text1').value = "Finding you...";
		setTimeout(looking, 4000);
		function looking() { document.getElementById('text1').value = 'Show My Location'; }
		});
	document.getElementById('box').addEventListener('click', function() {
		document.getElementById('box').style.display = 'none';
	});
	google.maps.event.addListener(marker, 'click', function() {
        map.panTo(marker.getPosition());
	    map.setZoom(18);
		infowindow.open(map, marker);			
	});
	google.maps.event.addListener(marker2, 'click', function() {
    	map.panTo(marker2.getPosition());
		map.setZoom(18);
        infowindow2.open(map, marker2);
	});
	google.maps.event.addListener(marker3, 'click', function() {
		map.panTo(marker3.getPosition());
        map.setZoom(18);
        infowindow3.open(map, marker3);
	});
	google.maps.event.addListener(marker4, 'click', function() {
		map.panTo(marker4.getPosition());
        map.setZoom(18);
        infowindow4.open(map, marker4);
	});

	document.getElementById("text1").addEventListener("click", function() {
		//infowindow.open(map, marker)
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				var youwindow = new google.maps.InfoWindow({
					map: map,
					position: pos,
					content: "<div style='width:200px; height:44px'><b>YOU ARE HERE<br><span style='font-size:10px; color:red';><i>(May be wrong if you\'re not using a phone)</i></b></span></div>"
				});
				map.setCenter(pos);
			}, function() {
				handleNoGeolocation(true);
			});
		} else {
		// Browser doesn't support Geolocation
			handleNoGeolocation(false);
		}
		function handleNoGeolocation(errorFlag) {
			alert("Enable geolocation to view location");
		}
	});
	}
