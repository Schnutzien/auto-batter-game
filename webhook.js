const axios = require('axios');

const webhookURL = 'YOUR_DISCORD_WEBHOOK_URL';

const sendPatchNotes = async (patchNotes) => {
    const payload = {
        content: patchNotes,
    };

    try {
        await axios.post(webhookURL, payload);
        console.log('Patch notes sent to Discord!');
    } catch (error) {
        console.error('Error sending patch notes:', error);
    }
};

// Example usage
const patchNotes = 'Patch 1.0.1: Fixed minor bugs and improved performance.';
sendPatchNotes(patchNotes);