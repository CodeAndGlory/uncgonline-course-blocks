import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { Icon } from '@wordpress/components';
import CustomIcon from '../custom-icons.js';

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
	return (
		<div {...useBlockProps.save()}>
			<div className={'indent-icon'}>
				<Icon
					icon={<CustomIcon icon={props.attributes.indentType} />}
				/>
			</div>
			<div className={'indent-content'}>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
