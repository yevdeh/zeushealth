(function () {
	var animationDuration = 10000
	var animationStepDuration = 100
	var animationStepsCount = animationDuration / animationStepDuration
	var animationCurrentStep = 0

	var listItems = document.querySelectorAll('.loader-module_progressDescription__oBmp9 li')
	var listItemsLength = listItems.length
	var listStepDuration = 2000
	var listStepPerAnimationStep = listStepDuration / animationStepDuration
	var listCurrentStep = 0

	var loader = document.querySelector('.loader-module_coloredCircle__R3CaB circle')
	var loaderInitialValue = 647
	var loaderCurrentValue = loaderInitialValue
	var loaderValueDiffPerStep = loaderInitialValue / animationStepsCount

	var percent = document.querySelector('.loader-module_progress__Fbp4n span:first-child')

	function animateList() {
		if (animationCurrentStep % listStepPerAnimationStep) return
		listItems[listCurrentStep].classList.add('loader-module_isHidden__HERX0')
		listItems[listCurrentStep].style.opacity = 0
		listItems[listCurrentStep + 1].style.opacity = 1
		for (var i = listCurrentStep + 2; i < listItemsLength; i++) {
			listItems[i].style.opacity = 0.8 - i * 0.1
		}
		listCurrentStep += 1
	}

	function animateLoader() {
		animationCurrentStep += 1
		loaderCurrentValue -= loaderValueDiffPerStep
		loader.setAttribute('stroke-dashoffset', loaderCurrentValue)
	}

	function animatePercent() {
		percent.textContent = animationCurrentStep
	}

	var interval = setInterval(function () {
		if (animationCurrentStep === animationStepsCount) {
			clearInterval(interval)
			setTimeout(function () {
				window.location.href = '/email.html'
			}, 1000);
			return
		}
		animateLoader()
		animatePercent()
		animateList()
	}, animationStepDuration);
}())
