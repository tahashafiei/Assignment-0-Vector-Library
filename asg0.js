// asn0
// Taha Shafiei

var canvas;
var ctx;

function main() {
    // Retrieve <canvas> element
    canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    // Get the rendering context for 2DCG
    ctx = canvas.getContext('2d');

    var v1 = new Vector3([2.25, 2.25, 0.0]);

    ctx.fillStyle = 'black'; // Set a black color
    ctx.fillRect(0, 0, 400, 400); // Fill canvas with the color

    drawVector(v1, "red");
}

function drawVector(v, color) {
    ctx.strokeStyle = color; // line color
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, canvas.height/2);
    ctx.lineTo(200 + v.elements[0]*20, 200 - v.elements[1]*20, v.elements[2]*20);
    ctx.stroke();
}

function handleDrawEvent() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 400, 400);

    // get values from box
    var x1 = document.getElementById('x1').value;
    var y1 = document.getElementById('y1').value;
    var x2 = document.getElementById('x2').value;
    var y2 = document.getElementById('y2').value;
    
    // draw lines
    var v1 = new Vector3([x1, y1, 0.0]);
    drawVector(v1, "red");
    var v2 = new Vector3([x2, y2, 0.0]);
    drawVector(v2, "blue");

}

function handleDrawOperationEvent() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 400, 400);

    // Draw v1
    var x1 = document.getElementById('x1').value;
    var y1 = document.getElementById('y1').value;
    var v1 = new Vector3([x1, y1, 0.0]);
    drawVector(v1, "red");

    // Draw v2
    var x2 = document.getElementById('x2').value;
    var y2 = document.getElementById('y2').value;
    var v2 = new Vector3([x2, y2, 0.0]);
    drawVector(v2, "blue");

    // Draw operations
    var opt = document.getElementById('operations').value;
    if (opt == 'add'){
        v1.add(v2);
        drawVector(v1, "green");

    } else if (opt == 'sub') {
        v1.sub(v2);
        drawVector(v1, "green");

    } else if (opt == 'div') {
        var s = document.getElementById('scalar').value;

        v1.div(s);
        drawVector(v1, "green");
        v2.div(s);
        drawVector(v2, "green");

    } else if (opt == 'mult') {
        var s = document.getElementById('scalar').value;

        v1.mul(s);
        drawVector(v1, "green");
        v2.mul(s);
        drawVector(v2, "green");

    } else if (opt == 'mag') {
        console.log("Magnitude v1: " + v1.magnitude());
        console.log("Magnitude v2: " + v2.magnitude());

    } else if (opt == 'norm') {
        v1.normalize();
        drawVector(v1, "green");
        v2.normalize();
        drawVector(v2, "green");

    } else if (opt == 'angle') {
        console.log("Angle: " + angleBetween(v1, v2).toFixed(2));
    } else if (opt == 'area') {
        console.log("Area of the Triangle: " + areaTriange(v1, v2));
    }

}

function angleBetween(v1, v2) {
    var d = Vector3.dot(v1, v2);
    var mag1 = v1.magnitude();
    var mag2 = v2.magnitude();
    
    var alpha = Math.acos(d/(mag1*mag2));
    alpha *= 180 / Math.PI; // convert to degrees

    return alpha;
}

function areaTriange(v1, v2) {
    var parallelogram = Vector3.cross(v1, v2);
    var v3 = new Vector3([parallelogram[0], parallelogram[1], parallelogram[2]]);
    var area = v3.magnitude() / 2;
    return area;
}