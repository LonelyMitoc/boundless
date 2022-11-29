// const newFormHandler = async (event) => {
//   event.preventDefault();

// const { init } = require("../../models/User");

//   const name = document.querySelector('#project-name').value.trim();
//   const needed_funding = document.querySelector('#project-funding').value.trim();
//   const description = document.querySelector('#project-desc').value.trim();

//   if (name && needed_funding && description) {
//     const response = await fetch(`/api/projects`, {
//       method: 'POST',
//       body: JSON.stringify({ name, needed_funding, description }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       document.location.replace('/profile');
//     } else {
//       alert('Failed to create project');
//     }
//   }
// };
async function newStory(event){
  const title = document.querySelector('#new-title').value.trim();
  const content = document.querySelector('#new-content').value.trim();

  if(title && content){
    const response= await fetch('/api/story', {
      method: 'POST',
         body: JSON.stringify({ title, content }),
           headers: {
          'Content-Type': 'application/json',}
    
    });
    if (response.ok) {
       document.location.replace('/profile');
       alert('Story submitted!');
       } else {
       alert('Failed to create project');
       }

  }

}



function initialize(){
  const createTB = document.querySelector('#create-tab-button');
  const collabTB = document.querySelector('#collab-tab-button');
  const createTab = document.querySelector('#create-tab');
  const collabTab = document.querySelector('#collaborate-tab');

  createTB.classList.add('is-active');
  collabTB.classList.remove('is-active');
  createTab.style.display = '';
  collabTab.style.display = 'none';
}

async function createTab(event){
  event.preventDefault();

  const createTB = document.querySelector('#create-tab-button');
  const collabTB = document.querySelector('#collab-tab-button');
  const createTab = document.querySelector('#create-tab');
  const collabTab = document.querySelector('#collaborate-tab');

  if (createTB.classList.contains('is-active')){
  } else {
    collabTB.classList.remove('is-active');
    createTB.classList.add('is-active');
    collabTab.style.display = 'none';
    createTab.style.display = '';
  } 
}
async function collabTab(event){
  event.preventDefault();

  const createTB = document.querySelector('#create-tab-button');
  const collabTB = document.querySelector('#collab-tab-button');
  const createTab = document.querySelector('#create-tab');
  const collabTab = document.querySelector('#collaborate-tab');

  if (collabTB.classList.contains('is-active')){
  } else {
    createTB.classList.remove('is-active');
    collabTB.classList.add('is-active');
    collabTab.style.display = '';
    createTab.style.display = 'none';

  } 
}


initialize()
document.querySelector('#create-tab-button').addEventListener('click', createTab);
document.querySelector('#collab-tab-button').addEventListener('click', collabTab);
document.querySelector('#create-button').addEventListener('click', newStory);



// document
//   .querySelector('.project-list')
//   .addEventListener('click', delButtonHandler);
