// let img = new Image();
// img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
// img.onload = function() {
//   draw(this);
// };
const MAX_WIDTH = 400;
const MAX_HEIGHT = 600;

let displayCanvas;
let originalImage;
let orignalSizedCanvas = document.createElement('canvas');

let imageState = createOriginalImageState();

document.addEventListener("DOMContentLoaded", event => {
    $('#contrast').range({
        min: 0,
        max: 2,
        start: 1,
        step: 0.25,
        onChange: function(value, meta) {
            if (meta.triggeredByUser && originalImage != null) {
                if (imageState.contrast != value) {
                    imageState.contrast = value;
                    applyImageState();
                }
            }
        }
      });

    $('#brightness').range({
        min: 0,
        max: 2.0,
        start: 1.0,
        step: 0.25,
        onChange: function(value, meta) {
            if (meta.triggeredByUser && originalImage != null) {
                if (imageState.brightness != value) {
                    imageState.brightness = value;
                    applyImageState();
                }
            }
        }
      });

    $('#hue').range({
        min: -1,
        max: 1,
        start: 0,
        step: 0.25,
        onChange: function(value, meta) {
            if (meta.triggeredByUser && originalImage != null) {
                if (imageState.hue != value) {
                    imageState.hue = value;
                    applyImageState();
                }
            }
        }
      });

    $('#saturation').range({
        min: 0,
        max: 2,
        start: 1,
        step: 0.25,
        onChange: function(value, meta) {
            if (meta.triggeredByUser && originalImage != null) {
                if (imageState.saturation != value) {
                    imageState.saturation = value;
                    applyImageState();
                }
            }
        }
      });

    // menu buttons
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener("click", event => {
      
    })

    displayCanvas = document.getElementById('photoCanvas');

    // menu buttons
    const adjustButton = document.getElementById('adjust');
        adjustButton.addEventListener("click", event => {
        const adjustSubMenu = document.getElementById("adjust-sub-menu");
        const effectSubMenu = document.getElementById("effect-sub-menu");


        adjustSubMenu.style.display = "block";
        effectSubMenu.style.display = "none";
    })

    const effectButton = document.getElementById('effect');
    effectButton.addEventListener("click", event => {
        const  effectSubMenu = document.getElementById("effect-sub-menu");
        const  adjustSubMenu = document.getElementById("adjust-sub-menu");

        effectSubMenu.style.display = "block";
        adjustSubMenu.style.display = "none";
    })

    const  imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', loadImage, false);

    const openButton = document.getElementById('open');
    openButton.addEventListener("click", event => {
        imageLoader.click();
    })

    const closeButton = document.getElementById('close');
    closeButton.addEventListener("click", event => {
        closeCanvas()
    })

    const userButton = document.getElementById('user');
    userButton.addEventListener("click", event => {
      window.location.href = "http://localhost:8080/display"
    })


    const saveButton = document.getElementById('save');

    saveButton.addEventListener("click", event => {
     
    let match = document.cookie.match(new RegExp('user_id=([^;]+)'));
        fetch('http://localhost:3000/photos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                photo: {
                    user_id: match[1],
                    image: orignalSizedCanvas.toDataURL()
                }
            })
        })
        .then(res => {
  
          console.log(res.json())
        })
    })

    // effects sub-menu buttons
    const originalEffectButton = document.getElementById('original-effect');
    originalEffectButton.addEventListener("click", event => {
        imageState.filter = originalEffect;
        applyImageState();
    })

    const greyEffectButton = document.getElementById('grey-effect');
    greyEffectButton.addEventListener("click", event => {
        imageState.filter = greyEffect;
        applyImageState();
    })

    const xpro2EffectButton = document.getElementById('xpro2-effect');
    xpro2EffectButton.addEventListener("click", event => {
        imageState.filter = xpro2Effect;
        applyImageState();
    })

    const lofiEffectButton = document.getElementById('lofi-effect');
    lofiEffectButton.addEventListener("click", event => {
        imageState.filter = lofiEffect;
        applyImageState();
    })

    const hudsonEffectButton = document.getElementById('hudson-effect');
    hudsonEffectButton.addEventListener("click", event => {
        imageState.filter = hudsonEffect;
        applyImageState();
    })

});

function loadImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        originalImage = new Image();
        originalImage.onload = function(){
            drawImage(originalImage, orignalSizedCanvas, false);
            drawImage(originalImage, displayCanvas, true);
        }
        originalImage.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]); 

    // update menu
    const saveButton = document.getElementById('save');
    saveButton.style.display = "block";
    const openButton = document.getElementById('open');
    openButton.style.display = "none";
}

function closeCanvas() {
    displayCanvas.getContext('2d').clearRect(0, 0, displayCanvas.width, displayCanvas.height);
    originalImage = null;
    orignalSizedCanvas = document.createElement('canvas');
    // update menu
    const saveButton = document.getElementById('save');
    saveButton.style.display = "none";
    const openButton = document.getElementById('open');
    openButton.style.display = "block";

    const imageLoader = document.getElementById('imageLoader');
    imageLoader.value = '';
}

function drawImage(img, canvas, scaled) {
    let ctx = canvas.getContext('2d');
    let scale;
    if (scaled) {
        scale = computeScale(img.width, img.height);
    } else {
        scale = 1;
    }
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#e8e8e8';
    ctx.fillRect(canvas.width - 50, canvas.height - 20, 50, 20);

    ctx.font = "normal normal 700 14px 'Helvetica Neue'";
    ctx.fillStyle = 'rgba(0,0,0,.6)';
    ctx.textAlign = "center";
    ctx.fillText((scale * 100).toFixed(0).toString() + "%", canvas.width - 24, canvas.height - 5);
}

function computeScale(width, height) {
    if (width < MAX_WIDTH && height < MAX_HEIGHT) {
        return 1.0;
    }

    if (width > height) {
        return MAX_WIDTH / width;
    } else {
        return MAX_HEIGHT / height;
    }
}

function applyImageState() {
    orignalSizedCanvas = createTempCanvas(originalImage); 
    let ctx = orignalSizedCanvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, orignalSizedCanvas.width, orignalSizedCanvas.height);
    let data = imageData.data;

    contrast(data, imageState.contrast);
    brightness(data, imageState.brightness);
    hueRotate(data, imageState.hue);
    saturate(data, imageState.saturation);
    imageState.filter(data);
    
    ctx.putImageData(imageData, 0, 0);
    
    // copy data from tempCanvas to displayCanvas with scale
    drawImage(orignalSizedCanvas, displayCanvas, true);
}

function greyEffect(data) {
    for (let i = 0; i < data.length; i += 4) {
        let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i]     = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
    }
}

function originalEffect(data) {
}

function xpro2Effect(data) {
    contrast(data, 1.3);
    brightness(data, 0.8);
    sepia(data, 0.3);
    saturate(data, 1.5);
    hueRotate(data, -20 / 180.0);
}

function lofiEffect(data) {
    contrast(data, 1.4);
    brightness(data, 0.9);
    sepia(data, 0.05);
}

function hudsonEffect(data) {
    contrast(data, 1.2);
    brightness(data, 0.9);
    sepia(data, 0.05);
    hueRotate(data, -10 / 180.0);
}


// contrast range: 0..2
function contrast(data, contrast) {
    let intercept = 128 * (1 - contrast);
    for(let i = 0; i < data.length; i += 4){   //r,g,b,a
        data[i] = data[i] * contrast + intercept;
        data[i + 1] = data[i + 1] * contrast + intercept;
        data[i + 2] = data[i + 2] * contrast + intercept;
    }
}

// brightness: 0..2
function brightness(data, brightness) {
    for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i] * brightness;
        data[i + 1] = data[i + 1] * brightness;
        data[i + 2] = data[i + 2] * brightness;
    }
}

