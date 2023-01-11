// External dependencies
import { ExtensionContext, window, workspace } from 'vscode';
import axios from 'axios';

// Internal dependencies
import { API_KEY_KEY } from './util/constants';

const TIMEOUT_TIME = 1000 * 30; // 30 seconds

export default class CodiTime {
	private context: ExtensionContext;

	private operatingSystem: string;
	private hostname: string;
	private startTime: Date;
	private previousDocument: string;
	private workspaceName: string;
	private timeout: NodeJS.Timeout | undefined;

	constructor(context: ExtensionContext) {
		this.context = context;

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
			}
		});

		//Log on typing
		window.onDidChangeTextEditorSelection(() => {
			this.restartTimeout();
		});

		window.onDidChangeActiveTextEditor(() => {
			this.triggerTimeoutImmediately();
		});

		//Log before closing visual studio code
		process.on('exit', () => {
			this.triggerTimeoutImmediately();
		});
	}

	async sendData() {
		const activeDocument = window.activeTextEditor?.document.uri.path;

		if (!activeDocument) {
			return;
		}

		const splittedFile = this.previousDocument.split('/');

		const file = {
			path: this.previousDocument.slice(0, this.previousDocument.length - splittedFile[splittedFile.length - 1].length),
			name: splittedFile[splittedFile.length - 1].split('.')[0],
			extension: splittedFile[splittedFile.length - 1].split('.')[1]
		};

		// Calculate the time spent on the previous document
		const timeSpent = new Date().getTime() - this.startTime.getTime();

		const request = await axios.post(
			'http://localhost:3000/heartbeats',
			{
				project: this.workspaceName,
				heartbeat: {
					file,
					operatingSystem: this.operatingSystem,
					hostname: this.hostname,
					editor: 'vscode',
					time: timeSpent
				}
			},
			{
				validateStatus: () => true
			}
		);

		console.log(request.status === 201 ? 'CodiTime: Heartbeat sent!' : 'CodiTime: Heartbeat not sent!');

		// Update the startTime, previousDocument and workspaceName variables
		this.startTime = new Date();
		this.previousDocument = activeDocument || '';
		this.workspaceName = workspace.workspaceFolders?.[0].name || '';
	}

	restartTimeout() {
		clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			this.sendData();
		}, TIMEOUT_TIME);
	}

	triggerTimeoutImmediately() {
		clearTimeout(this.timeout);
		this.timeout = undefined;
		this.sendData();
	}
}
