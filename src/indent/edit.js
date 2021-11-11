import {
	InnerBlocks,
	BlockControls,
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import CustomIcon from '../custom-icons.js';
import { __ } from '@wordpress/i18n';
import IndentIconButton from "./IndentIconButton";

const ALLOWED_BLOCKS = [
	'core/image',
	'core/paragraph',
	'core/heading',
	'core/list',
	'core/embed',
	'core/html'
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

	function updateIcon(icon) {
		props.setAttributes({ indentType: icon })
	}

	return (
		<div {...useBlockProps()}>
			<div className={'indent-icon'}>
				<CustomIcon icon={props.attributes.indentType} />
			</div>
			<div className={'indent-content'}>
				<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} />
			</div>
			<InspectorControls>
				<PanelBody title="Indent Box Settings" initialOpen={true}>
					<div className="indent-box-settings-label">
						To change the icon, select one below.
					</div>
					<div className={"indent-icon-options"}>
						<IndentIconButton
							icon="reading"
							selectedIcon={props.attributes.indentType}
							iconSelectedHandler={(icon) => { updateIcon(icon) }}
						/>
						<IndentIconButton
							icon="link"
							selectedIcon={props.attributes.indentType}
							iconSelectedHandler={(icon) => { updateIcon(icon) }}
						/>
						<IndentIconButton
							icon="assignment"
							selectedIcon={props.attributes.indentType}
							iconSelectedHandler={(icon) => { updateIcon(icon) }}
						/>
						<IndentIconButton
							icon="objectives"
							selectedIcon={props.attributes.indentType}
							iconSelectedHandler={(icon) => { updateIcon(icon) }}
						/>
						<IndentIconButton
							icon="discussion"
							selectedIcon={props.attributes.indentType}
							iconSelectedHandler={(icon) => { updateIcon(icon) }}
						/>
						<IndentIconButton
							icon="quiz"
							selectedIcon={props.attributes.indentType}
							iconSelectedHandler={(icon) => { updateIcon(icon) }}
						/>
						<IndentIconButton
							icon="video"
							selectedIcon={props.attributes.indentType}
							iconSelectedHandler={(icon) => { updateIcon(icon) }}
						/>
						<IndentIconButton
							icon="quote"
							selectedIcon={props.attributes.indentType}
							iconSelectedHandler={(icon) => { updateIcon(icon) }}
						/>
						<IndentIconButton
							icon="idea"
							selectedIcon={props.attributes.indentType}
							iconSelectedHandler={(icon) => { updateIcon(icon) }}
						/>
						<IndentIconButton
							icon="example"
							selectedIcon={props.attributes.indentType}
							iconSelectedHandler={(icon) => { updateIcon(icon) }}
						/>
					</div>
				</PanelBody>
			</InspectorControls>
			<BlockControls>

			</BlockControls>
		</div>
	);
}
