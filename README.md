image-gallery/
├── index.html          # The main HTML file 
├── README.md           # This documentation file
├── src/
│   ├── style.css       # All styles for the application
│   └── index.js        # All JavaScript logic
│
└── .gitignore          # To exclude unnecessary files from version control

# Prerequisites
A modern web browser (like Chrome, Firefox, or Edge).
A code editor (like Visual Studio Code).
The Live Server extension for VS Code is highly recommended for the best development experience.

 # Setup and Installation
Get a Pexels API Key:
This project requires a free API key from Pexels to fetch images.
Go to https://www.pexels.com/api/ and create a free account.
Find and copy your API Key from your profile page.

# Add Your API Key:
Open the src/index.js file.
Find the following line at the top of the file:
JavaScript
# const apiKey = "YOUR_PEXELS_API_KEY_GOES_HERE";
Replace the placeholder text with your actual Pexels API key (make sure the key is inside the quotation marks).

# Run the Project:
Open the main image-gallery folder in Visual Studio Code.
Right-click the index.html file in the VS Code explorer.
Select "Open with Live Server".
Your default web browser will open with the project running.

# How the Code Works
# index.html
Contains the basic structure of the page.
Includes a container for the filter buttons (.filter-container).
Includes an empty container for the gallery (.gallery) which is filled by JavaScript.
Defines the complete structure for the lightbox (.galleryOverlay) and its internal loaders, which are hidden by default.
Links to the style.css and index.js files.

 # src/style.css
Contains all the styling for the application, including:
The responsive grid layout for the gallery (display: grid).
Styling and hover effects for the gallery items and filter buttons.
The full-screen lightbox overlay (position: fixed).
Styling for all loaders, icons, and navigation buttons.
The .no-scroll class to prevent background scrolling when the lightbox is active.

# src/index.js
This file contains all the application's logic, broken down into several key functions:
# fetchData(query):
 The core asynchronous function that fetches data from the Pexels API. It can fetch either a general "curated" list or a specific search query. It handles adding the required Authorization header with the API key.

# renderGallery(images): 
Takes an array of image objects and dynamically builds the HTML for the gallery grid. It is responsible for clearing the old gallery and creating new .item elements. It also adds the click listeners to these new items.

# setupEventListeners(): 
Sets up all the main event listeners for the application, including the filter buttons and the lightbox navigation controls (Next, Previous, Close, Escape key).
# openLightbox(index):
 Triggered when a gallery item is clicked. It is responsible for showing the lightbox, handling the image loader, and preventing background scroll.

# changeImage(index):
 Handles the logic for displaying a new image inside the lightbox.

# closeLightbox(): 
Hides the lightbox and re-enables scrolling on the main page.

The script starts by setting up the event listeners and then makes an initial call to fetchData() to populate the gallery for the first time.
