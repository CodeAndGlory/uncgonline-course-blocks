import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

const ALLOWED_BLOCKS = [
	'core/image',
	'core/paragraph',
	'core/heading',
	'core/table',
	'core/list',
];

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
		context['uncgonline-course-blocks/accordion/clientId'];
	const toggleCollapse =
		context['uncgonline-course-blocks/accordion/toggleCollapse'];
	const toggleShowFirstAccordion =
		context['uncgonline-course-blocks/accordion/toggleShowFirstAccordion'];

	const paneIter = wp.data
		.select('core/block-editor')
		.getBlockIndex(clientId, parentClientId);
	const firstAccordionOpen = !!(
		paneIter === 0 && attributes.toggleShowFirstAccordion
	);

	setAttributes({ clientId });
	setAttributes({ parentClientId });
	setAttributes({ toggleCollapse });
	setAttributes({ toggleShowFirstAccordion });
	setAttributes({ paneIter });

	const blockProps = useBlockProps({
		className: 'accordion-item',
	});

	const BODY_TEMPLATE = [
		['core/paragraph', { placeholder: 'Accordion body text goes here...' }],
	];

	return (
		<div {...blockProps}>
			<h2 className="accordion-header">
				<RichText
					id={'heading-' + clientId + '-' + paneIter}
					tagName="span"
					value={attributes.header} // Any existing content, either from the database or an attribute default
					allowedFormats={['core/heading']} // Allow the content to be made bold or italic, but do not allow other formatting options
					onChange={(header) => setAttributes({ header })} // Store updated content as a block attribute
					placeholder={__('Accordion Header here...')} // Display this text before any content has been added by the user
				/>
				<button
					className={
						'accordion-button' +
						(firstAccordionOpen ? '' : ' collapsed')
					}
					data-bs-toggle="collapse"
					data-bs-target={'#collapse-' + clientId + '-' + paneIter}
					aria-expanded={firstAccordionOpen}
					aria-controls={'collapse-' + clientId + '-' + paneIter}
				/>
			</h2>
			<div
				id={'collapse-' + clientId + '-' + paneIter}
				className={
					'accordion-collapse collapse' +
					(firstAccordionOpen ? ' show' : '')
				}
				aria-labelledby={'heading-' + paneIter}
				// if toggleCollapse is true, add data-bs-parent attribute with value, otherwise omit attribute
				{...(toggleCollapse
					? { 'data-bs-parent': '#accordion-' + parentClientId }
					: {})}
			>
				<div className="accordion-body">
					<InnerBlocks
						allowedBlocks={ALLOWED_BLOCKS}
						template={BODY_TEMPLATE}
					/>
				</div>
			</div>
		</div>
	);
}
