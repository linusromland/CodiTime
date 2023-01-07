"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// External dependencies
const vscode_1 = require("vscode");
function activate(context) {
    console.log('CodeTracker successfully activated!');
    //Hello World command
    const disposable = vscode_1.commands.registerCommand('codetracker.helloWorld', () => {
        vscode_1.window.showInformationMessage('Hello World from CodeTracker!');
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() {
    console.log('CodeTracker successfully deactivated!');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map