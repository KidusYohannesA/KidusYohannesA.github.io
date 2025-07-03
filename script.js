// Add this function to your existing script.js file

function handleButtonClick(buttonName) {
    // Create a ripple effect
    const button = event.target;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;

    button.appendChild(ripple);
    setTimeout(() => {
        ripple.remove();
    }, 600);

    // Button functionality - customize this section for your needs
    alert(`You clicked: ${buttonName}`);
    console.log(`${buttonName} button clicked!`);

    // You can replace the alert with actual navigation or functionality:
    // Example:
    // switch(buttonName) {
    //     case 'About':
    //         window.location.href = 'about.html';
    //         break;
    //     case 'Portfolio':
    //         window.location.href = 'portfolio.html';
    //         break;
    //     case 'Contact':
    //         window.location.href = 'contact.html';
    //         break;
    //     case 'Services':
    //         window.location.href = 'services.html';
    //         break;
    // }
}