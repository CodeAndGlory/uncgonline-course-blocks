import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';
import './style.scss';
import './editor.scss';

export const BtloConfig = {
	apiVersion: 2,
	title: __('BTLO', 'uncgonline-course-blocks'),
	description: __(
		'A Branching Tree Learning Object activity.',
		'uncgonline-course-blocks'
	),
	icon: 'networking',
	category: 'text',
	supports: {
		html: false,
	},
	attributes: {
		clientId: {
			type: 'string',
		},
		nodeNames: {
			type: 'array',
			default: [],
		},
	},
	providesContext: {
		'uncgonline-course-blocks/btlo/clientId': 'clientId',
		'uncgonline-course-blocks/btlo/nodeNames': 'nodeNames',
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
