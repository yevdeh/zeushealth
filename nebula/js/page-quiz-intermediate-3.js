(function () {
	var animationDuration = 15000

	var loader = document.querySelector('.donut-segment')
	var loaderInitialValue = 0
	var loaderMaxValue = 100
	var loaderCurrentValue = loaderInitialValue
	var loaderStepDuration = 50
	var loaderStepsCount = animationDuration / loaderStepDuration
	var loaderCurrentStep = 0
	var loaderValueDiffPerStep = loaderMaxValue / loaderStepsCount

	var percent = document.querySelector('.percent')
	var percentCurrentValue = 0
	var percentStepDuration = animationDuration / 100

	var isLoaderAnimationFinished = false
	var isPercentAnimationFinished = false

	function animateLoader() {
		if (loaderCurrentStep === loaderStepsCount) {
			clearInterval(loaderInterval)
			isLoaderAnimationFinished = true
			goToNextPage()
			return
		}
		loaderCurrentStep += 1
		loaderCurrentValue = loaderCurrentStep * loaderValueDiffPerStep
		var attrValue = (loaderMaxValue - loaderCurrentValue) + ' ' + (loaderCurrentValue)
		loader.setAttribute('stroke-dasharray', attrValue)
	}

	function animatePercent() {
		if (percentCurrentValue === 100) {
			clearInterval(percentInterval)
			isPercentAnimationFinished = true
			goToNextPage()
			return
		}
		percentCurrentValue += 1
		percent.textContent = percentCurrentValue
	}

	function goToNextPage() {
		if (isLoaderAnimationFinished && isPercentAnimationFinished) {
			setTimeout(function () {
				window.location.href = '/quiz-10.html'
			}, 500);
		}
	}

	var loaderInterval = setInterval(animateLoader, loaderStepDuration);
	var percentInterval = setInterval(animatePercent, percentStepDuration);
}())
