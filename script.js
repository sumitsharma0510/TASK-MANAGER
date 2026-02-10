const taskInput = document.getElementById('taskInput');
const addbtn = document.getElementById('addbtn');
const  tasklist = document.getElementById('tasklist');
const  searchInput = document.getElementById('search');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter="all";
renderTasks();

// FOR ADDIND TASKS--->>>

addbtn.addEventListener('click',()=>{
    const text = taskInput.value.trim();
    if(text){
        tasks.push({
            text:text,
            completed: false,
            time: Date.now()


        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value='';
        renderTasks();
    }

});


// SEARCH--->>>
searchInput.addEventListener('input',()=> renderTasks(currentFilter));



// RENDERING TASKS--->>>
function renderTasks(filter='all'){
    currentFilter=filter;
    tasklist.innerHTML='';
    

    let filtered=[...tasks];

// FILTERING TASKS--->>>
    if(filter==="completed"){
        filtered=tasks.filter(t=>t.completed);
    }

    
    if(filter==="incompleted"){
        filtered=tasks.filter(t=> !t.completed);
    }


// RECENT--->>>
    if(filter==="recent"){
        filtered=[...tasks].sort((a,b)=> b.time-a.time)
    };


// SEARCH FILTER--->>>
  const searchText=searchInput.value.toLowerCase();
  filtered=filtered.filter(t=>
    t.text.toLowerCase().includes(searchText)
  );
    
   

    filtered.forEach((task,index)=>{
        const li= document.createElement('li');
        
        

        
        
        const checkbox= document.createElement('input');
        checkbox.type= "checkbox";
        checkbox.checked= task.completed;
        
        
        
        checkbox.addEventListener('change',()=>{
            task.completed=checkbox.checked;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks(filter);
        });
        
        
        const span=document.createElement('span');
        span.textContent=task.text;
        
        
        if(task.completed){
            span.style.textDecoration="line-through";
            span.style.opacity="0.7";
    }
    
    const delBtn = document.createElement('button');
    delBtn.textContent="DELETE";
    
    delBtn.addEventListener('click',()=>{
        const realIndex = tasks.indexOf(task);
        tasks.splice(realIndex,1)
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks(currentFilter);
    });
    
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    
    tasklist.appendChild(li);
})

};