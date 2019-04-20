// Service Worker Configuration
// Make sure to write paths as if main javascript script is allocated in the root folder
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
                          .then(res => {
                            console.log('Serviceworker succesfully loaded', res);
                          })
                          .catch(err => {
                            console.log('Service worker unavailable to register', err);
                          });
} else {
  console.log('Service Worker tech is not able on your web browser');
}

// Scroll for webapp
$(document).ready(function() {
  $("#menu u").click(function(e) {
    e.preventDefault();
    $("html, body").animate({
      scrollTop: $(this).attr('href').offset().top
    });
    return false;
  });
});