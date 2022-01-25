const quoteText = document.querySelector(".quote");
const authorName = document.querySelector(".author .name");
const quoteBtn = document.querySelector("button");
const soundBtn = document.querySelector(".sound");
const copyBtn = document.querySelector(".copy");
const twitterBtn = document.querySelector(".twitter");

async function randomQuote() {
  try {
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";
    const response = await fetch("https://api.quotable.io/random");
    const result = await response.json();

    // console.log(result);
    quoteText.innerText = result.content;
    authorName.innerText = result.author;

    quoteBtn.innerText = "New Quote";
    quoteBtn.classList.remove("loading");

  } catch (error) {
      console.log(error)
      quoteText.innerText = "Try again"
  }
}

soundBtn.addEventListener("click", () => {
  let utterance = new SpeechSynthesisUtterance(
    `${quoteText.innerText} by ${authorName.innerText}`
  );
  speechSynthesis.speak(utterance);
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteText.innerText);
});

twitterBtn.addEventListener("click", () => {
  const tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.textContent}`;
  window.open(tweetUrl, "_blank");
});

quoteBtn.addEventListener("click", randomQuote);

document.addEventListener('DOMContentLoaded', randomQuote)
