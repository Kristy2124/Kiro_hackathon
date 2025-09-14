// Page Navigation Functions
  function goToFisrtPage() {
    window.location.href = "index.html";
  }

  function goToSecondPage() {
    window.location.href = "information.html";
  }

  function goToThirdPage() {
    window.location.href = "camera.html";
  }

  function goToFourthPage() {
    window.location.href = "analysis.html";
  }

  function goToFifthPage() {
    window.location.href = "end_or_continue.html";
  }

  function goToLastPage() {
    window.location.href = "last_page.html";
  }


const video = document.getElementById('camera');
const captureButton = document.getElementById('captureButton');
let stream;

// Start the camera
function startCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(mediaStream => {
      stream = mediaStream;
      video.srcObject = mediaStream;
      captureButton.disabled = false;
    })
    .catch(err => {
      console.error("Camera access error:", err);
      alert("Cannot access camera.");
    });
}

captureButton.addEventListener('click', capturePhoto);

async function capturePhoto() {
  if (video.videoWidth === 0 || video.videoHeight === 0) {
    alert("Camera not ready yet.");
    return;
  }

  // Create a canvas to capture the current frame
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Convert canvas to base64 image data URL
  const dataUrl = canvas.toDataURL('image/jpeg');

  // Stop the camera stream to free resources
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }

  try {
    // POST the image to your updated API endpoint
    const response = await fetch('https://rubbish-classifier-l1x6058gd-joycee-indexs-projects.vercel.app/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image: dataUrl,
        weight: 0.5  // you can adjust weight if needed
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API error:", errorText);
      alert("API Error: " + errorText);
      return;
    }

    // API is expected to return JSON with a "category" string
    const data = await response.json();
    // Make sure to grab the category key (adjust if API returns different structure)
    const category = data.category || data;

    console.log("✅ API Category:", category);

    // Save the category string and image data in localStorage
    localStorage.setItem('apiResult', JSON.stringify(category));
    localStorage.setItem('capturedImage', dataUrl);

    // Redirect user to analysis page
    window.location.href = 'analysis.html';

  } catch (err) {
    console.error("❌ Fetch error:", err);
    alert("Failed to analyze image. See console.");
  }
}

// Start camera on page load
startCamera();