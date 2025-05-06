let currentQuote = '';
let correctAnswer = '';

let correctCount = 0;
let totalCount = 0;
let streak = 0;
let quoteHistory = [];


function fetchKanye() {
    return fetch('https://api.kanye.rest')
      .then(response => response.json())
      .then(data => {
        return { quote: data.quote, author: 'Kanye' };
      })
      .catch(error => {
        console.error('Error fetching Kanye quote:', error);
        return { quote: 'Failed to fetch Kanye quote.', author: 'Kanye' };
      });
  }
  

  function fetchRonSwanson() {
    return fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
      .then(response => response.json())
      .then(data => {
        return { quote: data[0], author: 'Ron Swanson' };
      })
      .catch(error => {
        console.error('Error fetching Ron Swanson quote:', error);
        return { quote: 'Failed to fetch Ron Swanson quote.', author: 'Ron Swanson' };
      });
  }

  function fetchBreakingBad() {
    return fetch('https://api.breakingbadquotes.xyz/v1/quotes')
      .then(response => response.json())
      .then(data => {
        return { quote: data[0].quote, author: 'Breaking Bad' };
      })
      .catch(error => {
        console.error('Error fetching Breaking Bad quote:', error);
        return { quote: 'Failed to fetch Breaking Bad quote.', author: 'Breaking Bad' };
      });
  }

  function fetchGameOfThrones() {
    return fetch('https://api.gameofthronesquotes.xyz/v1/random')
      .then(response => response.json())
      .then(data => {
        return { quote: data.sentence, author: 'Game of Thrones' };
      })
      .catch(error => {
        console.error('Error fetching Game of Thrones quote:', error);
        return { quote: 'Failed to fetch Game of Thrones quote.', author: 'Game of Thrones' };
      });
  }
  

  function fetchSimpsons() {
    return fetch('https://thesimpsonsquoteapi.glitch.me/quotes')
      .then(response => response.json())
      .then(data => {
        return { quote: data[0].quote, author: 'The Simpsons' };
      })
      .catch(error => {
        console.error('Error fetching Simpsons quote:', error);
        return { quote: 'Failed to fetch Simpsons quote.', author: 'The Simpsons' };
      });
  }
  
  

async function getNewQuote() {
  document.getElementById('result').textContent = '';
  document.getElementById('quote').textContent = 'Loading quote...';

  const quotes = await Promise.all([fetchKanye(), fetchRonSwanson(), fetchBreakingBad(), fetchGameOfThrones(), fetchSimpsons()]);
  // Randomly select a quote from the fetched quotes
  const selected = quotes[Math.floor(Math.random() * quotes.length)];

  currentQuote = selected.quote;
  correctAnswer = selected.author;

  document.getElementById('quote').textContent = `"${currentQuote}"`;
}

function makeGuess(userGuess) {
  const result = document.getElementById('result');
  totalCount++;

  if (userGuess === correctAnswer) {
    correctCount++;
    streak++;
    result.textContent = `✅ Correct! That was ${correctAnswer}.`;
    result.style.color = 'green';
  } else {
    streak = 0;
    result.textContent = `❌ Wrong! That was ${correctAnswer}.`;
    result.style.color = 'red';
  }

  updateScoreboard();

  // Show result briefly, then load a new quote
  setTimeout(() => {
    result.textContent = '';
    getNewQuote();
  }, 1500); // 1.5 seconds delay
}


  function updateScoreboard() {
    document.getElementById('score').textContent = `Score: ${correctCount} / ${totalCount}`;
    document.getElementById('streak').textContent = `Streak: ${streak}`;
  
    const historyList = document.getElementById('history');
    const newEntry = document.createElement('li');
    newEntry.textContent = `"${currentQuote}" — ${correctAnswer}`;
    historyList.append(newEntry);
  
    if (historyList.children.length > 1) {
      historyList.innerHTML = ''; // Clear the list if it has more than one item
      historyList.append(newEntry);
    }
  }  

window.onload = getNewQuote;
