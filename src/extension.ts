// External dependencies
import { window, workspace } from 'vscode';

export function activate() {
	console.log('CodeTracker successfully activated!');

	// Get OS and hostname
	const operatingSystem = process.platform;
	const hostname = require('os').hostname();

	// Initialize the startTime, previousDocument and workspaceName variables
	let startTime = new Date();
	let previousDocument = window.activeTextEditor?.document.uri.path;
	let workspaceName = workspace.workspaceFolders?.[0].name;

	window.onDidChangeActiveTextEditor(() => {
		const activeDocument = window.activeTextEditor?.document.uri.path;

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
		workspaceName = workspace.workspaceFolders?.[0].name;
	});
}

export function deactivate() {
	console.log('CodeTracker successfully deactivated!');
}
