//External dependencies
import { ExtensionContext } from 'vscode';

// Internal dependencies
import CodiTime from './CodiTime';

export function activate(context: ExtensionContext) {
	console.log(context.globalState.get('coditime'));

	new CodiTime();

	console.log('CodiTime successfully activated!');
}

export function deactivate() {
	console.log('CodiTime successfully deactivated!');
}