// https://github.com/klouskingsley/imagedata-filters/blob/master/src/filters/sepia.js
// amount: 0..1
function sepia(data, amount) {
    var compleAmount = 1 - amount
    for (let i = 0; i < data.length; i += 4) {
        r = (0.393 + 0.607 * compleAmount) * data[i]
            + (0.769 - 0.769 * compleAmount) * data[i + 1]
            + (0.189 - 0.189 * compleAmount) * data[i + 2]
        g = (0.349 - 0.349 * compleAmount) * data[i]
            + (0.684 + 0.314 * compleAmount) * data[i + 1]
            + (0.168 - 0.168 * compleAmount) * data[i + 2]
        b = (0.272 - 0.272 * compleAmount) * data[i]
            + (0.534 - 0.534 * compleAmount) * data[i + 1]
            + (0.131 + 0.869 * compleAmount) * data[i + 2]

        data[i] = r
        data[i + 1] = g
        data[i + 2] = b
    }
}

// https://github.com/klouskingsley/imagedata-filters/blob/master/src/filters/saturate.js
function saturate(data, amount) {
    for (let i = 0; i < data.length; i += 4) {
        r = (.213 + .787 * amount) * data[i]
            + (.715 - .715 * amount) * data[i + 1]
            + (.072 - .072 * amount) * data[i + 2]
        g = (.213 - .213 * amount) * data[i]
            + (.715 + .285 * amount) * data[i + 1]
            + (.072 - .072 * amount) * data[i + 2]
        b = (.213 - .213 * amount) * data[i]
            + (.715 - .715 * amount) * data[i + 1]
            + (.072 + .928 * amount) * data[i + 2]
        
        data[i] = r
        data[i + 1] = g
        data[i + 2] = b
    }
}

// https://github.com/klouskingsley/imagedata-filters/blob/master/src/filters/hueRotate.js
// amount: -1..1
function hueRotate(data, amount) {
    var valueMatric = hueRotateMatrix(amount)

    for (let i = 0; i < data.length; i += 4) {
        r = valueMatric['a00'] * data[i] 
            + valueMatric['a01'] * data[i + 1]
            + valueMatric['a02'] * data[i + 2]
            + 0 + 0
        g = valueMatric['a10'] * data[i]
            + valueMatric['a11'] * data[i + 1]
            + valueMatric['a12'] * data[i + 2]
            + 0 + 0
        b = valueMatric['a20'] * data[i]
            + valueMatric['a21'] * data[i + 1]
            + valueMatric['a22'] * data[i + 2]
        
        data[i] = r
        data[i + 1] = g
        data[i + 2] = b
    }
}

/**
 * 
 * @param {*} value 
 * 
 * 
| a00 a01 a02 |    [+0.213 +0.715 +0.072]
| a10 a11 a12 | =  [+0.213 +0.715 +0.072] +
| a20 a21 a22 |    [+0.213 +0.715 +0.072]
                        [+0.787 -0.715 -0.072]
cos(hueRotate value) *  [-0.213 +0.285 -0.072] +
                        [-0.213 -0.715 +0.928]
                        [-0.213 -0.715+0.928]
sin(hueRotate value) *  [+0.143 +0.140-0.283]
                        [-0.787 +0.715+0.072]
 */
function hueRotateMatrix(value) {
    var a00, a01, a02, a10, a11, a12, a20, a21, a22
    var cosV = Math.cos(value)
    var sinV = Math.sin(value)

    a00 = .213 + cosV * .787 + sinV * (-.213)
    a10 = .213 + cosV * (-.213) + sinV * .143
    a20 = .213 + cosV * (-.213) + sinV * (-.787)

    a01 = .715 + cosV * (-.715) + sinV * (-.715)
    a11 = .715 + cosV * (.285) + sinV * (.140)
    a21 = .715 + cosV * (-.715) + sinV * (.715)

    a02 = .072 + cosV * (-.072) + sinV * (.928)
    a12 = .072 + cosV * (-.072) + sinV * (-.283)
    a22 = .072 + cosV * (.928) + sinV * (.072)

    return {
        a00: a00,
        a01: a01,
        a02: a02,
        a10: a10,
        a11: a11,
        a12: a12,
        a20: a20,
        a21: a21,
        a22: a22
    }
}

function createTempCanvas(img) {
    let canvas = document.createElement('canvas');
    drawImage(img, canvas, false);
    return canvas;
}

function createOriginalImageState() {
    return {
        contrast: 1,
        brightness: 1.0,
        hue: 0,
        saturation: 1,
        filter: originalEffect
    };
}

