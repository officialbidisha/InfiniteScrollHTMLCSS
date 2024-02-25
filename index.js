let currentArrayOfList = [];
let index = 1;
let listIndex = 0;
let searchEle = document.getElementById("search");

let currentDataSet = [];
window.addEventListener("load", (event) => {
  utility
    .fetchData(
      "https://jsonplaceholder.typicode.com/todos",
      "GET",
      "no-cors",
      10,
      index,
      searchEle.value
    )
    .then((res) => generateData(res));
});

function loadItems(number) {
  utility
    .fetchData(
      "https://jsonplaceholder.typicode.com/todos",
      "GET",
      "no-cors",
      number,
      index,
      searchEle.value
    )
    .then((res) => generateData(res));
}
let listInDom = document.querySelector(".list");
let moreEle = document.querySelector(".more");
function generateData(list) {
  let documentFragment = document.createDocumentFragment();
  list.forEach((element) => {
    let li = document.createElement("li");
    li.value = listIndex;
    listIndex++;
    let textContext = document.createTextNode(element.title);
    currentDataSet.push(element.title);
    li.appendChild(textContext);
    documentFragment.appendChild(li);
  });
  listInDom.insertBefore(documentFragment, moreEle);
  index = index + 1;
}

const intersectionObserver = new IntersectionObserver(
  (entries, self) => {
    if (entries[0].intersectionRatio <= 0) return;
    // load more content;
    loadItems(10);
  },
  {
    rootMargin: "-5px",
    root: listInDom,
  }
);

intersectionObserver.observe(moreEle);

window.addEventListener("beforeunload", () => {
  intersectionObserver.unobserve(moreEle);
});

function search() {
    let val = searchEle.value;
    let elementsToBeRemoved = currentDataSet.filter((x)=> !x.includes(val));
    console.log(listInDom.children);
    let childList = listInDom.children;
    for(let i=0;i<childList.length;i++){
        console.log(childList[i].textContent);
        if(elementsToBeRemoved.includes(childList[i].textContent )){
           childList[i].style.display= 'none'
        }
        else{
            childList[i].style.display = '';
        }
    }
  }

searchEle.addEventListener("keyup", (event) => {
    debounceFn();
});

const debounceFn = utility.debounce(search, 500);


