// External dependencies
import { ExtensionContext, commands, window } from 'vscode';

export function activate(context: ExtensionContext) {
	console.log('CodeTracker successfully activated!');

	//Hello World command
	const disposable = commands.registerCommand('codetracker.helloWorld', () => {
		window.showInformationMessage('Hello World from CodeTracker!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {
	console.log('CodeTracker successfully deactivated!');
}
