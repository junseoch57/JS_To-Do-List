let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = 'all';
let filterList = [];
let underLine = document.getElementById("under-line");


addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

for(let i = 1; i < tabs.length ; i++){
    tabs[i].addEventListener("click", function(event){
        filter(event);
    });
}


function addTask(){
    let task = {
        id: randomIDGenerate(),          // 유니크한 아이디값
        taskContent: taskInput.value,
        IsComplete: false,        
    };  
    taskList.push(task);  // 객체 전체를 push 해야
    taskInput.value = "";  
    console.log(taskList);
    filter();  
}


function render(list){  // 실제 그려지는 것 처리
    let resultHTML = "";
    for(let i = 0 ; i < list.length; i++){
        if(list[i].IsComplete == true){
            resultHTML += `<div class="task">
                    <div class="task-content task-done">${list[i].taskContent}</div> 
                    <div class="task-buttons"> 
                        <img src="images/check.png" alt="Check" onclick="toggleComplete('${list[i].id}')" class="icon">
                        <img src="images/delete.png" alt="Delete" onclick="deleteTask('${list[i].id}')" class="icon">
                    </div> 
                </div>`;
        } else {
            resultHTML += `<div class="task">
            <div class="task-content">${list[i].taskContent}<img src="images/star.png" class="star-icon"></div> 
            <div class="task-buttons">
                <img src="images/check.png" alt="Check" onclick="toggleComplete('${list[i].id}')" class="icon">
                <img src="images/delete.png" alt="Delete" onclick="deleteTask('${list[i].id}')" class="icon">
            </div>
        </div>`;
        }
    }


    document.getElementById("task-board").innerHTML = resultHTML
}

function toggleComplete(id){
    console.log("id:",id);
    for(let i = 0; i< taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].IsComplete = !taskList[i].IsComplete;  //클릭할때 마다 false, true 바뀜
            break;
        }
    }
    filter();  
    console.log(taskList)
}

function deleteTask(id){  
    for(let i = 0; i < taskList.length ; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
    } 
    filter();  
}

function filter(event){    // addEventListener로 부터 event를 매개변수로 받음 
    if (event) {
        mode = event.target.id; // mode를 전역변수로

        underLine.style.width = event.target.offsetWidth + "px";
        underLine.style.left = event.target.offsetLeft + "px";
        underLine.style.top = event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
    }

    filterList = [];

    if (mode === "all"){ // 전체 리스트 보여줌
        render(taskList);
    } else if (mode === "ongoing"){  // 진행중인 아이템(task.IsComplete = false)을 보여줌
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].IsComplete === false){
                filterList.push(taskList[i]);
            }
        }
        render(filterList);
        console.log("진행중", filterList);
    } else if (mode === "done"){  // 끝나는 케이스(task.IsComplete = true)
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].IsComplete === true){
                filterList.push(taskList[i]);
            }
        }
        render(filterList);
    }
}      

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}