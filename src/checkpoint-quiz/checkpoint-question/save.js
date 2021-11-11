import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return { JSX.Element } Element to render.
 */
export default function Save({ attributes }) {
	const blockProps = useBlockProps.save({
		className: 'checkpoint-quiz-question checkpoint-quiz-pane',
		id: 'checkpoint-quiz-question-' + attributes.clientId,
	});
	return (
		<div {...blockProps} aria-hidden="true" tabindex="-1">
			<form
				id={'checkpoint-quiz-form-' + attributes.clientId}
				data-try-again={attributes.tryAgainToggle}
				data-show-feedback={attributes.showFeedbackToggle}
				data-multiselect={attributes.multiSelectToggle}
				data-question-submitted="false"
			>
				<fieldset>
					<legend>{attributes.question}</legend>
					<InnerBlocks.Content />
				</fieldset>
				<div className="feedback-wrapper" aria-live="polite">
					<div className="overall-feedback"></div>
					<div className="general-incorrect-feedback incorrect">
						{attributes.tryAgainIncorrectText}
					</div>
					<div className="general-incorrect-feedback-multi incorrect">
						{attributes.multiSelectIncorrectText}
					</div>
				</div>
				<fieldset
					className="question-button-wrapper"
					aria-controls={
						'checkpoint-quiz-form-' + attributes.clientId
					}
				>
					<button
						type="submit"
						aria-label="Submit Question"
						className="btn btn-primary btn-lg submit-btn"
					>
						Submit
					</button>
					<button
						type="button"
						aria-label="Reset Question"
						className="btn btn-primary btn-lg try-again-btn"
					>
						Reset Question
					</button>
				</fieldset>
			</form>
		</div>
	);
}
