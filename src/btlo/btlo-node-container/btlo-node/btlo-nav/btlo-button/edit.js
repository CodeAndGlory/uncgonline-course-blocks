import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, PanelRow, SelectControl, TextControl, Tooltip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return { JSX.Element } Element to render.
 */
export default function Edit (props) {
	const nodeClientId =
		props.context['uncgonline-course-blocks/btlo-node/clientId'];
	const nodeContainerClientId =
		props.context['uncgonline-course-blocks/btlo-node-container/clientId']
	const navClientId =
		props.context['uncgonline-course-blocks/btlo-nav/clientId'];
	const buttonIndex = wp.data
		.select('core/block-editor')
		.getBlockIndex(props.clientId, navClientId);
	props.setAttributes({
		nodeContainerClientId,
		navClientId,
		buttonIndex,
	});

	// get data about all nodes in the node container
	const btloNodes = wp.data.select('core/block-editor').getBlock(nodeContainerClientId).innerBlocks;

	// get nodes that have been named and are not the current node
	let possibleTargetNodes = [];
		btloNodes.forEach(function (node) {
			if (node.attributes.nodeName !== '' && node.clientId !== nodeClientId) {
				possibleTargetNodes.push({ 'nodeName': node.attributes.nodeName, 'clientId': node.attributes.clientId});
			}
	})

	// get the current target node from the parent btlo by node name
	let targetNode = btloNodes.find(function (node) {
		return node.attributes.nodeName === props.attributes.targetNodeName
	})

	// update button display
	let buttonClasses;
	let buttonTargetText;
	// if the target node is set
	if (targetNode) {
		// set the popup text and class
		buttonTargetText = __('navigates to node "' + props.attributes.targetNodeName + '"');
		buttonClasses = 'btn btn-outline-secondary';
		props.attributes.targetNodeClientId = targetNode.clientId;
		props.attributes.targetNodeName = targetNode.attributes.nodeName;
	} else if (possibleTargetNodes.length > 0) {
		// assign the last node (that is not the current one) as target
		props.attributes.targetNodeClientId = possibleTargetNodes[possibleTargetNodes.length - 1].clientId;
		props.attributes.targetNodeName = possibleTargetNodes[possibleTargetNodes.length - 1].nodeName;
		buttonTargetText = 'navigates to node "' + props.attributes.targetNodeName + '"';
		buttonClasses = 'btn btn-outline-secondary';
		// if no target is set and there are no other nodes
	} else {
		// update classes and popup
		buttonClasses = 'btn btn-outline-danger';
		buttonTargetText = __('no target available');
	}

	// generate options for target node select control
	let targetNodeOptions;
	if (possibleTargetNodes.length > 0) {
		targetNodeOptions = [];
		possibleTargetNodes.forEach(function (node) {
			targetNodeOptions.push({ label: node.nodeName, value: node.clientId });
		})
		buttonClasses = 'btn btn-outline-secondary';
	} else {
		targetNodeOptions = [{ label: __('no nodes ready'), value: null }];
		props.attributes.targetNodeClientId = null;
	}

	// change the target node
	const handleTargetChange = () => {
		let newTargetClientId = document.getElementById(
			'nav-' + navClientId + '-button-' + buttonIndex + '-target'
		).value;
		if (newTargetClientId) {
			props.attributes.targetNodeClientId = newTargetClientId;
			props.attributes.targetNodeName = possibleTargetNodes.find(function (node) {
				return node.clientId = newTargetClientId;
			}).nodeName;
		}
		console.log(props.attributes.targetNodeName)
	};

	return (
		<div { ...useBlockProps() }>
			<Tooltip
				text={ __(buttonTargetText) }
				position="bottom center"
			>
				<Button
					className={ buttonClasses }
					id={ 'nav-' + navClientId + '-button-' + buttonIndex }
				>
					{ __(props.attributes.buttonText) }
				</Button>
			</Tooltip>
			<InspectorControls>
				<PanelBody title={ __('Button Settings') } initialOpen={ true }>
					<PanelRow>
						<TextControl
							label={ __(
								'Button text:'
							) }
							value={ props.attributes.buttonText }
							id={
								'nav-' +
								navClientId +
								'-button-' +
								buttonIndex +
								'-text'
							}
							onChange={ (newText) => props.setAttributes({ buttonText: newText }) }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							label={ __(
								'Navigates to node:'
							) }
							value={ props.attributes.targetNodeClientId }
							id={
								'nav-' +
								navClientId +
								'-button-' +
								buttonIndex +
								'-target'
							}
							onChange={ () => handleTargetChange() }
							options={ targetNodeOptions }
							disable={!props.attributes.targetNodeClientId}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
		</div>
	);
}
