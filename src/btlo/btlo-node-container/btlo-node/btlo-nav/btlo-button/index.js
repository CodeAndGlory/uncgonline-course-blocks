import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';
import './style.scss';
import './editor.scss';

export const BtloButtonConfig = {
	apiVersion: 2,
	title: __('BTLO nav button', 'uncgonline-course-blocks'),
	description: __(
		'A button for navigating to a BTLO-node.',
		'uncgonline-course-blocks'
	),
	icon: 'button',
	category: 'text',
	parent: ['uncgonline-block/btlo-nav'],
	supports: {
		html: false,
	},
	attributes: {
		btloClientId: {
			type: 'string',
		},
		nodeClientId: {
			type: 'string',
		},
		navClientId: {
			type: 'string',
		},
		buttonIndex: {
			type: 'integer',
		},
		targetNodeName: {
			type: 'string',
		},
		targetNodeClientId: {
			type: 'string',
			default: null
		},
		buttonText: {
			type: 'string',
			default: 'node link - click to edit',
		},
	},
	example: {},
	usesContext: [
		'uncgonline-course-blocks/btlo-node/clientId',
		'uncgonline-course-blocks/btlo-nav/clientId',
		'uncgonline-course-blocks/btlo/nodeNames',
		'uncgonline-course-blocks/btlo-node-container/clientId',
	],

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save: Save,
};
