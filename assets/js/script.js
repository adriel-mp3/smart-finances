const links = document.querySelectorAll('.main-nav a');

function handleClick(event) {
  event.preventDefault();
  const url = event.target.href;
  
  fetchPageOnClick(url);
  window.history.pushState(null, null, url);
}

async function fetchPageOnClick(url) {
  const pageResponse = await fetch(url);
  const pageText = await pageResponse.text();
  replaceContent(pageText);
}

function replaceContent(newText) {
  const newHTML = document.createElement('div');
  newHTML.innerHTML = newText;
  
  const oldContent = document.querySelector('.main-content');
  const newContent = newHTML.querySelector('.main-content');

  oldContent.innerHTML = newContent.innerHTML;
  document.title = newHTML.querySelector('title').innerText;
}

window.addEventListener('popstate', () => {
  fetchPageOnClick(window.location.href);
})

links.forEach(link => {
  link.addEventListener('click', handleClick);
})


