export default class View {
	constructor() {
		this.btnStart = document.getElementById('start')
		this.btnStop = document.getElementById('stop')
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
			btn.onclick = () => {}
		})
	}

	configureOnBtnClick(fn) {
		this.onBtnClick = fn
	}

	async onStartClicked({ srcElement: { innerText } }) {
		const btnText = innerText
		await this.onBtnClick(btnText)
	}
}
