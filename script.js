// Start of designing animations for the about page
// Function to check if an element is in viewport
// This function calculates the position of an element relative to the viewport
// and returns true if the element is at least partially visible.
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

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
// This will apply the IntersectionObserver to each element.
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
            const scale = 2.0;
            const viewport = page.getViewport({ scale: scale }); // Adjust scale as needed
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            pdfViewer.appendChild(canvas);
            page.render({ canvasContext: context, viewport: viewport });
        });
    });
}

// Load the PDF.js library and then render the PDF
loadPDFjsLibrary(() => {
    const url = 'assets/documents/Kidus%20Yohannes%20-%20Fall25%20Resume.pdf';
    renderPDF(url, 'pdf-viewer');
});
