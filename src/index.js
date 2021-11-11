/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */

import { IndentConfig } from './indent';
import { AccordionConfig } from './accordion';
import { AccordionPaneConfig } from './accordion/accordion-pane';
import { TabsConfig } from './tabs';
import { TabPaneConfig } from './tabs/tab-pane';
import { BtloConfig } from './btlo';
import { BtloDescriptionConfig } from './btlo/btlo-description';
import { BtloNodeContainerConfig } from './btlo/btlo-node-container';
import { BtloNodeConfig } from './btlo/btlo-node-container/btlo-node';
import { BtloNavConfig } from './btlo/btlo-node-container/btlo-node/btlo-nav';
import { BtloButtonConfig } from './btlo/btlo-node-container/btlo-node/btlo-nav/btlo-button';
import { CheckpointQuizConfig } from './checkpoint-quiz';
import { CheckpointQuestionConfig } from './checkpoint-quiz/checkpoint-question';
import { CheckpointQuestionChoiceConfig } from './checkpoint-quiz/checkpoint-question/checkpoint-question-choice';

/**
 * import bootstrap js and scss
 */
import '../node_modules/bootstrap/scss/bootstrap.scss';

// import "bootstrap";
import './style.scss';
import './editor.scss';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType('uncgonline-block/indent', IndentConfig);

registerBlockType('uncgonline-block/tabs', TabsConfig);
registerBlockType('uncgonline-block/tab-pane', TabPaneConfig);

registerBlockType('uncgonline-block/accordion', AccordionConfig);
registerBlockType('uncgonline-block/accordion-pane', AccordionPaneConfig);

registerBlockType('uncgonline-block/btlo', BtloConfig);
registerBlockType('uncgonline-block/btlo-description', BtloDescriptionConfig);
registerBlockType('uncgonline-block/btlo-node-container', BtloNodeContainerConfig);
registerBlockType('uncgonline-block/btlo-node', BtloNodeConfig);
registerBlockType('uncgonline-block/btlo-nav', BtloNavConfig);
registerBlockType('uncgonline-block/btlo-button', BtloButtonConfig);

registerBlockType('uncgonline-block/checkpoint-quiz', CheckpointQuizConfig);
registerBlockType('uncgonline-block/checkpoint-question', CheckpointQuestionConfig);
registerBlockType('uncgonline-block/checkpoint-question-choice', CheckpointQuestionChoiceConfig);
