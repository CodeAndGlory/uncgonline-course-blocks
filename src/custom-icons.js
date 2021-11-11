import { Icon } from '@wordpress/components';
import { AssignmentIcon } from './assets/icons/assignment.js';
import { DiscussionIcon } from './assets/icons/discussion.js';
import { LinkIcon } from './assets/icons/link.js';
import { ObjectivesIcon } from './assets/icons/objectives.js';
import { QuizIcon } from './assets/icons/quiz.js';
import { QuoteIcon } from './assets/icons/quote.js';
import { ReadingIcon } from './assets/icons/reading.js';
import { VideoIcon } from './assets/icons/video.js';
import { KeyIcon } from './assets/icons/key.js';
import { PinIcon } from './assets/icons/pin.js';

const CustomIcon = (props) => {
	let iconType;
	switch (props.icon) {
		case 'reading':
			iconType = ReadingIcon;
			break;
		case 'link':
			iconType = LinkIcon;
			break;
		case 'assignment':
			iconType = AssignmentIcon;
			break;
		case 'objectives':
			iconType = ObjectivesIcon;
			break;
		case 'discussion':
			iconType = DiscussionIcon;
			break;
		case 'quiz':
			iconType = QuizIcon;
			break;
		case 'video':
			iconType = VideoIcon;
			break;
		case 'quote':
			iconType = QuoteIcon;
			break;
		case 'idea':
			iconType = KeyIcon;
			break;
		case 'example':
			iconType = PinIcon;
			break;
	}

	return <Icon icon={iconType} />;
};
export default CustomIcon;
