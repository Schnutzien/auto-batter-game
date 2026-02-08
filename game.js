// Game State
const gameState = {
    score: localStorage.getItem('autoBatterScore') ? parseInt(localStorage.getItem('autoBatterScore')) : 0,
    clicks: 0,
    version: 'v0.1',
    autoClickers: 0,
    powerClickers: 0,
    superClickers: 0,
    clickPower: 1,
    currentScreen: 'mainMenu'
};

// Game Constants
const UPGRADES = {
    autoClicker: {
        name: 'Auto Clicker',
        cost: 10,
        income: 1,
        description: '+1 click/sec'
    },
    powerClicker: {
        name: 'Power Clicker',
        cost: 100,
        income: 10,
        description: '+10 clicks/sec'
    },
    superClicker: {
        name: 'Super Clicker',
        cost: 1000,
        income: 100,
        description: '+100 clicks/sec'
    }
};

// Patch Notes Data
const PATCH_NOTES = [
    {
        version: 'v0.1',
        date: '2026-02-08',
        features: [
            'Main menu system',
            'Basic game mechanics',
            'Click counter system',
            'Auto-clicker upgrades'
        ],
        bugFixes: [
            'Initial release - no bugs yet!'
        ],
        improvements: [
            'Game responsive design',
            'Local storage for save system'
        ]
    }
];

// Leaderboard Data
const leaderboard = [
    { rank: 1, name: 'AutoBatter Pro', score: 50000 },
    { rank: 2, name: 'Clicker Master', score: 45000 },
    { rank: 3, name: 'Game Enthusiast', score: 38000 },
    { rank: 4, name: 'Speed Clicker', score: 32000 },
    { rank: 5, name: 'Casual Player', score: 25000 }
];

// Initialize Game
function initGame() {
    createScreen('mainMenu');
    updateDisplay();
}

// Screen Management
function createScreen(screenName) {
    const app = document.getElementById('app');
    
    // Remove all screens
    const allScreens = document.querySelectorAll('.screen');
    allScreens.forEach(screen => screen.remove());
    
    if (screenName === 'mainMenu') {
        createMainMenuScreen();
    } else if (screenName === 'game') {
        createGameScreen();
    } else if (screenName === 'settings') {
        createSettingsScreen();
    } else if (screenName === 'leaderboard') {
        createLeaderboardScreen();
    } else if (screenName === 'patchNotes') {
        createPatchNotesScreen();
    }
    
    gameState.currentScreen = screenName;
}

// Main Menu Screen
function createMainMenuScreen() {
    const app = document.getElementById('app');
    const screen = document.createElement('div');
    screen.id = 'mainMenuScreen';
    screen.className = 'screen active';
    
    screen.innerHTML = `
        <div class="menu-container">
            <h1>⚾ Auto Batter Game</h1>
            <p>Click fast, upgrade faster, win big!</p>
            <button class="btn btn-primary" onclick="createScreen('game')">Play Game</button>
            <button class="btn btn-secondary" onclick="createScreen('leaderboard')">Leaderboard</button>
            <button class="btn btn-secondary" onclick="createScreen('patchNotes')">Patch Notes</button>
            <button class="btn btn-tertiary" onclick="createScreen('settings')">Settings</button>
        </div>
    `;
    
    app.appendChild(screen);
}

