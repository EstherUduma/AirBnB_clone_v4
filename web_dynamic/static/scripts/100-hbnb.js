$(document).ready(function () {
  let checkedAmenities = {};
  let checkedStates = {};
  let checkedCities = {};


  (document).on('change', "input[type='checkbox']", function () {
      const id = $(this).data('id');
      const name = $(this).data('name');
      
      if (this.checked) {
        if ($(this).hasClass('state')) {
          checkedStates[id] = name;
        } else if ($(this).hasClass('city')) {
          checkedCities[id] = name;
        }
        else if ($(this).hasClass('amenity')) {
          checkedAmenities[id] = name;
        }
      } else {
        if ($(this).hasClass('state')) {
          delete checkedStates[id];
        } else if ($(this).hasClass('city')) {
          delete checkedCities[id];
        }else if ($(this).hasClass('amenity')) {
          delete checkedAmenities[id];
        }
      }
      const statesList = Object.values(checkedStates).join(', ');
      const citiesList = Object.values(checkedCities).join(', ');
      const amenitiesList = Object.values(checkedAmenities).join(', ');
      const locations = statesList + ', ' + citiesList;
      
      $('div.locations > h4').text(locations);
    });

  const link = "http://" + window.location.hostname;
  $(function () {
    const apiUrl = link + ":5001/api/v1/status/";
    $.get(apiUrl, function (data, status) {
      if (data.status === "OK" && status === "success") {
        $("#api_status").addClass("available");
      } else {
        $("#api_status").removeClass("available");
      }
    });
  });

  // fetch places
  $.ajax({
    url: link + ":5001/api/v1/places_search/",
    method: "POST",
    data: "{}",
    contentType: "application/json",
    dataType: "json",
    success: fillPlaces,
  });

  $("BUTTON").click(() => {
    $("SECTION.places").empty();
    $.ajax({
      url: link + ":5001/api/v1/places_search/",
      method: "POST",
      data: JSON.stringify({ 'amenities': Object.keys(checkedAmenities) }),
      contentType: "application/json",
      dataType: "json",
      success: fillPlaces,
    });
  });
});

function fillPlaces(data) {
  $("SECTION.places").append(data.map(place => {
    return `
          <article>
<h2>${place.name}</h2>
<div class="price_by_night">
<p>${place.price_by_night}</p>
</div>
<div class="information">
<div class="max_guest">
<div class="guest_image"></div>
<p>${place.max_guest}</p>
</div>
<div class="number_rooms">
<div class="bed_image"></div>
<p>${place.number_rooms}</p>
</div>
<div class="number_bathrooms">
<div class="bath_image"></div>
<p>${place.number_bathrooms}</p>
</div>
</div>
<div class="user">
</div>
<div class="description">
<p>${place.description}</p>
</div>
</article>`
  }))
};
