import {
	InnerBlocks,
	Inserter,
	useBlockProps,
	RichText,
} from '@wordpress/block-editor';

import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const ALLOWED_BLOCKS = ['uncgonline-block/checkpoint-question'];

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

	const { select } = wp.data;
	const parentBlock = select('core/block-editor').getBlocksByClientId(
		clientId
	)[0];
	const childBlocks = parentBlock.innerBlocks;

	const checkpointQuizDataObj = JSON.parse(attributes.checkpointQuizData);

	setAttributes({
		checkpointQuizData: JSON.stringify({
			...checkpointQuizDataObj,
			...{ introduction: attributes.introduction },
			...{ conclusion: attributes.conclusion },
		}),
	});

	return (
		<div {...useBlockProps()}>
			<h2 className="checkpoint-quiz-heading">Checkpoint Quiz</h2>
			<RichText
				tagName="div"
				className="introduction"
				value={attributes.introduction} // Any existing content, either from the database or an attribute default
				onChange={(introduction) => setAttributes({ introduction })} // Store updated content as a block attribute
				placeholder={__('Add Checkpoint Quiz introduction here...')} // Display this text before any content has been added by the user
				multiline="p"
			/>
			<InnerBlocks
				allowedBlocks={ALLOWED_BLOCKS}
				renderAppender={() => (
					<Inserter
						rootClientId={clientId}
						renderToggle={({ onToggle, disabled }) => (
							<Button
								className="add-question-btn btn btn-primary"
								onClick={onToggle}
								disabled={disabled}
								label="Add Question"
								icon="plus"
							>
								Add Question
							</Button>
						)}
						isAppender
					/>
				)}
			/>
			<RichText
				tagName="div"
				className="conclusion"
				value={attributes.conclusion} // Any existing content, either from the database or an attribute default
				onChange={(conclusion) => setAttributes({ conclusion })} // Store updated content as a block attribute
				placeholder={__('Add Checkpoint Quiz conclusion here...')} // Display this text before any content has been added by the user
				multiline="p"
			/>
		</div>
	);
}
