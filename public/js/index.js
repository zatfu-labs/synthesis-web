/* Timers
 * -------------------------------------------------- */
function showTime() {
  var date = new Date();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  var session = "AM";

  if (h == 0) {
    h = 12;
  }

  if (h > 12) {
    h = h - 12;
    session = "PM";
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  var time = h + ":" + m + ":" + s + " " + session;
  document.getElementById("clock").innerText = time;
  document.getElementById("clock").textContent = time;

  setTimeout(showTime, 1000);
}
/* Preloader
* -------------------------------------------------- */
var ssPreloader = function () {
  $WIN.on("load", function () {
    // force page scroll position to top at page refresh
    $("html, body").animate({ scrollTop: 0 }, "normal");

    // will fade out the whole preloader DIV that covers the website.
    $("#preloader").delay(500).fadeOut("slow");
  });
};



showTime();
