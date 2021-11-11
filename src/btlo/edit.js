import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [
	'uncgonline-block/btlo-description',
	'uncgonline-block/btlo-node-container',
];

const TEMPLATE = [
	['uncgonline-block/btlo-description'],
	['uncgonline-block/btlo-node-container']
];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return { JSX.Element } Element to render.
 */
export default function Edit(props) {
	props.setAttributes({ clientId: props.clientId });

	return (
		<div {...useBlockProps()}>
			<div id={'btlo-' + props.attributes.clientId}>
				<InnerBlocks
					allowedBlocks={ALLOWED_BLOCKS}
					template={TEMPLATE}
					templateLock="all"
				/>
			</div>
		</div>
	);
}
