//External dependencies
import { ExtensionContext, commands, window } from 'vscode';

// Internal dependencies
import { API_KEY_KEY } from './util/constants';
import CodiTime from './CodiTime';

export function activate(context: ExtensionContext) {
	//Check if api key is set
	if (!context.globalState.get(API_KEY_KEY)) {
		setKey(context);
	}

	//Register command for changing api key
	const disposable = commands.registerCommand('coditime.apiKey', () => setKey(context));
	context.subscriptions.push(disposable);

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

export function deactivate() {
	console.log('CodiTime successfully deactivated!');
}
