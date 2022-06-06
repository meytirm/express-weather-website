const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
	e.preventDefault()

	const location = search.value

	console.log(location)

	fetch(`http://localhost:3000/weather?address=${location}`, {
		method: 'GET',
	}).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageOne.textContent = data.error
				messageTwo.textContent = ''
			} else {
				messageOne.textContent = data.location
				messageTwo.textContent = data.forecast
			}
		})
	})
})