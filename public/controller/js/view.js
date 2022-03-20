export default class View {
	constructor() {
		this.btnStart = document.getElementById('start')
		this.btnStop = document.getElementById('stop')
		this.buttons = () => Array.from(document.querySelectorAll('button'))
		this.ignoreButton = new Set(['unassigned'])
		async function onBtnClick() {}
		this.onBtnClick = onBtnClick
	}
	onLoad() {
		this.changeCommandButtonsVisibility()
		this.btnStart.onclick = this.onStartClicked.bind(this)
	}

	changeCommandButtonsVisibility(hide = true) {
		Array.from(document.querySelectorAll('[name=command]')).forEach((btn) => {
			const fn = hide ? 'add' : 'remove'
			btn.classList[fn]('unassigned')
			function onClickReset() {}
			btn.onclick = () => {
				btn.conclick = onClickReset
			}
		})
	}

	configureOnBtnClick(fn) {
		this.onBtnClick = fn
	}

	async onStartClicked({ srcElement: { innerText } }) {
		const btnText = innerText
		await this.onBtnClick(btnText)
		this.toggleBtnStart()
		this.changeCommandButtonsVisibility(false)
		this.buttons()
			.filter((btn) => this.notIsUnassignedButton(btn))
			.forEach(this.setupBtnAction.bind(this))
	}

	setupBtnAction(btn) {
		const text = btn.innerText.toLowerCase()
		if (text.includes('start')) return
		if (text.includes('stop')) {
			btn.onclick = this.onStopBtn.bind(this)
			return
		}
	}

	onStopBtn({ srcElement: { innerText } }) {
		this.toggleBtnStart(false)
		this.changeCommandButtonsVisibility(true)
		return this.onBtnClick(innerText)
	}

	notIsUnassignedButton(btn) {
		const classes = Array.from(btn.classList)
		return !!!classes.find((item) => this.ignoreButton.has(item))
	}

	toggleBtnStart(active = true) {
		if (active) {
			this.btnStart.classList.add('hidden')
			this.btnStop.classList.remove('hidden')
			return
		}

		if (active) {
			this.btnStart.classList.remove('hidden')
			this.btnStop.classList.add('hidden')
			return
		}
	}
}
