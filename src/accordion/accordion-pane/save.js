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

	const blockProps = useBlockProps.save({
		className: 'accordion-item',
	});

	const firstAccordionOpen = !!(
		paneIter === 0 && attributes.toggleShowFirstAccordion
	);

	return (
		<div {...blockProps}>
			<h2
				className="accordion-header"
				id={'heading-' + clientId + '-' + paneIter}
			>
				<button
					className={
						'accordion-button' +
						(firstAccordionOpen ? '' : ' collapsed')
					}
					type="button"
					data-bs-toggle="collapse"
					data-bs-target={'#collapse-' + clientId + '-' + paneIter}
					aria-expanded={firstAccordionOpen}
					aria-controls={'collapse-' + clientId + '-' + paneIter}
				>
					{attributes.header}
				</button>
			</h2>
			<div
				id={'collapse-' + clientId + '-' + paneIter}
				className={
					'accordion-collapse collapse' +
					(firstAccordionOpen ? ' show' : '')
				}
				aria-labelledby={'heading-' + paneIter}
				// if toggleCollapse is true, add data-bs-parent attribute with value, otherwise omit attribute
				{...(attributes.toggleCollapse
					? { 'data-bs-parent': '#accordion-' + parentClientId }
					: {})}
			>
				<div className="accordion-body">
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}
