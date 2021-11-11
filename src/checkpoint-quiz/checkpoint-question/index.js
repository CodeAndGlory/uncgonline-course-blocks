import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';
import './style.scss';
import './editor.scss';

export const CheckpointQuestionConfig = {
	apiVersion: 2,
	title: __('Checkpoint Question', 'uncgonline-course-blocks'),
	description: __(
		'Multiple choice question with configurable options',
		'uncgonline-course-blocks'
	),
	icon: 'editor-help',
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
		question: {
			type: 'string',
		},
		multiSelectToggle: {
			type: 'boolean',
			default: false,
		},
		multiSelectIncorrectText: {
			type: 'string',
			default: 'It looks like you missed one or more correct answers.',
		},
		showFeedbackToggle: {
			type: 'boolean',
			default: false,
		},
		tryAgainToggle: {
			type: 'boolean',
			default: false,
		},
		tryAgainIncorrectText: {
			type: 'string',
			default:
				'That is incorrect, please change your answer and try again.',
		},
	},
	usesContext: ['uncgonline-course-blocks/checkpoint-quiz/clientId'],
	providesContext: {
		'uncgonline-course-blocks/checkpoint-quiz/checkpoint-question/multiSelectToggle':
			'multiSelectToggle',
	},
	parent: ['uncgonline-block/checkpoint-quiz'],

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save: Save,
};
