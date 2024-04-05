$(document).ready(function () {
  let checkAmenities = {};
  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
      checkAmenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkAmenities[$(this).data('id')];
    }
    let lst = Object.values(checkAmenities);
    if (lst.length > 0) {
      $('div.amenities > h4').text(Object.values(checkAmenities).join(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
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
});
