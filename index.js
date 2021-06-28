const taskContainer = document.querySelector(".task_container");

let globalStore = [];

const generateNewCard = (taskData) =>
 `
      <div class="col-md-6 col-lg-4" id=${taskData.id}>
        <div class="card">
          <div class="card-header d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-outline-success">
              <i class="fas fa-pencil-alt"></i>
            </button>
            <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this, arguments)">
              <i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this, arguments)"></i>
            </button>
          </div>
          <img src= ${taskData.imageUrl}>
          <div class="card-body">
            <h5 class="card-title">${taskData.taskTitle}</h5>
            <p class="card-text">${taskData.taskDescription}</p>
            <a href="#" class="btn btn-primary">${taskData.taskType}</a>
          </div>
          <div class="card-footer">
            <button type="button" class="btn btn-outline-primary float-end">
              Open Task
            </button>
          </div>
        </div>
      </div>
 `


 // store the data into globalStore and not to delete the data when we refresh...
const loadInitialCardData = () => {
  // getting data from the tasky card data of localstorage....
  const getCardData = localStorage.getItem("tasky");

  // converting the string into the normal object.....
  const {cards} = JSON.parse(getCardData);

  // loop over those array of task object to create a HTML card.......
  cards.map((cardObject) => {
    
    // inject it into DOM...
    taskContainer.insertAdjacentHTML("beforeend",generateNewCard(cardObject));

    // update our global store....
    globalStore.push(cardObject);
  })
}

const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`, //unique number for id
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,
    };
    

      taskContainer.insertAdjacentHTML("beforeend",generateNewCard(taskData));

      globalStore.push(taskData);

      localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));
};


const deleteCard = (event) => {
  event = window.event;
  
  const targetID = event.target.id;
  const tagname = event.target.tagName;


  globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
  localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));

  if(tagname === "BUTTON"){
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  }else{
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }
};