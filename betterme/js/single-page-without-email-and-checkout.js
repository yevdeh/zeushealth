// addEventListener for multiple elements
function on(nodes, callback, event) {
	for (var i = 0, l = nodes.length; i < l; i++) {
		nodes[i].addEventListener(event || 'click', callback)
	}
}

// Modules
var M = {}

M.Navigation = (function () {
	var pagesIDs = [
		'page-index',
		'page-quiz-1',
		'page-quiz-2',
		'page-quiz-3',
		'page-quiz-4',
		'page-quiz-5',
		'page-quiz-6',
		'page-quiz-7',
		'page-quiz-8',
		'page-quiz-9',
		'page-quiz-10',
		'page-quiz-11',
		'page-quiz-12',
		'page-quiz-13',
		'page-quiz-14',
		'page-quiz-15',
		'page-analyzing',
	]
	var pagesNodes = pagesIDs.map(function (pageID) {
		return document.getElementById(pageID)
	})
	var activePageOrder = 0
	var classPageHidden = 'hidden'
	var isNavigationBlocked = false

	function goNextPage() {
		if (isNavigationBlocked) return
		isNavigationBlocked = true
		setTimeout(() => {
			pagesNodes[activePageOrder].classList.add(classPageHidden)
			pagesNodes[activePageOrder + 1].classList.remove(classPageHidden)
			activePageOrder += 1
			isNavigationBlocked = false
			if (activePageOrder === 16) {
				M.PageAnalyzing.init()
			}
		}, 300);
	}

	return {
		goNextPage: goNextPage,
	}
}());

// Index page
(function () {
	on(document.querySelectorAll('[data-page-index-card]'), function () {
		M.Navigation.goNextPage()
	})
}());

// Quiz pages
(function () {
	function initMultipleOptionsPage(pageNumber) {
		var pageNode = document.getElementById('page-quiz-' + pageNumber)
		var optionsNodes = pageNode.querySelectorAll('.horizontal-answer-option-module_container__-EvBR')
		var button = pageNode.querySelector('.quiz-select-question-module_buttonContainer__Scjb0 button')
		var selectedOptionsCount = 0

		function toggleButton() {
			if (selectedOptionsCount) {
				button.classList.remove('button-module_disabled__l8nJ1')
				button.removeAttribute('disabled')
			} else {
				button.classList.add('button-module_disabled__l8nJ1')
				button.setAttribute('disabled', '')
			}
		}

		on(optionsNodes, function () {
			if (this.className.indexOf('horizontal-answer-option-module_selected__1-cu9') > -1) {
				selectedOptionsCount -= 1
			} else {
				selectedOptionsCount += 1
			}
			this.classList.toggle('horizontal-answer-option-module_selected__1-cu9')
			var checkbox = this.querySelector('.horizontal-answer-option-module_checkbox__aT-GV')
			checkbox.classList.toggle('horizontal-answer-option-module_isCheckboxShown__zifUD')
			toggleButton()
		})

		button.addEventListener('click', function () {
			if (!selectedOptionsCount) return
			gtag('event', 'page_quiz_' + pageNumber + '_go_next')
			M.Navigation.goNextPage()
		})
	}

	function initSingleOptionPage(pageNumber) {
		var selector = '#page-quiz-' + pageNumber + ' .quiz_quizCardContainer__qB__T'
		on(document.querySelectorAll(selector), function () {
			gtag('event', 'page_quiz_' + pageNumber + '_go_next')
			this.classList.add('selectable-card_isSelected__JQwCx')
			this.querySelector('article > span').classList.remove('quiz_isTransparent__3uLMZ')
			setTimeout(function () {
				M.Navigation.goNextPage()
			}, 500);
		})
	}

	for (var i = 1; i <= 15; i++) {
		if (i === 1 || i === 13) {
			initMultipleOptionsPage(i)
		} else {
			initSingleOptionPage(i)
		}
	}
}());

M.PageAnalyzing = (function () {
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

	function init() {
		var interval = setInterval(function () {
			if (animationCurrentStep === animationStepsCount) {
				clearInterval(interval)
				setTimeout(function () {
					window.location.href = 'https://www.google.com/'
				}, 1000);
				return
			}
			animateLoader()
			animatePercent()
			animateList()
		}, animationStepDuration);
	}

	return {
		init: init,
	}
}());
