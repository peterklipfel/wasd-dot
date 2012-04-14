(function() {

var dots = {};
var socket = io.connect();
var numX = 0;
var numY = 0;
var stepsize = 10;

socket.on("connect", function() {
    document.body.onkeypress = function(e) {
        socket.emit("cursor", {
           x: 0,
           y: 0
        });
        if(e.keyCode === 115)
        {
            numY++;
        }
        else if(e.keyCode === 119)
        {
            numY--;
        }
        else if(e.keyCode === 100)
        {
            numX++;
        }
        else if(e.keyCode === 97)
        {
            numX--;
        }
    };
    
    document.body.onclick = function() {
        socket.emit("click", "");
    };
});

socket.on("remove", function(id) {
    var el = dots[id];
    if (!el)
        return;
        
    document.body.removeChild(el);
    delete dots[id];
});

socket.on("click", function(id) {
    var el = dots[id];
    if (!el)
        return;
        
    el.className = "ball click";
    setTimeout(function() {
        el.className = "ball";
    }, 150);
});

socket.on("cursor", function(data) {
    var id = data.id;
    var el = dots[id];
    if (!el) {
        el = document.createElement("div");
        el.className = "ball";
        el.style.background = "hsl(" + (id*5 % 360) + ", 70%, 70%)";
        document.body.appendChild(el);
        dots[data.id] = el;
    }

    data.y += numY*stepsize;  
    data.x += numX*stepsize;

    el.style.left = data.x + "px";
    el.style.top = data.y + "px";
});

})();