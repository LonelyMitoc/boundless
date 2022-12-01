async function getImage(event) {
  event.preventDefault()

  const storyTitleH2 = document.querySelector('#story-title');
  const motivateI = document.querySelector('#motivate-image');
  const motivateB = document.querySelector('#motivate-me-button');
  motivateB.style.display = 'none';
  
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Authorization': 'Bearer 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',
    },
    body: JSON.stringify({ "prompt": `${storyTitleH2.textContent}`, "n": 1, "size": "256x256" })
  };
  fetch('https://api.openai.com/v1/images/generations', options).then(response => response.json()).then(response => {
    motivateI.setAttribute('src', response.data[0].url);
    motivateI.style.display = 'block';
  }).catch(err => console.error(err));

}


async function newStory(event) {
  event.preventDefault()
  const title = document.querySelector('#new-title').value.trim();
  const content = document.querySelector('#new-content').value.trim();
  console.log([title, content]);

  if (title && content) {

    const response = await fetch('/api/story', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace('/profile');
      alert('Story submitted!');
    } else {
      alert('Failed to create project');
    }
  }
}

async function updateStory(event) {
  event.preventDefault();
  const addB = document.querySelector('#add-button');
  addB.style.display = 'none';
  const storyTitleH2 = document.querySelector('#story-title');
  const storyText = document.querySelector('#story-text').textContent;
  const newText = document.querySelector('#new-text').value.trim();
  const sendText = `
  ${storyText}
  
  ${newText}

  `;

  if (newText) {
    const url = `../api/story/${storyTitleH2.dataset.id}`
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({ sendText }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      console.log(response)
      //document.location.replace('/profile');
      alert('Story Updated!');
      reload();
    } else {
      alert('Failed to create project');
    }

  }

}
function reload() {
  window.location.href = '/profile';
}

function initialize() {
  const createTB = document.querySelector('#create-tab-button');
  const collabTB = document.querySelector('#collab-tab-button');
  const createTab = document.querySelector('#create-tab');
  const collabTab = document.querySelector('#collaborate-tab');
  createTB.classList.add('is-active');
  collabTB.classList.remove('is-active');
  createTab.style.display = '';
  collabTab.style.display = 'none';
  getImage();
}

async function createTab(event) {
  event.preventDefault();

  const createTB = document.querySelector('#create-tab-button');
  const collabTB = document.querySelector('#collab-tab-button');
  const createTab = document.querySelector('#create-tab');
  const collabTab = document.querySelector('#collaborate-tab');

  if (createTB.classList.contains('is-active')) {
  } else {
    collabTB.classList.remove('is-active');
    createTB.classList.add('is-active');
    collabTab.style.display = 'none';
    createTab.style.display = '';
  }
}

async function collabTab(event) {
  event.preventDefault();

  const createTB = document.querySelector('#create-tab-button');
  const collabTB = document.querySelector('#collab-tab-button');
  const createTab = document.querySelector('#create-tab');
  const collabTab = document.querySelector('#collaborate-tab');

  if (collabTB.classList.contains('is-active')) {
  } else {
    createTB.classList.remove('is-active');
    collabTB.classList.add('is-active');
    createTab.style.display = 'none';
    collabTab.style.display = '';

  }
}

initialize()
document.querySelector('#create-tab-button').addEventListener('click', createTab);
document.querySelector('#collab-tab-button').addEventListener('click', collabTab);
document.querySelector('#create-button').addEventListener('click', newStory);
document.querySelector('#add-button').addEventListener('click', updateStory);
document.querySelector('#motivate-me-button').addEventListener('click', getImage);

// document
//   .querySelector('.project-list')
//   .addEventListener('click', delButtonHandler);
