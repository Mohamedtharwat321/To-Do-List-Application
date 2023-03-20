const btns = document.querySelectorAll(".add-btn");

let dataTasks;
if (localStorage.tasktitle != null) {
  dataTasks = JSON.parse(localStorage.tasktitle);
} else {
  dataTasks = [];
}

//add task when click on button
btns.forEach((item) => {
  item.addEventListener("click", (eo) => {
    const parentbtn = item.parentNode;
    const tasks = parentbtn.querySelector(".tasks");

    const taskbox = document.createElement("div");
    taskbox.className = "task-box";

    const taskinput = `
      <input draggable="true" type="text" placeholder="Your Task" />
      <i class="fa-solid fa-pen"></i>
      <i class="fa-solid fa-trash-can"></i>
    `;
    taskbox.innerHTML += taskinput;
    tasks.appendChild(taskbox);

       
   
    

    /************************* */
    /* Delete task when click */
    /* ************************ */

    let trash = taskbox.querySelectorAll(".fa-trash-can");

    trash.forEach((item) => {
      item.addEventListener("click", (eo) => {
        const parent = item.parentNode;
        parent.remove();
        localStorage.tasktitle=JSON.stringify(dataTasks)
      });
    });

    /************************* */
    /* edit task when click */
    /* ************************ */

    let penicon = taskbox.querySelectorAll(".fa-pen");

    penicon.forEach((item) => {
      item.addEventListener("click", (eo) => {
        let input = item.parentNode.querySelector("input");
        if (input.value !== "") {
          input.style.textDecoration = "underline";
          input.readOnly = false;
        }
      });
    });

    let originalInput = taskbox.querySelectorAll("input");

    originalInput.forEach((item) => {
      item.addEventListener("blur", (eo) => {
        if (item.value !== "") {
          item.readOnly = true;
          item.style.textDecoration = "none";
        }
      });
    });

     /************************* */
    /* local storage */
    /* ************************ */
    let newtask = {
      title: originalInput.value,
    };
    dataTasks.push(newtask);
    localStorage.setItem("tasktitle", JSON.stringify(dataTasks));
    console.log(newtask);


    //drag and drop

    dragitem();
  });
});

//drag and drop function
let drag = null;
function dragitem() {
  let items = document.querySelectorAll(".task-box");

  items.forEach((item) => {
    item.addEventListener("dragstart", () => {
      drag = item;
      item.style.opacity = "0.5";
    });

    item.addEventListener("dragend", () => {
      item.style.opacity = "1";
    });

    let mytasks = document.querySelectorAll(".tasks");
    console.log(mytasks);
    mytasks.forEach((box) => {
      box.addEventListener("dragover", (eo) => {
        eo.preventDefault();
        box.parentNode.classList.add("box");
      });

      box.addEventListener("dragleave", () => {
        box.parentNode.classList.remove("box");
      });

      box.addEventListener("drop", () => {
        box.append(drag);
        box.parentNode.classList.remove("box");
      });
    });
  });
}
