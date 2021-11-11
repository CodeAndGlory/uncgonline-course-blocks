import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';
import './style.scss';
import './editor.scss';

export const CheckpointQuestionChoiceConfig = {
	apiVersion: 2,
	title: __('Checkpoint Question Choice', 'uncgonline-course-blocks'),
	description: __(
		'Possible choice with corresponding feedback for a question',
		'uncgonline-course-blocks'
	),
	icon: 'yes',
	category: 'text',
	supports: {
		html: false,
	},
	attributes: {
		clientId: {
			type: 'string',
		},
		parentClientId: {
			type: 'string',
		},
		paneIter: {
			type: 'number',
		},
		choiceText: {
			type: 'string',
		},
		choiceFeedbackText: {
			type: 'string',
		},
		correctToggle: {
			type: 'boolean',
			default: false,
		},
		multiSelectToggle: {
			type: 'boolean',
			default: true,
		},
	},
	usesContext: [
		'uncgonline-course-blocks/checkpoint-quiz/clientId',
		'uncgonline-course-blocks/checkpoint-quiz/checkpoint-question/multiSelectToggle',
	],
	parent: ['uncgonline-block/checkpoint-question'],

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save: Save,
};
