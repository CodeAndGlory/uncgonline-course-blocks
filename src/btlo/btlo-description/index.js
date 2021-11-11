import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';
import './style.scss';
import './editor.scss';

export const BtloDescriptionConfig = {
	apiVersion: 2,
	title: __('BTLO description', 'uncgonline-course-blocks'),
	description: __(
		'Text to describe the BTLO.',
		'uncgonline-course-blocks'
	),
	icon: 'admin-page',
	category: 'text',
	parent: ['uncgonline-block/btlo'],
	supports: {
		html: false,
	},
	attributes: {
		btloClientId: {
			type: 'string',
		},
	},
	example: {},
	usesContext: [
		'uncgonline-course-blocks/btlo/clientId',
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
