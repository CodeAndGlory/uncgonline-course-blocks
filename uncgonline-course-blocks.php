<?php
/**
 * Plugin Name:     UNCG Online Course Blocks
 * Description:     Example block written with ESNext standard and JSX support – build step required.
 * Version:         0.1.1
 * Author:          UNCG Online
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     uncgonline-course-blocks
 *
 * @package         uncgonline-block
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function create_block_uncgonline_course_blocks_block_init()
{
	$dir = __DIR__;

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists($script_asset_path)) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "uncgonline-block/uncgonline-course-blocks" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require($script_asset_path);
	wp_register_script(
		'uncgonline-block-uncgonline-course-blocks-block-editor',
		plugins_url($index_js, __FILE__),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_set_script_translations('uncgonline-block-uncgonline-course-blocks-block-editor', 'uncgonline-course-blocks');

	$editor_css = 'build/index.css';
	wp_register_style(
		'uncgonline-block-uncgonline-course-blocks-block-editor',
		plugins_url($editor_css, __FILE__),
		array(),
		filemtime("$dir/$editor_css")
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'uncgonline-block-uncgonline-course-blocks-block',
		plugins_url($style_css, __FILE__),
		array(),
		filemtime("$dir/$style_css")
	);

	register_block_type(
		'uncgonline-block/uncgonline-course-blocks',
		array(
			'editor_script'    => 'uncgonline-block-uncgonline-course-blocks-block-editor',
			'editor_style'     => 'uncgonline-block-uncgonline-course-blocks-block-editor',
			'style'            => 'uncgonline-block-uncgonline-course-blocks-block',
		)
	);
}

add_action('init', 'create_block_uncgonline_course_blocks_block_init');

function btlo_frontend_scripts() {
	if ( has_block( 'uncgonline-block/btlo' ) ) {
		wp_enqueue_script(
			'uncgonline-block-btlo',
			plugins_url( 'src/assets/js/btlo.js', __FILE__ ),
			array( 'jquery' ),
			filemtime( plugin_dir_path( __FILE__ ) . 'src/assets/js/btlo.js' )
		);
	}
}
add_action( 'wp_enqueue_scripts', 'btlo_frontend_scripts' );

function checkpoint_quiz_frontend_scripts() {
	if ( has_block( 'uncgonline-block/checkpoint-quiz' ) ) {
		wp_enqueue_script(
			'uncgonline-block-checkpoint-quiz',
			plugins_url( 'src/assets/js/checkpoint-quiz.js', __FILE__ ),
			array( 'jquery' ),
			filemtime( plugin_dir_path( __FILE__ ) . 'src/assets/js/checkpoint-quiz.js' )
		);
	}
}
add_action( 'wp_enqueue_scripts', 'checkpoint_quiz_frontend_scripts' );

add_filter( 'wp_kses_allowed_html', 'add_restricted_attributes_to_tags', 10, 2);

function add_restricted_attributes_to_tags($tags) {
	$tags['svg'] = array(
		'xmlns' => array(),
		'fill' => array(),
		'viewbox' => array(),
		'role' => array(),
		'aria-hidden' => array(),
		'focusable' => array(),
		'aria-labelledby' => array(),
		'class' => array()
	);

	$tags['path'] = array(
		'd' => array(),
		'fill' => array(),
		'class' => array()
	);

	$tags['button']['aria-expanded'] = true;
	$tags['button']['aria-controls'] = true;
	$tags['button']['aria-selected'] = true;

	$tags['form'] = array(
		'accept-charset' => true,
		'action' => true,
		'autocomplete' => true,
		'enctype' => true,
		'method' => true,
		'name' => true,
		'novalidate' => true,
		'rel' => true,
		'target' => true,
		'data-*' => true,
		'id' => true
	);

	$tags['input'] = array(
		'id' => true,
		'type' => true,
		'name' => true,
		'value' => true,
		'class' => true,
	);

	$tags['iframe'] = array(
		'width' => true,
		'height' => true,
		'src' => true,
		'title' => true,
		'allow' => true,
		'allowfullscreen' => true,
	);

	$tags['div']['tabindex'] = true;
	$tags['div']['aria-live'] = true;

	$tags['fieldset']['aria-controls'] = true;


	return $tags;
}
