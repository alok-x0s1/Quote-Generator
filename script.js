const generateBtn = document.querySelector('.generate-btn')
const quote = document.querySelector('.quote p')
const author = document.querySelector('.author p')
const error = document.querySelector('.error')

const soundBtn = document.querySelector('#sound')
const copyBtn = document.querySelector('#copy')
const shareOnTwitter = document.querySelector('#twitter')

const fetchQuoteUrl = 'https://api.quotable.io/random'

generateBtn.addEventListener('click', displayQuote)

async function fetchQuote () {
    generateBtn.classList.add('loading')
    generateBtn.innerHTML = 'Loading Quote...'
    const reponse = await fetch(fetchQuoteUrl)
    
    if (!reponse.ok) {
        throw new Error('Failed to fetch Quote data.')
    }
    generateBtn.innerHTML = 'Inspire Me!'
    generateBtn.classList.remove('loading')
    return await reponse.json()
}

async function displayQuote () {
    try {
        const data = await fetchQuote();
        quote.innerHTML = `${data.content}`
        author.innerHTML = `${data.author}`
        error.innerHTML = ""
    } catch (error) {
        error.innerHTML = `Please try again later : ${error}`
    }
}
displayQuote()

soundBtn.addEventListener('click', () => {
    let utterance = new SpeechSynthesisUtterance(`${quote.innerText} by ${author.innerText}`)
    speechSynthesis.speak(utterance )
})

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(quote.innerText)
})

shareOnTwitter.addEventListener('click', () => {
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quote.innerText}`
    window.open(tweetUrl, "_blank")
})

window.setInterval(displayQuote, 30000)
