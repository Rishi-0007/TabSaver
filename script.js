let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadFromLocalStorage = localStorage.getItem("myLeads")
const tabBtn = document.getElementById("tab-btn")

tabBtn.addEventListener("click", saveTab)

function saveTab() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    if (tabs && tabs[0] && tabs[0].url) {
      myLeads.push(tabs[0].url)
      localStorage.setItem("myLeads", JSON.stringify(myLeads))
      renderList(myLeads)
    } else {
      console.error("Error getting tabs or tabs[0].url is undefined.")
    }
  })
}


if(leadFromLocalStorage){
  myLeads = JSON.parse(leadFromLocalStorage)
  renderList(myLeads)
}

inputBtn.addEventListener("click", function(){
  myLeads.push(inputEl.value)
  localStorage.setItem("myLeads", JSON.stringify(myLeads))
  inputEl.value = ""
  renderList(myLeads)
})

deleteBtn.addEventListener("dblclick", function (){
  localStorage.clear()
  myLeads = []
  renderList(myLeads)
})
function renderList(list){
  let listItems = ""
  for(let i=0; i<list.length; i++){
    listItems += `
       <li>
        <a href="${list[i]}" target="_blank">${list[i]}</a>
       </li>
    `
  }
  ulEl.innerHTML = listItems
}
