import { InnerBlocks, Inserter, useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const ALLOWED_BLOCKS = [
	'core/image',
	'core/paragraph',
	'core/heading',
];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return { JSX.Element } Element to render.
 */
export default function Edit (props) {

	return (
		<div { ...useBlockProps() }>
			<InnerBlocks
				allowedBlocks={ ALLOWED_BLOCKS }
				templateLock={false}
				renderAppender={() => (
					<Inserter
						rootClientId={props.clientId}
						renderToggle={({ onToggle, disabled }) => (
							<Button
								className="btn btn-primary add-block-button"
								onClick={onToggle}
								disabled={disabled}
								label={__('Add a description')}
								icon="plus"
							>
								<span>{__('Add Description Content')}</span>
							</Button>
						)}
						isAppender
					/>
				)}
			/>
		</div>

	);
}
