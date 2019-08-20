
document.addEventListener("DOMContentLoaded",event => {
  
      $(document).ready(function() {
        $('#contrast').range({
            min: 0,
            max: 2.0,
            start: 1.0
        });
      });
      $(document).ready(function() {
        $('#brightness').range({
            min: 0,
            max: 2.0,
            start: 1.0
        });
      });
      $(document).ready(function() {
        $('#hue').range({
            min: 0,
            max: 2.0,
            start: 1.0 
        });
      });
      $(document).ready(function() {
        $('#saturation').range({
            min: 0,
            max: 2.0,
            start: 1.0
        });
      });

      togglemenu()




})

function togglemenu() {
    const adjustButton = document.getElementById('adjust');
    const effectButton = document.getElementById('effect');
    const adjustSubMenu = document.getElementById("adjust-sub-menu");
    const effectSubMenu = document.getElementById("effect-sub-menu");

    adjustButton.addEventListener("click", event => {
        adjustSubMenu.style.display = "block";
        effectSubMenu.style.display = "none";
    })
 
    effectButton.addEventListener("click", event => {
        effectSubMenu.style.display = "block";
        adjustSubMenu.style.display = "none";
    })
}








// brightness: 0..2
// function brightness(data, brightness) {
//     for (let i = 0; i < data.length; i += 4) {
//         data[i] = data[i] * brightness;
//         data[i + 1] = data[i + 1] * brightness;
//         data[i + 2] = data[i + 2] * brightness;
//     }
// }

 