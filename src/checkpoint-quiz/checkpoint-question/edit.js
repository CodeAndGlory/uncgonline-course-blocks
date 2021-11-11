import {
	InnerBlocks,
	Inserter,
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';
import {
	Button,
	PanelBody,
	PanelRow,
	TextareaControl,
	ToggleControl,
} from '@wordpress/components';

const ALLOWED_BLOCKS = ['uncgonline-block/checkpoint-question-choice'];

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
	const paneIter = wp.data
		.select('core/block-editor')
		.getBlockIndex(clientId, parentClientId);

	setAttributes({ clientId });
	setAttributes({ parentClientId });
	setAttributes({ paneIter });

	return (
		<div {...useBlockProps()}>
			<h4 className="question-iter">Question {paneIter + 1}.</h4>
			<RichText
				tagName="div"
				className="question-text"
				value={attributes.question} // Any existing content, either from the database or an attribute default
				onChange={(question) => {
					setAttributes({ question });
					wp.data
						.dispatch('core/block-editor')
						.updateBlockAttributes(parentClientId, {});
				}} // Store updated content as a block attribute
				placeholder={__('Add Question text here...')} // Display this text before any content has been added by the user
			/>
			<InnerBlocks
				allowedBlocks={ALLOWED_BLOCKS}
				renderAppender={() => (
					<Inserter
						rootClientId={clientId}
						renderToggle={({ onToggle, disabled }) => (
							<Button
								className="btn btn-primary add-choice"
								onClick={onToggle}
								disabled={disabled}
								label="Add Choice"
								icon="plus"
							>
								Add Choice
							</Button>
						)}
						isAppender
					/>
				)}
			/>
			<InspectorControls>
				<PanelBody
					title="Checkpoint Question Settings"
					initialOpen={true}
				>
					<PanelRow>
						<ToggleControl
							label="Allow more than one choice (checkboxes)"
							checked={attributes.multiSelectToggle}
							onChange={(multiSelectToggle) =>
								setAttributes({ multiSelectToggle })
							}
						/>
					</PanelRow>
					{attributes.multiSelectToggle && (
						<PanelRow>
							<TextareaControl
								label="General incorrect feedback for multiselect questions"
								value={attributes.multiSelectIncorrectText}
								onChange={(multiSelectIncorrectText) =>
									setAttributes({ multiSelectIncorrectText })
								}
							/>
						</PanelRow>
					)}
					<PanelRow>
						<ToggleControl
							label="Show feedback for all choices on submission (overrides general incorrect feedback)"
							checked={attributes.showFeedbackToggle}
							onChange={(showFeedbackToggle) =>
								setAttributes({ showFeedbackToggle })
							}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label="Proceed only when the correct answer is selected"
							checked={attributes.tryAgainToggle}
							onChange={(tryAgainToggle) =>
								setAttributes({ tryAgainToggle })
							}
						/>
					</PanelRow>
					{attributes.tryAgainToggle && (
						<PanelRow>
							<TextareaControl
								label="General incorrect feedback for the above option"
								value={attributes.tryAgainIncorrectText}
								onChange={(tryAgainIncorrectText) =>
									setAttributes({ tryAgainIncorrectText })
								}
							/>
						</PanelRow>
					)}
				</PanelBody>
			</InspectorControls>
		</div>
	);
}
