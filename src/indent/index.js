import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';
import './style.scss';
import './editor.scss';

export const IndentConfig = {
	apiVersion: 2,
	title: __('Indent Box', 'uncgonline-course-blocks'),
	description: __(
		'Highlight special content with an indented box',
		'uncgonline-course-blocks'
	),
	icon: 'megaphone',
	category: 'text',
	supports: {
		html: false,
	},
	attributes: {
		indentType: {
			type: 'string',
		},
	},
	example: {
		attributes: {
			indentType: 'reading',
		},
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
