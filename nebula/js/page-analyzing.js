(function () {
	var texts = [
	 'Analyzing your profile...',
	 'Identifying the planetary positions when you were born...',
	 'Creating your astrological blueprint...',
	 'Assessing personality profile...',
	 'Identifying your strengths and weaknesses...',
	 'Analyzing your compatibility...',
	 'Analyzing relationships needs...',
	 'Charting best guidance plan...',
	 'Predicting future results...',
	]
	var textsLength = texts.length

	var nodes = {
		bar: [
			document.querySelector('[data-bar-1]'),
			document.querySelector('[data-bar-2]'),
			document.querySelector('[data-bar-3]'),
		],
		checkmark: [
			document.querySelector('[data-checkmark-1]'),
			document.querySelector('[data-checkmark-2]'),
			document.querySelector('[data-checkmark-3]'),
		],
		dot: [
			document.querySelector('[data-dot-1]'),
			document.querySelector('[data-dot-2]'),
			document.querySelector('[data-dot-3]'),
		],
		percent: [
			document.querySelector('[data-percent-1]'),
			document.querySelector('[data-percent-2]'),
			document.querySelector('[data-percent-3]'),
		],
		text: document.querySelector('.gywzLB'),
	}

	var optionsCount = 3
	var animatedOptionsCount = 0
	var optionAnimationDuration = 4000
	var optionAnimationStepsCount = 100
	var optionAnimationStepDuration = optionAnimationDuration / optionAnimationStepsCount
	var optionAnimationCurrentStep = 0

	var textAnimationDuration = optionsCount * optionAnimationDuration
	var textAnimationStepsCount = textsLength
	var textAnimationStepDuration = textAnimationDuration / textAnimationStepsCount
	var textAnimationCurrentStep = 0

	function animateOptions() {
		var bar = nodes.bar[animatedOptionsCount]
		var checkmark = nodes.checkmark[animatedOptionsCount]
		var dot = nodes.dot[animatedOptionsCount]
		var percent = nodes.percent[animatedOptionsCount]

		function animateStep() {
			if (optionAnimationCurrentStep === optionAnimationStepsCount) {
				optionAnimationCurrentStep = 0
				clearInterval(interval)
				checkmark.style.display = 'inline-block'
				dot.style.display = 'none'
				animatedOptionsCount += 1
				if (animatedOptionsCount === optionsCount) {
					gtag('event', 'nebula_page_analyzing_go_next')
					setTimeout(function () {
						window.location.href = '/email.html'
					}, 1000);
				} else {
					animateOptions()
				}
				return
			}
			optionAnimationCurrentStep += 1
			bar.style.transform = 'translateX(-' + (optionAnimationStepsCount - optionAnimationCurrentStep) + '%)'
			percent.textContent = optionAnimationCurrentStep + '%'
		}

		var interval = setInterval(animateStep, optionAnimationStepDuration);
	}

	function animateText() {
		var text = nodes.text

		function animateStep() {
			if (textAnimationCurrentStep === textAnimationStepsCount) {
				clearInterval(interval)
				return
			}
			textAnimationCurrentStep += 1
			text.textContent = texts[textAnimationCurrentStep]
		}

		var interval = setInterval(animateStep, textAnimationStepDuration);
	}

	animateText()
	animateOptions()
}())
