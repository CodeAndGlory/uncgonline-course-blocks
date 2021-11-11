import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';
import './style.scss';
import './editor.scss';

export const CheckpointQuizConfig = {
	apiVersion: 2,
	title: __('Checkpoint Quiz', 'uncgonline-course-blocks'),
	description: __(
		'A repeatable, multiple choice checkpoint quiz.',
		'uncgonline-course-blocks'
	),
	icon: 'flag',
	category: 'text',
	supports: {
		html: false,
	},
	attributes: {
		clientId: {
			type: 'string',
		},
		introduction: {
			type: 'string',
			default: '',
		},
		conclusion: {
			type: 'string',
			default: '',
		},
		checkpointQuizData: {
			type: 'string',
			default: '{}',
		},
	},
	providesContext: {
		'uncgonline-course-blocks/checkpoint-quiz/clientId': 'clientId',
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
