import React, { Component } from 'react';

class Draw extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    // Variables to keep track of the mouse position and left-button status 
    this.mouseX;
    this.mouseY;
    this.mouseDown = 0;

    // Variables to keep track of the touch position
    this.touchX;
    this.touchY;

    // Keep track of the old/last position when drawing a line
    // We set it to -1 at the start to indicate that we don't have a good value for it yet
    this.lastX = -1;
    this.lastY = -1;

    // Get the specific canvas element from the HTML document
    this.canvas = document.getElementById('sketchpad');
    let canvasContainer = document.getElementById('sketchpadapp');

    this.canvas.height = canvasContainer.clientHeight;
    this.canvas.width = canvasContainer.clientWidth;

    // If the browser supports the canvas tag, get the 2d drawing context for this canvas
    if (this.canvas.getContext)
      this.ctx = this.canvas.getContext('2d');

    // Check that we have a valid context to draw on/with before adding event handlers
    if (this.ctx) {
      // React to mouse events on the canvas, and mouseup on the entire document
      this.canvas.addEventListener('mousedown', this.sketchpad_mouseDown, false);
      this.canvas.addEventListener('mousemove', this.sketchpad_mouseMove, false);
      window.addEventListener('mouseup', this.sketchpad_mouseUp, false);

      // React to touch events on the canvas
      this.canvas.addEventListener('touchstart', this.sketchpad_touchStart, false);
      this.canvas.addEventListener('touchend', this.sketchpad_touchEnd, false);
      this.canvas.addEventListener('touchmove', this.sketchpad_touchMove, false);
    }
  }

  // Draws a line between the specified position on the supplied canvas name
  // Parameters are: A canvas context, the x position, the y position, the size of the dot
  drawLine = (ctx, x, y, size) => {
    // If lastX is not set, set lastX and lastY to the current position 
    if (this.lastX === -1) {
      this.lastX = x;
      this.lastY = y;
    }

    // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
    const r = 0;
    const g = 0;
    const b = 0;
    const a = 255;

    // Select a fill style
    this.ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + "," + (a / 255) + ")";

    // Set the line "cap" style to round, so lines at different angles can join into each other
    this.ctx.lineCap = "round";

    // Draw a filled line
    this.ctx.beginPath();

    // First, move to the old (previous) position
    this.ctx.moveTo(this.lastX, this.lastY);

    // Now draw a line to the current touch/pointer position
    this.ctx.lineTo(x, y);

    // Set the line thickness and draw the line
    this.ctx.lineWidth = size;
    this.ctx.stroke();

    this.ctx.closePath();

    // Update the last position to reference the current position
    this.lastX = x;
    this.lastY = y;
  }

  // Clear the canvas context using the canvas width and height
  clearCanvas = (canvas, ctx) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Keep track of the mouse button being pressed and draw a dot at current location
  sketchpad_mouseDown = () => {
    this.mouseDown = 1;
    this.drawLine(this.ctx, this.mouseX, this.mouseY, 6);
  }

  // Keep track of the mouse button being released
  sketchpad_mouseUp = () => {
    this.mouseDown = 0;

    // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
    this.lastX = -1;
    this.lastY = -1;
  }

  // Keep track of the mouse position and draw a dot if mouse button is currently pressed
  sketchpad_mouseMove = (e) => {
    // Update the mouse co-ordinates when moved
    this.getMousePos(e);

    // Draw a dot if the mouse button is currently being pressed
    if (this.mouseDown == 1) {
      this.drawLine(this.ctx, this.mouseX, this.mouseY, 6);
    }
  }

  // Get the current mouse position relative to the top-left of the canvas
  getMousePos = (event) => {
    if (!e)
      var e = event;

    if (e.offsetX) {
      this.mouseX = e.offsetX;
      this.mouseY = e.offsetY;
    }
    else if (e.layerX) {
      this.mouseX = e.layerX;
      this.mouseY = e.layerY;
    }
  }

  // Draw something when a touch start is detected
  sketchpad_touchStart = (event) => {
    // Update the touch co-ordinates
    this.getTouchPos(event);

    this.drawLine(this.ctx, this.touchX, this.touchY, 6);

    // Prevents an additional mousedown event being triggered
    event.preventDefault();
  }

  sketchpad_touchEnd = () => {
    // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
    this.lastX = -1;
    this.lastY = -1;
  }

  // Draw something and prevent the default scrolling when touch movement is detected
  sketchpad_touchMove = (event) => {
    // Update the touch co-ordinates
    this.getTouchPos(event);

    // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
    this.drawLine(this.ctx, this.touchX, this.touchY, 6);

    // Prevent a scrolling action as a result of this touchmove triggering.
    event.preventDefault();
  }

  // Get the touch position relative to the top-left of the canvas
  // When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
  // but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
  // "target.offsetTop" to get the correct values in relation to the top left of the canvas.
  getTouchPos = (e) => {
    if (e && e.touches) {
      if (e.touches.length == 1) { // Only deal with one finger
        let touch = e.touches[0]; // Get the information for finger #1
        this.touchX = touch.pageX - touch.target.offsetLeft;
        this.touchY = touch.pageY - touch.target.offsetTop;
      }
    }
  }

  render() {
    return (
      <div id="sketchpadapp" style={{ height: '100%' }}>
        <canvas id="sketchpad">
        </canvas>
      </div>
    );
  }
}

export default Draw;
