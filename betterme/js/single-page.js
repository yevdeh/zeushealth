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
		'page-email',
		'page-checkout',
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
			if (activePageOrder === 18) {
				M.PageCheckout.init()
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
					M.Navigation.goNextPage()
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

// Email page
(function () {
	var isError = false
	var input = document.querySelector('.email-generated_input__7R1C7')
	var error = document.querySelector('.email-generated_error__KU1KC')
	var button = document.querySelector('[data-button="email-form-submit"]')

	function hideError() {
		if (!isError) return
		input.classList.remove('utilities_isInvalid__CAG4e')
		error.style.opacity = 0
		isError = false
	}

	function showError() {
		if (isError) return
		input.classList.add('utilities_isInvalid__CAG4e')
		error.style.opacity = 1
		isError = true
	}

	input.addEventListener('input', hideError)

	button.addEventListener('click', function () {
		var value = input.value
		if (value === '' || !/\S+@\S+\.\S+/.test(value)) {
			showError()
		} else {
			gtag('event', 'page_email_submit')
			M.Navigation.goNextPage()
		}
	})
}());

// Checkout page
M.PageCheckout = (function () {
	var ErrorPopup = (function () {
		var closeElements = document.querySelectorAll('.ErrorPopup-close, .ErrorPopup-shadow, .ErrorPopup-button')
		var popup = document.querySelector('.ErrorPopup')

		function closePopup() {
			popup.classList.add('ErrorPopup--hidden')
		}

		on(closeElements, closePopup)
	}())

	var Faq = (function () {
		on(document.querySelectorAll('.faq-accordion_faqItem'), function () {
			this.classList.toggle('faq-accordion_faqItem__8PP8i')
			this.classList.toggle('faq-accordion_faqItemOpened__UZn8C')
		})
	}())

	var Form = (function () {
		var button = document.querySelector('.Form-button')
		var inputs = document.querySelectorAll('.Form-input')
		var popup = document.querySelector('.Popup')
		var errorPopup = document.querySelector('.ErrorPopup')

		button.addEventListener('click', function () {
			if (!document.querySelectorAll('.Form-input:invalid').length) {
				gtag('event', 'submit_credit_card')
				setTimeout(function () {
					popup.classList.add('Popup--hidden')
					errorPopup.classList.remove('ErrorPopup--hidden')
				}, 1000);
			}
		})

		on(inputs, function () {
			if (this.name === 'date' && /^\d\d$/.test(this.value)) {
				this.value += '/'
			}
			if (this.checkValidity() && !document.querySelectorAll('.Form-input:invalid').length) {
				button.classList.remove('ButtonOrange--disabled')
			} else {
				button.classList.add('ButtonOrange--disabled')
			}
		}, 'input')
	}())

	var Header = (function () {
		var mobileHeader = document.querySelector('.header_header__GQ14N')
		var timer = mobileHeader.querySelector('.countdown-with-cta_container__ud_nT')

		var minScrollY = 200
		var isScrolledEnough = false

		function handleScroll() {
			if (window.scrollY > minScrollY && !isScrolledEnough) {
				isScrolledEnough = true
				timer.classList.remove('hidden')
			}
			if (window.scrollY <= minScrollY && isScrolledEnough) {
				isScrolledEnough = false
				timer.classList.add('hidden')
			}
		}

		document.addEventListener('scroll', handleScroll)
	}())

	var PlanCards = (function () {
		var buttons = document.querySelectorAll('.ChoosePlan-plan')
		var classButtonActive = 'ChoosePlan-plan--active'
		var popupPriceNodes = document.querySelectorAll('[data-popup-price]')

		on(buttons, function () {
			if (this.classList.contains(classButtonActive)) return
			buttons.forEach(function (node) {
				node.classList.remove(classButtonActive)
			})
			this.classList.add(classButtonActive)
			var selectedPlan = this.dataset.planPrice || '$13.67'
			popupPriceNodes.forEach(function (node) {
				node.textContent = selectedPlan
			})
		})
	}())

	var Popup = (function () {
		var buttons = document.querySelectorAll('[data-button="get-plan"]')
		var closeAndShadow = document.querySelectorAll('.Popup-close, .Popup-shadow')
		var popup = document.querySelector('.Popup')

		function closePopup() {
			popup.classList.add('Popup--hidden')
		}

		function openPopup() {
			popup.classList.remove('Popup--hidden')
		}

		on(buttons, openPopup)
		on(closeAndShadow, closePopup)
	}())

	var Timer = (function () {
		var timers = document.querySelectorAll('.countdown-with-cta_timeNumbers__vHbE7, .sticky-countdown-with-cta_countdownTimeUnit__JEZa_')

		function initTimer(nodeTimer) {
			var nodeMinutes = nodeTimer.querySelector('.minutes')
			var nodeSeconds = nodeTimer.querySelector('.seconds')
			var minutes = 10
			var seconds = 0

			function setTimer() {
				if (minutes === 0 && seconds === 0) {
					clearInterval(interval)
					return
				}
				if (seconds) {
					seconds -= 1
				} else {
					minutes -= 1
					seconds = 59
				}
				nodeMinutes.textContent = minutes.toString().padStart(2, '0')
				nodeSeconds.textContent = seconds.toString().padStart(2, '0')
			}

			var interval = setInterval(setTimer, 1000);
		}

		function init() {
			timers.forEach(function (timer) {
				initTimer(timer)
			})
		}

		return {
			init: init,
		}
	}())

	function init() {
		Timer.init()
	}

	return {
		init: init,
	}
}())
