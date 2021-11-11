import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';
import './style.scss';
import './editor.scss';

export const AccordionPaneConfig = {
	apiVersion: 2,
	title: __('Accordion Pane Content', 'uncgonline-course-blocks'),
	description: __(
		'Format content into an Accordion format',
		'uncgonline-course-blocks'
	),
	icon: 'excerpt-view',
	category: 'text',
	supports: {
		html: false,
	},
	attributes: {
		header: {
			type: 'string',
		},
		clientId: {
			type: 'string',
		},
		parentClientId: {
			type: 'string',
		},
		toggleCollapse: {
			type: 'boolean',
		},
		toggleShowFirstAccordion: {
			type: 'boolean',
		},
		paneIter: {
			type: 'number',
		},
	},
	usesContext: [
		'uncgonline-course-blocks/accordion/clientId',
		'uncgonline-course-blocks/accordion/toggleCollapse',
		'uncgonline-course-blocks/accordion/toggleShowFirstAccordion',
	],
	parent: ['uncg-block/accordion'],

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save: Save,
};
