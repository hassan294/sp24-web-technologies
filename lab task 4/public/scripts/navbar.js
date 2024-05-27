$(document).ready(function () {
  $("#sidebarToggle").click(function () {
    openNav();
  });
  $("closeBtn").click(function () {
    closeNav();
  });
  // let x = document.cookie;
  // let userid = x.split(";")[1].split("=")[1];
});

function openNav() {
  document.getElementById("mySidebar").style.width = "200px";
  document.getElementById("main").style.marginLeft = "200px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}
