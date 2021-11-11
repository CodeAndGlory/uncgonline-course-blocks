import { InnerBlocks, Inserter, useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

const ALLOWED_BLOCKS = ['uncgonline-block/btlo-button'];
const TEMPLATE = [['uncgonline-block/btlo-button']];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return { JSX.Element } Element to render.
 */
export default function Edit(props) {
	const parentClientId =
		props.context['uncgonline-course-blocks/btlo-node/clientId'];
	const navIndex = wp.data
		.select('core/block-editor')
		.getBlockIndex(props.clientId, parentClientId);
	props.setAttributes({
		clientId: props.clientId,
		parentClientId,
		navIndex,
	});

	return (
		<div {...useBlockProps()}>
			<InnerBlocks
				allowedBlocks={ALLOWED_BLOCKS}
				template={TEMPLATE}
				orientation="horizontal"
				renderAppender={() => (
					<Inserter
						rootClientId={props.clientId}
						renderToggle={({ onToggle, disabled }) => (
							<Button
								className="btn btn-primary add-block-button"
								onClick={onToggle}
								disabled={disabled}
								label={__('Add a nav button')}
								icon="plus"
							>
								<span>{__('Add link')}</span>
							</Button>
						)}
						isAppender
					/>
				)}
			/>
		</div>
	);
}
