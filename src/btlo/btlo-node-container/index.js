import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';
import './style.scss';
import './editor.scss';

export const BtloNodeContainerConfig = {
	apiVersion: 2,
	title: __('BTLO node container', 'uncgonline-course-blocks'),
	description: __('contains nodes, and nothing else', 'uncgonline-course-blocks'),
	icon: 'admin-page',
	category: 'text',
	parent: ['uncgonline-block/btlo'],
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
	},
	example: {},
	providesContext: {
		'uncgonline-course-blocks/btlo-node-container/clientId': 'clientId',
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
