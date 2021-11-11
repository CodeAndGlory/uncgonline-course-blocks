import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';
import './style.scss';
import './editor.scss';

export const AccordionConfig = {
	apiVersion: 2,
	title: __('Accordion Content', 'uncgonline-course-blocks'),
	description: __(
		'An accordion is a vertically stacked list of headers that can be clicked to reveal or hide associated content.',
		'uncgonline-course-blocks'
	),
	icon: 'list-view',
	category: 'text',
	supports: {
		html: false,
	},
	attributes: {
		clientId: {
			type: 'string',
		},
		toggleEdit: {
			type: 'boolean',
			default: true,
		},
		toggleCollapse: {
			type: 'boolean',
			default: true,
		},
		toggleShowFirstAccordion: {
			type: 'boolean',
			default: true,
		},
	},
	providesContext: {
		'uncgonline-course-blocks/accordion/clientId': 'clientId',
		'uncgonline-course-blocks/accordion/toggleCollapse': 'toggleCollapse',
		'uncgonline-course-blocks/accordion/toggleShowFirstAccordion':
			'toggleShowFirstAccordion',
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
