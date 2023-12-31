(function () {
	var Navigation = (function () {
		function getSections() {
			var sectionIdsMain = [
				'SectionHome',
				'SectionQuiz1',
				'SectionQuiz2',
				'SectionQuiz3',
				'SectionAnalyzing',
				'SectionDownload',
			]
			var sectionIdsHardcore = [
				'SectionHome',
				'SectionQuiz1',
				'SectionQuiz2',
				'SectionQuiz3',
				'SectionQuiz4',
				'SectionQuiz5',
				'SectionQuiz6',
				'SectionQuiz7',
				'SectionQuiz8',
				'SectionQuiz9',
				'SectionQuiz10',
				'SectionQuiz11',
				'SectionQuiz12',
				'SectionQuiz13',
				'SectionQuiz14',
				'SectionQuiz15',
				'SectionAnalyzing',
				'SectionResults',
			]
			var quizType = document.body.dataset.quizType
			var sectionIds = quizType === 'main' ? sectionIdsMain : sectionIdsHardcore
			return sectionIds.map(function (sectionId) {
				return document.getElementById(sectionId)
			})
		}

		var sections = getSections()
		var activeSectionId = 0
		var classSectionActive = 'Section--active'
		var isNavigationBlocked = false


		function goToPage(direction) {
			if (isNavigationBlocked) return
			isNavigationBlocked = true
			setTimeout(() => {
				sections[activeSectionId].classList.remove(classSectionActive)
				sections[activeSectionId + direction].classList.add(classSectionActive)
				activeSectionId += direction
				isNavigationBlocked = false
			}, 300);
		}

		function goNextPage() {
			goToPage(1)
		}

		function goPrevPage() {
			goToPage(-1)
		}

		return {
			goNextPage: goNextPage,
			goPrevPage: goPrevPage,
		}
	}())

	var Risks = (function () {
		function getRandomInteger(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		function fill() {
			var maxPoints = 58
			var points = 0
			document.querySelectorAll('.Option[data-is-selected="true"]').forEach(function ($option) {
				points += parseInt($option.dataset.points, 10)
			})
			var min = 25
			var max = 80
			var dispersion = 10
			var minMiddle = min + dispersion
			var maxMiddle = max - dispersion
			var percentPerPoint = (maxMiddle - minMiddle) / maxPoints
			var percentsToExtract = percentPerPoint * points
			var middle = maxMiddle - percentsToExtract
			document.querySelectorAll('.Risk').forEach(function ($risk) {
				percent = Math.round(middle - dispersion + getRandomInteger(0, dispersion * 2))
				$risk.querySelector('.Risk-percent').innerText = percent
				$risk.querySelector('.Risk-barFilled').style.width = percent + '%'
			})
		}

		return {
			fill: fill,
		}
	}())

	var quizType = document.body.dataset.quizType
	var lastSectionSelector = quizType === 'main' ? '#SectionQuiz3' : '#SectionQuiz15'

	// addEventListener for multiple elements
	function on(nodes, callback, event) {
		for (var i = 0, l = nodes.length; i < l; i++) {
			nodes[i].addEventListener(event || 'click', callback)
		}
	}

	on(document.querySelectorAll('.Navigation-back'), Navigation.goPrevPage)

	on(document.querySelectorAll('#SectionHome .Button'), Navigation.goNextPage)

	on(document.querySelectorAll('.Option'), function (e) {
		var $optionSelected = e.target
		var $options = $optionSelected.parentNode.querySelectorAll('.Option')
		$options.forEach(function ($option) {
			$option.dataset.isSelected = false
		});
		$optionSelected.dataset.isSelected = true
		Navigation.goNextPage()
	})

	on(document.querySelectorAll(lastSectionSelector + ' .Option'), function () {
		setTimeout(function () {
			document.querySelector('.SectionAnalyzing-loader').play()
			document.querySelector('.ListWithCheckboxes').classList.add('ListWithCheckboxes--animated')
			setTimeout(function () {
				Navigation.goNextPage()
				if (quizType === 'hardcore-with-risks') {
					Risks.fill()
				}
				if (quizType === 'hardcore-with-images') {
					setTimeout(function () {
						document.querySelectorAll('.Images-image').forEach(function (e) {
							e.classList.add('Images-image--visible')
						})
					}, 400);
				}
			}, 5000);
		}, 500);
	})
}())
