// Function to handle button clicks and create a ripple effect
function handleButtonClick(buttonName) {
    // Create a ripple effect on the button
    const button = target; // Reference to the button that was clicked
    const ripple = document.createElement('span'); // Create a new <span> element for the ripple effect
    const rect = button.getBoundingClientRect(); // Get the button's position and size
    const size = Math.max(rect.width, rect.height); // Determine the size of the ripple (largest dimension of the button)
    const x = clientX - rect.left - size / 2; // Calculate the x-coordinate for the ripple's center
    const y = clientY - rect.top - size / 2; // Calculate the y-coordinate for the ripple's center

    // Style the ripple effect
    ripple.style.cssText = `
        position: absolute; /* Position the ripple relative to the button */
        width: ${size}px; /* Set the ripple's width */
        height: ${size}px; /* Set the ripple's height */
        left: ${x}px; /* Position the ripple horizontally */
        top: ${y}px; /* Position the ripple vertically */
        background: rgba(255, 255, 255, 0.3); /* Semi-transparent white color */
        border-radius: 50%; /* Make the ripple circular */
        transform: scale(0); /* Start the ripple at scale 0 */
        animation: ripple 0.6s ease-out; /* Animate the ripple scaling up */
        pointer-events: none; /* Prevent the ripple from interfering with clicks */`
        ;

    // Add the ripple to the button
    button.appendChild(ripple);

    // Remove the ripple after the animation ends (600ms)
    setTimeout(() => {
        ripple.remove();
    }, 600);
}
// Start of designing animations for the about page
// Function to check if an element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

const fadeElements = document.querySelectorAll('.fade-up, .fade-right');

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

fadeElements.forEach(el => observer.observe(el));

// Listen for scroll and load events
window.addEventListener('scroll', checkFadeUp);
window.addEventListener('load', checkFadeUp);
