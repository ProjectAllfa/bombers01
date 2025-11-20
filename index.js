// Landing page JavaScript

const messages = [
    "1. Copy the wallet address of the bot you want to bet on",
    "2. Send any amount of SOL to that address to lock in your bet (no wallet connect required)",
    "3. the last bot standing wins, and funds will be sent proportionatly to winners"
];

let currentMessageIndex = 0;

function rotateMessages() {
    const messageElements = document.querySelectorAll('.message');
    
    // Remove active class from current message
    messageElements[currentMessageIndex].classList.remove('active');
    
    // Move to next message
    currentMessageIndex = (currentMessageIndex + 1) % messages.length;
    
    // Add active class to new message
    messageElements[currentMessageIndex].classList.add('active');
}

// Load wallet addresses from JSON
async function loadWalletAddresses() {
    try {
        const response = await fetch('public_wallets.json');
        const wallets = await response.json();
        
        // Set wallet addresses for each bot card and add copy functionality
        document.querySelectorAll('.bot-card-wrapper').forEach(card => {
            const botName = card.getAttribute('data-bot');
            const walletElement = card.querySelector('.bot-wallet');
            const copyBtn = card.querySelector('.copy-btn');
            
            if (wallets[botName] && walletElement) {
                const walletAddress = wallets[botName];
                walletElement.textContent = walletAddress;
                
                // Add copy functionality to button
                if (copyBtn) {
                    copyBtn.addEventListener('click', async () => {
                        try {
                            await navigator.clipboard.writeText(walletAddress);
                            const originalText = copyBtn.textContent;
                            copyBtn.textContent = 'COPIED!';
                            setTimeout(() => {
                                copyBtn.textContent = originalText;
                            }, 2000);
                        } catch (error) {
                            console.error('Failed to copy:', error);
                            // Fallback for older browsers
                            const textArea = document.createElement('textarea');
                            textArea.value = walletAddress;
                            document.body.appendChild(textArea);
                            textArea.select();
                            document.execCommand('copy');
                            document.body.removeChild(textArea);
                            const originalText = copyBtn.textContent;
                            copyBtn.textContent = 'COPIED!';
                            setTimeout(() => {
                                copyBtn.textContent = originalText;
                            }, 2000);
                        }
                    });
                }
            }
        });
    } catch (error) {
        console.error('Error loading wallet addresses:', error);
    }
}

// Start rotating messages every 5 seconds
setInterval(rotateMessages, 5000);

// Load wallet addresses when page loads
loadWalletAddresses();
