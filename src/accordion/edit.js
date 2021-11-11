import {
	InnerBlocks,
	Inserter,
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';

import {
	ToggleControl,
	PanelBody,
	PanelRow,
	Button,
} from '@wordpress/components';

const ALLOWED_BLOCKS = ['uncgonline-block/accordion-pane'];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return { JSX.Element } Element to render.
 */
export default function Edit({ attributes, setAttributes, clientId }) {
	setAttributes({ clientId });

	let accordionId = 'accordion-' + attributes.clientId;

	return (
		<div {...useBlockProps()}>
			<div className="accordion" id={accordionId}>
				<InnerBlocks
					allowedBlocks={ALLOWED_BLOCKS}
					renderAppender={() => (
						<Inserter
							rootClientId={clientId}
							renderToggle={({ onToggle, disabled }) => (
								<Button
									className="btn btn-primary"
									onClick={onToggle}
									disabled={disabled}
									label="Add Accordion Pane"
									icon="plus"
								>
									Add Accordion Pane
								</Button>
							)}
							isAppender
						/>
					)}
				/>
			</div>
			<InspectorControls>
				<PanelBody title="Accordion Settings" initialOpen={true}>
					<PanelRow>
						<ToggleControl
							label="First accordion section will be open on page load."
							checked={attributes.toggleShowFirstAccordion}
							onChange={(toggleShowFirstAccordion) =>
								setAttributes({ toggleShowFirstAccordion })
							}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label="Only one accordion section will be open at a time."
							checked={attributes.toggleCollapse}
							onChange={(toggleCollapse) =>
								setAttributes({ toggleCollapse })
							}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
		</div>
	);
}
