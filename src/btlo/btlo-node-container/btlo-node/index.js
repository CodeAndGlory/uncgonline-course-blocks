import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';
import './style.scss';
import './editor.scss';

export const BtloNodeConfig = {
	apiVersion: 2,
	title: __('BTLO node', 'uncgonline-course-blocks'),
	description: __('One node of a BTLO.', 'uncgonline-course-blocks'),
	icon: 'admin-page',
	category: 'text',
	parent: ['uncgonline-block/btlo-node-container'],
	supports: {
		html: false,
	},
	attributes: {
		clientId: {
			type: 'string',
		},
		btloClientId: {
			type: 'string',
		},
		nodeName: {
			type: 'string',
			default: '',
		},
	},
	example: {},
	usesContext: [
		'uncgonline-course-blocks/btlo/clientId',
		'uncgonline-course-blocks/btlo-node-container/clientId',
		'uncgonline-course-blocks/btlo/nodeNames',
	],
	providesContext: {
		'uncgonline-course-blocks/btlo-node/nodeIndex': 'nodeIndex',
		'uncgonline-course-blocks/btlo-node/clientId': 'clientId',
	},

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save: Save,
};
