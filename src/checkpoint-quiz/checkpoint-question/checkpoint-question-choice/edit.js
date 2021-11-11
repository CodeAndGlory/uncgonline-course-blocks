import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

import { PanelBody, PanelRow, ToggleControl } from '@wordpress/components';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return { JSX.Element } Element to render.
 */
export default function Edit({ attributes, setAttributes, clientId, context }) {
	const parentClientId =
		context['uncgonline-course-blocks/checkpoint-quiz/clientId'];
	const multiSelectToggle =
		context[
			'uncgonline-course-blocks/checkpoint-quiz/checkpoint-question/multiSelectToggle'
		];
	const paneIter = wp.data
		.select('core/block-editor')
		.getBlockIndex(clientId, parentClientId);

	setAttributes({ clientId });
	setAttributes({ parentClientId });
	setAttributes({ paneIter });
	setAttributes({ multiSelectToggle });

	return (
		<div {...useBlockProps()}>
			<RichText
				tagName="div"
				value={attributes.choiceText} // Any existing content, either from the database or an attribute default
				onChange={(choiceText) => setAttributes({ choiceText })} // Store updated content as a block attribute
				placeholder={__('Add choice text here...')} // Display this text before any content has been added by the user
			/>
			<RichText
				tagName="div"
				className={attributes.correctToggle ? 'correct' : 'incorrect'}
				value={attributes.choiceFeedbackText} // Any existing content, either from the database or an attribute default
				onChange={(choiceFeedbackText) =>
					setAttributes({ choiceFeedbackText })
				} // Store updated content as a block attribute
				placeholder={__('Add feedback text here...')} // Display this text before any content has been added by the user
			/>
			<InspectorControls>
				<PanelBody
					title="Checkpoint Choice Settings"
					initialOpen={true}
				>
					<PanelRow>
						<ToggleControl
							label="Correct choice"
							checked={attributes.correctToggle}
							onChange={(correctToggle) =>
								setAttributes({ correctToggle })
							}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
		</div>
	);
}
