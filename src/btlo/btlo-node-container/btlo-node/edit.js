import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { Button, PanelBody, PanelRow, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const ALLOWED_BLOCKS = [
	'uncgonline-block/btlo-nav',
	'core/image',
	'core/paragraph',
	'core/heading',
];

const TEMPLATE = [
	['core/paragraph', { placeholder: 'Node Content' }],
	['uncgonline-block/btlo-nav'],
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
	const parentBtloClientId =
		props.context['uncgonline-course-blocks/btlo/clientId'];
	props.setAttributes({
		clientId: props.clientId,
		parentBtloClientId,
	});

	const parentAttributes = wp.data.select('core/block-editor').getBlock(parentBtloClientId)
			.attributes;

	// let nodeNames = props.context['uncgonline-course-blocks/btlo/nodeNames'];
	let nodeNames = parentAttributes.nodeNames;

	const handleNodeNameChange = () => {
		let value = document.getElementById(
			'btlo-' + parentBtloClientId + '-node-' + props.clientId + '-control'
		).value;
		// remove old id from node ids array
		const currentNodeName = props.attributes.nodeName;
		nodeNames = nodeNames.filter((element) => {
			return element.value !== currentNodeName;
		});
		// add the new id to node ids array
		nodeNames.push({ value: value, label: value });
		// update the node ids array at the outermost container level
		wp.data
			.dispatch('core/block-editor')
			.updateBlockAttributes(parentBtloClientId, { nodeNames });
		// update this node's id attribute
		props.setAttributes({ nodeName: value });
	};

	const handleDeleteSelf = () => {
		// get fresh copy of node Ids
		const nodeNames = wp.data
			.select('core/block-editor')
			.getBlock(parentBtloClientId).attributes.nodeNames;

		// remove tab data about this child from parent block
		const ownIndex = nodeNames.map((e) => e.id)
			.indexOf(props.attributes.id);
		nodeNames.splice(ownIndex, 1);
		wp.data
			.dispatch('core/block-editor')
			.updateBlockAttributes(parentBtloClientId, {
				nodeNames: nodeNames,
			});

		// remove the block that calls this method
		wp.data
			.dispatch('core/block-editor')
			.removeBlock(props.clientId, false);
	};

	let nodeNameText = 'give this node a name in the sidebar (node names are not displayed to users)';
	let labelClasses = 'node-index-label'
	if (props.attributes.nodeName) {
		nodeNameText = 'Node "' + props.attributes.nodeName + '"';
	} else {
		labelClasses += ' text-danger'
	}


	return (
		<div {...useBlockProps()}>
			<div className="edit-node-header">
				<label className={labelClasses}>
					{nodeNameText}
				</label>
				<Button
					className="delete-tab-button btn btn-sm btn-outline-danger"
					icon="no-alt"
					label={'Delete this node'}
					onClick={handleDeleteSelf.bind(this)}
				/>
			</div>
			<div className="btlo-node">
				<InnerBlocks
					allowedBlocks={ALLOWED_BLOCKS}
					template={TEMPLATE}
				/>
			</div>
			<InspectorControls>
				<PanelBody title={__('Node Settings')} initialOpen={true}>
					<PanelRow>
						<TextControl
							label={__("This node's name is:")}
							value={props.attributes.nodeName}
							id={
								'btlo-' +
								parentBtloClientId +
								'-node-' +
								props.clientId +
								'-control'
							}
							onChange={() => handleNodeNameChange()}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
		</div>
	);
}