// Game Screen
function createGameScreen() {
    const app = document.getElementById('app');
    const screen = document.createElement('div');
    screen.id = 'gameScreen';
    screen.className = 'screen active';
    
    screen.innerHTML = `
        <div class="game-container">
            <div class="game-header">
                <div class="game-title">
                    <h2>⚾ Auto Batter</h2>
                    <p>Click to earn points!</p>
                </div>
                <div class="version">${gameState.version}</div>
            </div>
            
            <div class="game-stats">
                <div class="stat-box">
                    <label>Total Score</label>
                    <div class="value" id="scoreDisplay">${formatNumber(gameState.score)}</div>
                </div>
                <div class="stat-box">
                    <label>Clicks/Sec</label>
                    <div class="value" id="incomeDisplay">${calculateAutoIncome()}</div>
                </div>
            </div>
            
            <div class="clicker-area">
                <button class="click-btn" onclick="handleClick()">CLICK!</button>
            </div>
            
            <div class="upgrades">
                <h3>🚀 Upgrades</h3>
                <div class="upgrade-list">
                    <div class="upgrade-item" onclick="buyUpgrade('autoClicker')">
                        <h4>${UPGRADES.autoClicker.name}</h4>
                        <p>${UPGRADES.autoClicker.description}</p>
                        <div class="upgrade-price">Cost: ${UPGRADES.autoClicker.cost}</div>
                        <p style="font-size: 0.8rem; margin-top: 0.3rem;">Own: ${gameState.autoClickers}</p>
                    </div>
                    <div class="upgrade-item" onclick="buyUpgrade('powerClicker')">
                        <h4>${UPGRADES.powerClicker.name}</h4>
                        <p>${UPGRADES.powerClicker.description}</p>
                        <div class="upgrade-price">Cost: ${UPGRADES.powerClicker.cost}</div>
                        <p style="font-size: 0.8rem; margin-top: 0.3rem;">Own: ${gameState.powerClickers}</p>
                    </div>
                    <div class="upgrade-item" onclick="buyUpgrade('superClicker')">
                        <h4>${UPGRADES.superClicker.name}</h4>
                        <p>${UPGRADES.superClicker.description}</p>
                        <div class="upgrade-price">Cost: ${UPGRADES.superClicker.cost}</div>
                        <p style="font-size: 0.8rem; margin-top: 0.3rem;">Own: ${gameState.superClickers}</p>
                    </div>
                </div>
            </div>
            
            <div class="game-footer">
                <button class="btn btn-secondary" onclick="createScreen('mainMenu')">Menu</button>
                <button class="btn btn-secondary" onclick="createScreen('settings')">Settings</button>
            </div>
        </div>
    `;
    
    app.appendChild(screen);
    startAutoClicker();
}

// Settings Screen
function createSettingsScreen() {
    const app = document.getElementById('app');
    const screen = document.createElement('div');
    screen.id = 'settingsScreen';
    screen.className = 'screen active';
    
    screen.innerHTML = `
        <div class="settings-container">
            <h2>⚙️ Settings</h2>
            
            <div class="setting-item">
                <label>
                    <input type="checkbox" id="soundToggle" checked> 
                    Sound Effects
                </label>
            </div>
            
            <div class="setting-item">
                <label>
                    <input type="checkbox" id="musicToggle" checked> 
                    Background Music
                </label>
            </div>
            
            <div class="setting-item">
                <label>Difficulty:</label>
                <select id="difficultySelect">
                    <option value="easy">Easy (Slower progression)</option>
                    <option value="normal" selected>Normal</option>
                    <option value="hard">Hard (Faster progression)</option>
                </select>
            </div>
            
            <div class="setting-item">
                <label for="nameInput">Your Name:</label>
                <input type="text" id="nameInput" placeholder="Enter your name" style="width: 100%; padding: 0.5rem; border-radius: 5px; border: none; margin-top: 0.5rem;">
            </div>
            
            <div class="setting-item">
                <button class="btn btn-primary" onclick="resetGame()" style="width: 100%;">Reset Game</button>
            </div>
            
            <div class="settings-footer">
                <button class="btn btn-secondary" onclick="createScreen('mainMenu')">Back to Menu</button>
                <button class="btn btn-secondary" onclick="createScreen('game')">Back to Game</button>
            </div>
        </div>
    `;
    
    app.appendChild(screen);
}

