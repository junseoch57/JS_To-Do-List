// 유저가 값을 입력한다

// 1. check 버튼 클릭하면 false -> true
// 2. true이면 끝난걸로 간주하고 밑줄
// 3. false이면 안 끝난걸로 간주하고 그대로

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = 'all';
let filterList = [];
let underLine = document.getElementById("under-line");
addButton.addEventListener("click",addTask);

for(let i = 1; i < tabs.length ; i++){
    tabs[i].addEventListener("click", function(event){
        filter(event);
    });
}

function addTask(){
    let task = {
        id:randomIDGenerate(),          // 유니크한 아이디값
        taskContent: taskInput.value,
        IsComplete: false,        
    };  
    taskList.push(task);  // 객체 전체를 push 해야
    console.log(taskList);
    render();
}

function render(){  // 실제 그려지는 것 처리
    // 1. 내가 선택한 탭에 따라서
    let list = [];
    if(mode === "all"){
        list = taskList;
    }
    else if(mode === "ongoing" || mode === "done"){
      list = filterList;
    }

    // 2. 리스트를 다르게 보여줘야함
    // all -> taskList
    // ongoing, done -> filterList

    let resultHTML = "";
    for(let i = 0 ; i < list.length; i++){
        if(list[i].IsComplete == true){
            resultHTML += `<div class="task">
                    <div class = "task-done">${list[i].taskContent}</div>
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')">Check</button>
                        <button onclick="DeleteTask('${list[i].id}')">Delete</button>
                    </div>
                </div>`
        }else{
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="DeleteTask('${list[i].id}')">Delete</button>
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
    render();  // 실제 UI도 업데이트
    console.log(taskList)
}

function DeleteTask(id){  // 값 업데이트
    for(let i = 0; i < taskList.length ; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
    } 
    render();  // UI도 업데이트
}

function filter(event){    // addEventListener로 부터 event를 매개변수로 받음 
    mode = event.target.id; // mode를 전역변수로

    underLine.style.width = event.target.offsetWidth + "px";
    underLine.style.left = event.target.offsetLeft + "px";
    underLine.style.top = event.target.offsetTop + (event.target.offsetHeight - 4) + "px";

    filterList = [];

    if (mode === "all"){ // 전체 리스트 보여줌
        render();
    }      

    else if (mode === "ongoing"){  // 진행중인 아이템(task.IsComplete = false)을 보여줌
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].IsComplete === false){
                filterList.push(taskList[i]);
            }
        }
        render();
        console.log("진행중", filterList);
    }

    else if (mode === "done"){  // 끝나는 케이스(task.IsComplete = true)
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].IsComplete === true){
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}      

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

