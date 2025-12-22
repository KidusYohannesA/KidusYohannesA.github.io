// These elements will be animated when they come into view.
const fadeElements = document.querySelectorAll('.fade-up, .fade-right');

// Create an IntersectionObserver to monitor when elements enter or leave the viewport
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    },
    { threshold: 0.1 }
);

// Observe each element in the fadeElements NodeList
fadeElements.forEach(el => observer.observe(el));


// Function to dynamically load the PDF.js library
function loadPDFjsLibrary(callback) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js';
    script.onload = callback;
    document.head.appendChild(script);
}

// Function to render a PDF document
function renderPDF(url, pdfViewerId) {
    const pdfViewer = document.getElementById(pdfViewerId);

    pdfjsLib.getDocument(url).promise.then((pdf) => {
        pdf.getPage(1).then((page) => {
            const unscaledViewport = page.getViewport({ scale: 1.0 });

            // Calculate scale to fit the container width
            const containerWidth = pdfViewer.clientWidth - 40;
            const scale = containerWidth / unscaledViewport.width;

            const viewport = page.getViewport({ scale: scale });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            //pdfViewer.innerHTML = '';
            pdfViewer.appendChild(canvas);
            page.render({ canvasContext: context, viewport: viewport });
        });
    });
}

// Load the PDF.js library and then render the PDF
loadPDFjsLibrary(() => {
    const url = 'assets/documents/Kidus Yohannes Resume.pdf';
    renderPDF(url, 'pdf-viewer');
});

// Configuration for testing
const FLOATING_CONFIG = {
    spawnIntervalMs: 8000,
    maxElements: 5,
    size: 120,
    duration: 15000,
    animations: [
        { file: 'assets/animations/astronot.json', type: 'wobble' },
        { file: 'assets/animations/rocket.json', type: 'straight' }
    ]
};

const floatingContainer = document.getElementById('floating-container');
let activeFloatingElements = 0;

// Spawn a floating animation
function spawnFloatingElement() {
    if (activeFloatingElements >= FLOATING_CONFIG.maxElements) return;

    const anim = FLOATING_CONFIG.animations[Math.floor(Math.random() * FLOATING_CONFIG.animations.length)];

    const edge = Math.floor(Math.random() * 4);
    const vw = window.innerWidth;
    const scrollY = window.scrollY;

    // Spawn within visible area + some buffer
    const visibleTop = scrollY - 100;
    const visibleBottom = scrollY + window.innerHeight + 100;

    let startX, startY, endX, endY;

    switch (edge) {
        case 0: // Top edge - move down
            startX = Math.random() * vw;
            startY = visibleTop;
            endX = (Math.random() - 0.5) * vw * 0.5;
            endY = window.innerHeight + 200;
            break;
        case 1: // Right edge - move left
            startX = vw + FLOATING_CONFIG.size;
            startY = visibleTop + Math.random() * window.innerHeight;
            endX = -(vw + FLOATING_CONFIG.size * 2);
            endY = (Math.random() - 0.5) * window.innerHeight * 0.5;
            break;
        case 2: // Bottom edge - move up
            startX = Math.random() * vw;
            startY = visibleBottom;
            endX = (Math.random() - 0.5) * vw * 0.5;
            endY = -(window.innerHeight + 200);
            break;
        case 3: // Left edge - move right
            startX = -FLOATING_CONFIG.size;
            startY = visibleTop + Math.random() * window.innerHeight;
            endX = vw + FLOATING_CONFIG.size * 2;
            endY = (Math.random() - 0.5) * window.innerHeight * 0.5;
            break;
    }

    // Create lottie-player element
    const player = document.createElement('lottie-player');
    player.setAttribute('src', anim.file);
    player.setAttribute('background', 'transparent');
    player.setAttribute('speed', '1');
    player.setAttribute('loop', '');
    player.setAttribute('autoplay', '');
    player.classList.add('floating-element');

    // Set position and animation
    player.style.left = startX + 'px';
    player.style.top = startY + 'px';
    player.style.width = FLOATING_CONFIG.size + 'px';
    player.style.height = FLOATING_CONFIG.size + 'px';
    player.style.setProperty('--end-x', endX + 'px');
    player.style.setProperty('--end-y', endY + 'px');

    // Apply appropriate animation
    const animName = anim.type === 'wobble' ? 'float-wobble' : 'float-straight';
    player.style.animation = `${animName} ${FLOATING_CONFIG.duration}ms linear forwards`;

    floatingContainer.appendChild(player);
    activeFloatingElements++;

    // Remove after animation completes
    setTimeout(() => {
        player.remove();
        activeFloatingElements--;
    }, FLOATING_CONFIG.duration);
}

// Start spawning floating elements
setInterval(spawnFloatingElement, FLOATING_CONFIG.spawnIntervalMs);
// Spawn one immediately
spawnFloatingElement();
