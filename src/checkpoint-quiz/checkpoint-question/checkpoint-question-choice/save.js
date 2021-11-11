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
	const parentClientId = attributes.parentClientId;
	const paneIter = attributes.paneIter;
	const clientId = attributes.clientId;
	const multiSelectToggle = attributes.multiSelectToggle;

	const blockProps = useBlockProps.save({
		className: 'question-choice',
	});

	return (
		<div {...blockProps}>
			<input
				id={'choice-' + clientId}
				type={multiSelectToggle ? 'checkbox' : 'radio'}
				name="shipping"
				value={attributes.choiceText}
			/>
			<label htmlFor={'choice-' + clientId}>
				{attributes.choiceText}
			</label>
			<div
				className={
					'choice-feedback ' +
					(attributes.correctToggle ? 'correct' : 'incorrect')
				}
			>
				{attributes.choiceFeedbackText}
			</div>
		</div>
	);
}
