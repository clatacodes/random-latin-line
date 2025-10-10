const newLineBtn = document.getElementById('new-line');
const lineDisplay = document.getElementById('latin-line');


function cleanLine(line)
  return line.replace(/[\s,]*\d+\s*$/g, '').trim();
}

// Fetch text file and extract verses
async function getLinesFromFile(fileName)
  {
  try
  {
    const response = await fetch(fileName);
    const text = await response.text();
    const lines = text.trim().split(/\r?\n/);
    const numLines = parseInt(lines[0]);
    return lines.slice(1, 1 + numLines).map(cleanLine).filter(line => line.length > 0);
  } 
  catch (err)
  {
    console.error(`Error loading ${fileName}:`, err);
    return [];
  }
}

async function getRandomLineFromChecked()
  {
  const checked = Array.from(document.querySelectorAll('input[name="work"]:checked'))
    .map(input => input.value);

  if (checked.length === 0)
  {
    lineDisplay.textContent = "Selige saltem unum opus Latinum.";
    return;
  }

  let allLines = [];

  for (const file of checked)
    {
    const lines = await getLinesFromFile(file);
    allLines = allLines.concat(lines);
    }

  if (allLines.length === 0)
  {
    lineDisplay.textContent = "Nulla versus inventa sunt.";
    return;
  }

  const randomLine = allLines[Math.floor(Math.random() * allLines.length)];
  lineDisplay.textContent = randomLine;
}

newLineBtn.addEventListener('click', getRandomLineFromChecked);
