let items = [];
let intervalId = null;

function addItem() {
  let item = document.getElementById("inputItem").value;
  if (item && !items.some(i => i.name === item)) {
    items.push({ name: item, chosen: false });
    document.getElementById("inputItem").value = "";
    updateItemsList();
  } else {
    alert('Please enter a unique item');
  }
}

function removeItem() {
  if (items.length > 0) {
    items.pop();
    updateItemsList();
  } else {
    alert('No items to remove');
  }
}

function updateItemsList() {
  let itemsList = document.getElementById("itemsList");
  itemsList.innerHTML = "";
  items.forEach((item, index) => {
    let listItem = document.createElement("li");
    listItem.textContent = item.name;
    listItem.className = item.chosen ? 'chosen' : (item.highlighted ? 'highlighted' : '');
    itemsList.appendChild(listItem);
  });
}

function highlightItem() {
  items.forEach(item => {
    item.highlighted = false;
  });
  let item = items[Math.floor(Math.random() * items.length)];
  item.highlighted = true;
  updateItemsList();
}

function chooseWinner() {
  if (items.filter(i => !i.chosen).length > 0) {
    if(intervalId != null) {
      clearInterval(intervalId);
    }
    let sound = new Audio('sound.mp3');
    sound.play();
    intervalId = setInterval(highlightItem, 100);
    setTimeout(() => {
      clearInterval(intervalId);
      let remainingItems = items.filter(i => !i.chosen);
      let winner = remainingItems[Math.floor(Math.random() * remainingItems.length)];
      winner.chosen = true;
      items.forEach(item => {
        item.highlighted = false;
      });
      document.getElementById("winner").innerText = "Winner: " + winner.name;
      updateItemsList();
    }, 2000);
  } else {
    alert('No remaining items in the list');
  }
}
