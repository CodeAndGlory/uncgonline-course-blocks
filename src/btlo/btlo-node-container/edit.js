import {
	InnerBlocks, Inserter,
	useBlockProps,
} from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const ALLOWED_BLOCKS = [
	'uncgonline-block/btlo-node',
];

const TEMPLATE = [
	['uncgonline-block/btlo-node'],
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

	props.setAttributes({
		clientId: props.clientId
	});

	return (
		<div { ...useBlockProps() }>
			<InnerBlocks
				allowedBlocks={ ALLOWED_BLOCKS }
				template={ TEMPLATE }
				templateLock={false}
				renderAppender={() => (
					<Inserter
						rootClientId={props.clientId}
						renderToggle={({ onToggle, disabled }) => (
							<Button
								className="btn btn-primary add-block-button"
								onClick={onToggle}
								disabled={disabled}
								label={__('Add a node')}
								icon="plus"
							>
								<span>{__('Add Node')}</span>
							</Button>
						)}
						isAppender
					/>
				)}
			/>
		</div>
	);
}
