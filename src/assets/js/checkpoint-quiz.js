jQuery(document).ready(function ($) {
	$('.checkpoint-quiz').checkpointQuiz();
});

jQuery(document).ready(
	(function ($) {
		jQuery.fn.checkpointQuiz = function () {
			return this.each(function () {
				const $this = $(this);

				let iter;
				let $previousButton = $('.previous-btn', $this);
				let $nextButton = $('.next-btn', $this);
				let $resetButton = $('.reset-btn', $this);

				const $checkpointQuizPanes = $('.checkpoint-quiz-pane', $this);
				const numberOfPanes = $checkpointQuizPanes.length;

				const hasIntro = $this.data('has-intro');

				setUpQuiz();

				function setUpQuiz() {
					$checkpointQuizPanes.hide();
					iter = 0;

					// at start, disable previous, next, and reset quiz buttons
					$previousButton.attr('disabled', true);

					if (!hasIntro) {
						$nextButton.attr('disabled', true);
					} else {
						$nextButton.attr('disabled', false);
					}

					if (1 === numberOfPanes) {
						$nextButton.hide();
						$previousButton.hide();
					}

					// show first pane
					$checkpointQuizPanes.eq(iter).show();
					$checkpointQuizPanes.eq(iter).attr('aria-hidden', false);
					$previousButton.on('click', showPreviousPane);
					$nextButton.on('click', showNextPane);
					$resetButton.on('click', function () {
						destroyQuiz();
						setUpQuiz();
						$checkpointQuizPanes.eq(iter).focus();
					});

					setUpQuestions();
				}

				function setUpQuestions() {
					let $questions = $('form', $checkpointQuizPanes);

					$questions.each(function () {
						const $question = $(this);

						const tryAgainUntilCorrect = $question.data(
							'try-again'
						);
						const showFeedbackForAll = $question.data(
							'show-feedback'
						);
						const multiSelect = $question.data('multiselect');
						const $tryAgainBtn = $('.try-again-btn', $question);

						let $overallFeedbackWrapper = $(
							'.overall-feedback',
							$question
						);
						let $generalIncorrectFeedback = $(
							'.general-incorrect-feedback',
							$question
						);
						let $generalIncorrectFeedbackMulti = $(
							'.general-incorrect-feedback-multi',
							$question
						);
						let $submitButton = $('.submit-btn', $question);
						let pauseQuestion = false;

						$question.on('submit', function (event) {
							event.preventDefault();

							if (tryAgainUntilCorrect) {
								$generalIncorrectFeedback.hide();
								$generalIncorrectFeedbackMulti.hide();

								if (multiSelect) {
									// check to see if any correct answers were missed for checkboxes
									pauseQuestion =
										$(
											'input:checkbox:not(:checked)',
											$question
										)
											.parent()
											.find('.choice-feedback')
											.hasClass('correct') ||
										$('input:checked', $question)
											.parent()
											.find('.choice-feedback')
											.hasClass('incorrect');
								} else {
									pauseQuestion = $(
										'input:checked',
										$question
									)
										.parent()
										.find('.choice-feedback')
										.hasClass('incorrect');
								}

								if (pauseQuestion) {
									$generalIncorrectFeedback.show();
								}
							}

							if (!pauseQuestion) {
								if (showFeedbackForAll) {
									$('.choice-feedback', $question)
										.parent()
										.find('.choice-feedback')
										.clone()
										.appendTo($overallFeedbackWrapper)
										.show();
								} else {
									$('input:checked', $question)
										.parent()
										.find('.choice-feedback')
										.clone()
										.appendTo($overallFeedbackWrapper)
										.show();

									// if multiselect and correct choices missed also display general incorrect feedback for multiselect
									if (
										multiSelect &&
										$(
											'input:checkbox:not(:checked)',
											$question
										)
											.parent()
											.find('.choice-feedback')
											.hasClass('correct')
									) {
										$generalIncorrectFeedbackMulti.show();
									}
								}

								$submitButton.attr('disabled', true);
								$('input', $question).attr('disabled', true);

								$question.data('question-submitted', true);

								if (numberOfPanes - 1 !== iter) {
									$nextButton.attr('disabled', false);
								}
							}
						});

						$tryAgainBtn.on('click', function () {
							resetQuestion(
								$question,
								$overallFeedbackWrapper,
								$generalIncorrectFeedback,
								$generalIncorrectFeedbackMulti,
								$submitButton
							);
						});
					});
				}

				function resetQuestion(
					$question,
					$overallFeedbackWrapper,
					$generalIncorrectFeedback,
					$generalIncorrectFeedbackMulti,
					$submitButton
				) {
					$overallFeedbackWrapper.html('');
					$generalIncorrectFeedback.hide();
					$generalIncorrectFeedbackMulti.hide();
					$('.choice-feedback', $question).hide();
					$('input', $question).attr('disabled', false);
					$submitButton.attr('disabled', false);
					$question.get(0).reset();
				}

				function destroyQuestions() {
					let $questions = $('form', $checkpointQuizPanes);

					$questions.each(function () {
						let $question = $(this);
						let $overallFeedbackWrapper = $(
							'.overall-feedback',
							$question
						);
						let $generalIncorrectFeedback = $(
							'.general-incorrect-feedback',
							$question
						);
						let $generalIncorrectFeedbackMulti = $(
							'.general-incorrect-feedback-multi',
							$question
						);
						let $submitButton = $('.submit-btn', $question);
						let $tryAgainBtn = $('.try-again-btn', $question);
						$tryAgainBtn.off();
						$question.off();
						resetQuestion(
							$question,
							$overallFeedbackWrapper,
							$generalIncorrectFeedback,
							$generalIncorrectFeedbackMulti,
							$submitButton
						);
					});

					$questions.data('question-submitted', false);
				}

				function destroyQuiz() {
					$previousButton.off('click', showPreviousPane);
					$nextButton.off('click', showNextPane);
					$resetButton.off('click');
					$checkpointQuizPanes.attr('aria-hidden', true);

					destroyQuestions();
				}

				function showNextPane() {
					$previousButton.attr('disabled', false);
					$checkpointQuizPanes.eq(iter).hide();
					$checkpointQuizPanes.eq(iter).attr('aria-hidden', true);
					iter++;

					let $currentPane = $checkpointQuizPanes.eq(iter);
					let pause = false;

					if (
						$currentPane.hasClass('checkpoint-quiz-question') &&
						!$('form', $currentPane).data('question-submitted')
					) {
						pause = true;
					}

					$checkpointQuizPanes.eq(iter).show();
					$checkpointQuizPanes.eq(iter).attr('aria-hidden', false);
					$checkpointQuizPanes.eq(iter).focus();

					if (numberOfPanes - 1 === iter || pause) {
						$nextButton.attr('disabled', true);
					}
				}

				function showPreviousPane() {
					$nextButton.attr('disabled', false);
					$checkpointQuizPanes.eq(iter).hide();
					$checkpointQuizPanes.eq(iter).attr('aria-hidden', true);
					iter--;
					$checkpointQuizPanes.eq(iter).show();
					$checkpointQuizPanes.eq(iter).attr('aria-hidden', false);
					$checkpointQuizPanes.eq(iter).focus();

					if (0 === iter) {
						$previousButton.attr('disabled', true);
					}
				}
			});
		}; // end checkpointQuiz()
	})(jQuery)
);
