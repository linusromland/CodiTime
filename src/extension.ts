// Internal dependencies
import CodiTime from './CodiTime';

export function activate() {
	new CodiTime();

	console.log('CodiTime successfully activated!');
}

export function deactivate() {
	console.log('CodiTime successfully deactivated!');
}
