// 유저가 값을 입력한다

// 1. check 버튼 클릭하면 false -> true
// 2. true이면 끝난걸로 간주하고 밑줄
// 3. false이면 안 끝난걸로 간주하고 그대로

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
addButton.addEventListener("click",addTask);

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
    let resultHTML = "";
    for(let i = 0 ; i < taskList.length; i++){
        if(taskList[i].IsComplete == true){
            resultHTML += `<div class="task">
                    <div class = "task-done">${taskList[i].taskContent}</div>
                    <div>
                        <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                        <button onclick="DeleteTask('${taskList[i].id}')">Delete</button>
                    </div>
                </div>`
        }else{
            resultHTML += `<div class="task">
            <div>${taskList[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                <button onclick="DeleteTask('${taskList[i].id}')">Delete</button>
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

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

