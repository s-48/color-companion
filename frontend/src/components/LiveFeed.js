import React, { useRef, useState } from 'react';

const LiveFeed = () => {
  const videoRef = useRef(null); // Ref for the video element
  const canvasRef = useRef(null); // Ref for the canvas (for pixel analysis)
  const [stream, setStream] = useState(null); // State to store the media stream
  const [rgbValue, setRgbValue] = useState(null); // State to store the RGB value

  // Function to start the camera and get permissions
  const startCamera = async () => {
    try {
      // Request camera access
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

      // Assign the camera stream to the video element and save it in state
      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);

      // Play the video stream
      videoRef.current.play();
    } catch (err) {
      // Handle camera access errors
      console.error('Error accessing the camera: ', err);

      if (err.name === 'NotAllowedError') {
        alert('Camera access was denied. Please allow camera permissions.');
      } else if (err.name === 'NotFoundError') {
        alert('No camera device found.');
      } else {
        alert('An error occurred while accessing the camera.');
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      // Stop all tracks of the media stream
      stream.getTracks().forEach((track) => track.stop());

      // Clear the video element and state
      videoRef.current.srcObject = null;
      setStream(null);
    }
  };

  const handleClick = (event) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
  
    // Dynamically set the canvas size to match the video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  
    // Draw the current video frame on the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
    // Calculate the click position relative to the video
    const rect = video.getBoundingClientRect(); // Get video position and size
    const x = ((event.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((event.clientY - rect.top) / rect.height) * canvas.height;
  
    // Get the RGB value of the pixel at the clicked position
    const pixelData = context.getImageData(x, y, 1, 1).data;
  
    setRgbValue(`RGB(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`);
  };

  return (
    <div className="live-feed">
      <h2>Live Camera Feed</h2>
      {/* Button to start the camera */}
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={stopCamera} disabled={!stream}>Stop Camera</button>

      {/* Video feed */}
      <div>
        <video
          ref={videoRef}
          width="640"
          height="480"
          onClick={handleClick} // Handle pixel click
          style={{ cursor: 'crosshair' }}
        />
        {/* Invisible canvas for pixel analysis */}
        <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
      </div>

      {/* Display the selected RGB value */}
      {rgbValue && <p>Selected Color: {rgbValue}</p>}
    </div>
  );
};

export default LiveFeed;
