// Internal dependencies
import CodiTime from './CodiTime';

export function activate() {
	new CodiTime();

	console.log('CodeTracker successfully activated!');
}

export function deactivate() {
	console.log('CodeTracker successfully deactivated!');
}
