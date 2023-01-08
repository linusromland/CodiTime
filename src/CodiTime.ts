// External dependencies
import { window, workspace } from 'vscode';

const TIMEOUT_TIME = 1000 * 30; // 30 seconds

export default class CodiTime {
	private operatingSystem: string;
	private hostname: string;

	private startTime: Date;
	private previousDocument: string;
	private workspaceName: string;

	private timeout: NodeJS.Timeout | undefined;

	constructor() {
		// Get OS and hostname
		this.operatingSystem = process.platform;
		this.hostname = require('os').hostname();

		// Initialize the startTime, previousDocument and workspaceName variables
		this.startTime = new Date();
		this.previousDocument = window.activeTextEditor?.document.uri.path || '';
		this.workspaceName = workspace.workspaceFolders?.[0].name || '';

		// Initialize the event listeners
		this.initalizeEventListeners();
	}

	initalizeEventListeners() {
		//Log on window focus
		window.onDidChangeWindowState((e) => {
			if (e.focused) {
				this.restartTimeout();
			} else {
				console.log('CodeTracker: Window unfocused!');
			}
		});

		//Log on typing
		window.onDidChangeTextEditorSelection(() => {
			console.log('CodeTracker: Typing!');
			this.restartTimeout();
		});

		window.onDidChangeActiveTextEditor(() => {
			this.triggerTimeoutImmediately();
			console.log('CodeTracker: Active document changed!');
		});

		//Log before closing visual studio code
		process.on('exit', () => {
			this.triggerTimeoutImmediately();
			console.log('CodeTracker: Visual Studio Code closed!');
		});
	}

	sendData() {
		const activeDocument = window.activeTextEditor?.document.uri.path;

		if (!activeDocument) {
			return;
		}

		// Calculate the time spent on the previous document
		const timeSpent = new Date().getTime() - this.startTime.getTime();

		// Log the data
		console.log('\n----------------------------------------------------------------');
		console.log(`Time spent: ${timeSpent}ms`);
		console.log(`File: ${this.previousDocument}`);
		console.log(`Workspace: ${this.workspaceName}`);
		console.log(`OS: ${this.operatingSystem}`);
		console.log(`Hostname: ${this.hostname}`);
		console.log('----------------------------------------------------------------\n');

		// Update the startTime, previousDocument and workspaceName variables
		this.startTime = new Date();
		this.previousDocument = activeDocument || '';
		this.workspaceName = workspace.workspaceFolders?.[0].name || '';
	}

	restartTimeout() {
		clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			this.sendData();
			console.log('CodeTracker: Timeout!');
		}, TIMEOUT_TIME);
	}

	triggerTimeoutImmediately() {
		clearTimeout(this.timeout);
		this.timeout = undefined;
		this.sendData();
	}
}
