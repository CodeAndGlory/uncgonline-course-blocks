import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';
import './style.scss';
import './editor.scss';

export const BtloNavConfig = {
	apiVersion: 2,
	title: __('BTLO nav block', 'uncgonline-course-blocks'),
	description: __(
		'A row of navigation buttons inside a BTLO-node.',
		'uncgonline-course-blocks'
	),
	icon: 'editor-insertmore',
	category: 'text',
	parent: ['uncgonline-block/btlo-node'],
	supports: {
		html: false,
	},
	attributes: {
		parentClientId: {
			type: 'string',
		},
		clientId: {
			type: 'string',
		},
		navIndex: {
			type: 'integer',
		},
	},
	example: {},
	usesContext: ['uncgonline-course-blocks/btlo-node/clientId'],
	providesContext: {
		'uncgonline-course-blocks/btlo-nav/navIndex': 'navIndex',
		'uncgonline-course-blocks/btlo-nav/clientId': 'clientId',
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
