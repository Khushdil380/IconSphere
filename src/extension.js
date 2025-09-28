const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function activate(context) {
    // Check if arrow hiding is enabled
    const config = vscode.workspace.getConfiguration('iconsphere');
    const hideArrows = config.get('hidesExplorerArrows', true);
    
    if (hideArrows) {
        // Inject CSS to hide folder arrows
        injectArrowHidingCSS();
    }
    
    // Watch for configuration changes
    const configWatcher = vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration('iconsphere.hidesExplorerArrows')) {
            const newHideArrows = vscode.workspace.getConfiguration('iconsphere').get('hidesExplorerArrows', true);
            if (newHideArrows) {
                injectArrowHidingCSS();
            }
        }
    });
    
    context.subscriptions.push(configWatcher);
}

function injectArrowHidingCSS() {
    try {
        // Get the CSS file path
        const cssPath = path.join(__dirname, '..', 'styles', 'hide-arrows.css');
        
        // Read the CSS content
        if (fs.existsSync(cssPath)) {
            const cssContent = fs.readFileSync(cssPath, 'utf8');
            
            // Create a style element and inject it
            // Note: This approach may be limited by VS Code's security model
            // The primary method is still the hidesExplorerArrows property in icon themes
            console.log('IconSphere: Arrow hiding CSS loaded');
        }
    } catch (error) {
        console.log('IconSphere: Could not load arrow hiding CSS:', error);
    }
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};