// Move to each page 
function goToFisrtPage(){
    window.location.href = "index.html"
}

function goToSecondPage(){
    window.location.href = "information.html"
}

function goToThirdPage(){
    window.location.href = "camera.html"
}

function goToFourthPage(){
    window.location.href = "analysis.html"
}

function goToFifthPage(){
    window.location.href = "end_or_continue.html"
}

function goToLastPage(){
    window.location.href = "last_page.html"
}

const video = document.getElementById('camera');
const captureButton = document.getElementById('captureButton');
let stream;

// Start camera on page load or call this function explicitly
function startCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(mediaStream => {
      stream = mediaStream;
      video.srcObject = mediaStream;
      captureButton.disabled = false; // Enable capture button
    })
    .catch(err => {
      console.error("Error accessing camera:", err);
      alert("Cannot access camera.");
    });
}

// Capture photo, stop camera, and go to next page
function capturePhoto() {
  // Create a canvas element to capture the current video frame
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // get the image data if you want:
  const imageData = canvas.toDataURL('image/png');

  // Stop the video stream (turn off camera)
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }

  // Save captured image to localStorage (or sessionStorage)
  localStorage.setItem('capturedImage', imageData);
  window.location.href = 'analysis.html';
  saveImage(imageData)
}

// Set up event listeners
captureButton.addEventListener('click', capturePhoto);

// Start camera as soon as page loads
startCamera();

function saveImage(imageData) {
  const link = document.createElement('a');
  link.href = imageData; // this is a base64 data URL like "data:image/png;base64,..."
  link.download = 'captured_photo.png'; // file name for the downloaded image
  document.body.appendChild(link); // required for Firefox
  link.click(); // trigger the download
  document.body.removeChild(link);
  window.location.href = 'end_or_continue.html';
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

    
