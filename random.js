const lineDisplay = document.getElementById('latin-line');
const authorSelect = document.getElementById('author-select');
const newLineBtn = document.getElementById('new-line');

function getRandomLine(author)
  {
  let lines = [];

  switch (author)
    {
    case 'virgil':
      lines = virgilLines;
      break;
    case 'ovid':
      lines = ovidLines;
      break;
    case 'horace':
      lines = horaceLines;
      break;
    case 'catullus':
      lines = catullusLines;
      break;
  }

  const randomIndex = Math.floor(Math.random() * lines.length);
  return lines[randomIndex];
}

function updateLine()
  {
  const author = authorSelect.value;
  const line = getRandomLine(author);
  lineDisplay.textContent = line;
}

newLineBtn.addEventListener('click', updateLine);
