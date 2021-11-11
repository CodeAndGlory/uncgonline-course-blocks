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
		className: 'checkpoint-quiz',
		id: 'checkpoint-quiz-' + attributes.clientId,
	});
	return (
		<section
			{...blockProps}
			data-has-intro={
				!!attributes.introduction &&
				attributes.introduction !== '<p></p>'
			}
			data-has-outro={
				!!attributes.conclusion && attributes.conclusion !== '<p></p>'
			}
		>
			{!!attributes.introduction &&
				attributes.introduction !== '<p></p>' && (
					<div
						className="checkpoint-quiz-introduction checkpoint-quiz-pane"
						aria-hidden="true"
						dangerouslySetInnerHTML={{
							__html: attributes.introduction,
						}}
						tabindex="-1"
					/>
				)}

			<InnerBlocks.Content />

			{!!attributes.conclusion && attributes.conclusion !== '<p></p>' && (
				<div
					className="checkpoint-quiz-conclusion checkpoint-quiz-pane"
					aria-hidden="true"
					dangerouslySetInnerHTML={{ __html: attributes.conclusion }}
					tabindex="-1"
				/>
			)}
			<fieldset>
				<button
					type="button"
					className="btn btn-primary btn-lg previous-btn"
				>
					Previous
				</button>
				<button
					type="button"
					className="btn btn-primary btn-lg next-btn"
				>
					Next
				</button>
				<button
					type="button"
					className="btn btn-primary btn-lg reset-btn"
				>
					Reset Quiz
				</button>
			</fieldset>
		</section>
	);
}
