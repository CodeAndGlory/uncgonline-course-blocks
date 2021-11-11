import { useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return { JSX.Element } Element to render.
 */
export default function Save(props) {
	// console.log(props.attributes)
	return (
		<div {...useBlockProps.save()}>
			<Button
				className="btn btn-outline-secondary btlo-nav-button"
				id={
					'nav-' +
					props.attributes.navClientId +
					'-button-' +
					props.attributes.buttonIndex
				}
				disabled={!props.attributes.targetNodeClientId}
				data-targetNode={props.attributes.targetNodeClientId}
			>
				{__(props.attributes.buttonText)}
			</Button>
		</div>
	);
}