// Leaderboard Screen
function createLeaderboardScreen() {
    const app = document.getElementById('app');
    const screen = document.createElement('div');
    screen.id = 'leaderboardScreen';
    screen.className = 'screen active';
    
    let leaderboardHTML = '<div class="leaderboard-list">';
    leaderboard.forEach(entry => {
        const rankClass = `rank-${entry.rank}`;
        leaderboardHTML += `
            <div class="leaderboard-item">
                <div class="leaderboard-rank ${rankClass}">#${entry.rank}</div>
                <div class="leaderboard-name">${entry.name}</div>
                <div class="leaderboard-score">${formatNumber(entry.score)}</div>
            </div>
        `;
    });
    leaderboardHTML += '</div>';
    
    screen.innerHTML = `
        <div class="leaderboard-container">
            <h2>🏆 Leaderboard</h2>
            ${leaderboardHTML}
            <div class="leaderboard-footer">
                <button class="btn btn-secondary" onclick="createScreen('mainMenu')">Back to Menu</button>
            </div>
        </div>
    `;
    
    app.appendChild(screen);
}

// Patch Notes Screen
function createPatchNotesScreen() {
    const app = document.getElementById('app');
    const screen = document.createElement('div');
    screen.id = 'patchNotesScreen';
    screen.className = 'screen active';
    
    let patchHTML = '';
    PATCH_NOTES.forEach(patch => {
        patchHTML += `
            <div class="patch-item">
                <div class="patch-version">${patch.version}</div>
                <div class="patch-date">${new Date(patch.date).toLocaleDateString('tr-TR')}</div>
                
                <div class="patch-section">
                    <h4>✨ New Features</h4>
                    <ul>
                        ${patch.features.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="patch-section">
                    <h4>🐛 Bug Fixes</h4>
                    <ul>
                        ${patch.bugFixes.map(b => `<li>${b}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="patch-section">
                    <h4>📈 Improvements</h4>
                    <ul>
                        ${patch.improvements.map(i => `<li>${i}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    });
    
    screen.innerHTML = `
        <div class="patchnotes-container">
            <h2>📝 Patch Notes</h2>
            ${patchHTML}
            <div class="patchnotes-footer">
                <button class="btn btn-secondary" onclick="createScreen('mainMenu')">Back to Menu</button>
            </div>
        </div>
    `;
    
    app.appendChild(screen);
}

// Game Functions
function handleClick() {
    gameState.score += gameState.clickPower;
    gameState.clicks++;
    updateDisplay();
    saveGame();
}

function calculateAutoIncome() {
    return (gameState.autoClickers * 1) + (gameState.powerClickers * 10) + (gameState.superClickers * 100);
}

function buyUpgrade(upgradeType) {
    const upgrade = UPGRADES[upgradeType];
    
    if (gameState.score >= upgrade.cost) {
        gameState.score -= upgrade.cost;
        
        if (upgradeType === 'autoClicker') {
            gameState.autoClickers++;
        } else if (upgradeType === 'powerClicker') {
            gameState.powerClickers++;
        } else if (upgradeType === 'superClicker') {
            gameState.superClickers++;
        }
        
        if (gameState.currentScreen === 'game') {
            createGameScreen();
        }
        updateDisplay();
        saveGame();
    } else {
        alert('Not enough points!');
    }
}

function startAutoClicker() {
    setInterval(() => {
        const autoIncome = calculateAutoIncome();
        if (autoIncome > 0) {
            gameState.score += autoIncome;
            updateDisplay();
            saveGame();
        }
    }, 1000);
}

function updateDisplay() {
    const scoreDisplay = document.getElementById('scoreDisplay');
    const incomeDisplay = document.getElementById('incomeDisplay');
    
    if (scoreDisplay) {
        scoreDisplay.textContent = formatNumber(gameState.score);
    }
    if (incomeDisplay) {
        incomeDisplay.textContent = calculateAutoIncome();
    }
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(2) + 'K';
    }
    return num.toString();
}

function saveGame() {
    localStorage.setItem('autoBatterScore', gameState.score);
}

function resetGame() {
    if (confirm('Are you sure you want to reset the game? This cannot be undone!')) {
        gameState.score = 0;
        gameState.clicks = 0;
        gameState.autoClickers = 0;
        gameState.powerClickers = 0;
        gameState.superClickers = 0;
        gameState.clickPower = 1;
        localStorage.removeItem('autoBatterScore');
        createScreen('mainMenu');
    }
}

// Start the game
window.addEventListener('DOMContentLoaded', initGame);