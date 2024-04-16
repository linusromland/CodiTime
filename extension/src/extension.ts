//External dependencies
import { ExtensionContext, commands, window } from 'vscode';

// Internal dependencies
import { API_KEY_KEY, API_URL } from './util/constants';
import CodiTime from './CodiTime';

export function activate(context: ExtensionContext) {
	//Check if api key is set
	if (!context.globalState.get(API_KEY_KEY)) {
		setKey(context);
	}

	//Register command for changing api key
	const disposableKey = commands.registerCommand('coditime.apiKey', () => setKey(context));
	const disposableUrl = commands.registerCommand('coditime.apiUrl', () => setAPIUrl(context));
	context.subscriptions.push(disposableKey, disposableUrl);

	//Initialize CodiTime
	new CodiTime(context);

	console.log('CodiTime successfully activated!');
}

/**
 * Function to show input box for setting the API key
 * @param context ExtensionContext - The extension context
 */
async function setKey(context: ExtensionContext) {
	const value = await window.showInputBox({
		placeHolder: 'Enter your CodiTime API Key',
		prompt: 'Enter your CodiTime API Key',
		ignoreFocusOut: true,
		value: context.globalState.get(API_KEY_KEY)
	});

	if (value) {
		context.globalState.update(API_KEY_KEY, value);
	}
}

/**
 * Function to show input box for setting the API URL
 * @param context ExtensionContext - The extension context
 */
async function setAPIUrl(context: ExtensionContext) {
	let value = await window.showInputBox({
		placeHolder: 'Enter your CodiTime API URL',
		prompt: 'Enter your CodiTime API URL',
		ignoreFocusOut: true,
		value: context.globalState.get(API_URL)
	});

	if (value) {
		// Check if value is a valid URL
		if (value.startsWith('http://') || value.startsWith('https://')) {
			// Check if value ends with a slash
			if (value.endsWith('/')) {
				value = value.slice(0, value.length - 1);
			}

			context.globalState.update(API_URL, value);
		} else {
			window.showErrorMessage('Invalid URL');
		}
	}
}

export function deactivate() {
	console.log('CodiTime successfully deactivated!');
}
