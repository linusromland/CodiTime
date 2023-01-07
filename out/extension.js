"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// External dependencies
const vscode_1 = require("vscode");
function activate(context) {
    const disposable = vscode_1.commands.registerCommand('codetracker.activate', () => {
        vscode_1.window.showInformationMessage('CodeTracker activated!');
        startCodeTracker();
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function startCodeTracker() {
    // Get OS and hostname
    const operatingSystem = process.platform;
    const hostname = require('os').hostname();
    // Initialize the startTime, previousDocument and workspaceName variables
    let startTime = new Date();
    let previousDocument = vscode_1.window.activeTextEditor?.document.uri.path;
    let workspaceName = vscode_1.workspace.workspaceFolders?.[0].name;
    vscode_1.window.onDidChangeActiveTextEditor(() => {
        const activeDocument = vscode_1.window.activeTextEditor?.document.uri.path;
        // If there is no active document, return
        if (!activeDocument) {
            return;
        }
        // Calculate the time spent on the previous document
        const timeSpent = new Date().getTime() - startTime.getTime();
        // Log the data
        console.log('\n----------------------------------------------------------------');
        console.log(`Time spent: ${timeSpent}ms`);
        console.log(`File: ${previousDocument}`);
        console.log(`Workspace: ${workspaceName}`);
        console.log(`OS: ${operatingSystem}`);
        console.log(`Hostname: ${hostname}`);
        console.log('----------------------------------------------------------------\n');
        // Update the startTime, previousDocument and workspaceName variables
        startTime = new Date();
        previousDocument = activeDocument;
        workspaceName = vscode_1.workspace.workspaceFolders?.[0].name;
    });
}
function deactivate() {
    console.log('CodeTracker successfully deactivated!');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map