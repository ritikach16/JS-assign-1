var menu = [
    { 'name': 'Crusty Garlic Focaccia with Melted Cheese', 'price': 105.00, 'courseType': ['main course'], 'qty': 1 },
    { 'name': 'lemonade with fresh mint leaves', 'price': 115.00, 'courseType': ['beverage'], 'qty': 1 },
    { 'name': 'Mini Pizza', 'price': 125.00, 'courseType': ['starter', 'appetizer', 'entree'], 'qty': 1 },
    { 'name': 'Strawberry shake', 'price': 190.00, 'courseType': ['beverage'], 'qty': 1 },
    { 'name': 'Home Country Fries with Herbs & Chilli Flakes', 'price': 105.00, 'courseType': ['main course'], 'qty': 1 },
    { 'name': 'Orange Juice', 'price': 95.00, 'courseType': ['beverage'], 'qty': 1 },
    { 'name': 'Chocolate ice-cream with crunchy nuts', 'price': 150.00, 'courseType': ['dessert'], 'qty': 1 },
    { 'name': 'French Fries with Cheese & jalapenos', 'price': 135.00, 'courseType': ['starter', 'appetizer', 'entree'], 'qty': 1 },
    { 'name': 'Choco lava cake', 'price': 100.00, 'courseType': ['dessert'], 'qty': 1 },
    { 'name': 'Veg thali', 'price': 200.00, 'courseType': ['main course'], 'qty': 1 },
]

var table = [
    { 'name': 'Table-1', 'price': 300.00, 'totalItem': 2 },
    { 'name': 'Table-2', 'price': 0, 'totalItem': 0 },
    { 'name': 'Table-3', 'price': 999, 'totalItem': 4 }
]

var tableSearchingBox = document.getElementById('searchingTable');
var menuSearchingBox = document.getElementById('searchingDishes');


// Building Menu items
function buildmenu(items) {
    var menu = document.getElementById('dishes');

    menu.innerHTML = '';

    for (let i = 0; i < items.length; i++) {
        var cardItems = document.createElement('div');
        cardItems.classList.add('card', 'w-75', 'menuCard');
        cardItems.setAttribute('id', i);
        cardItems.draggable = true;

        var cBody = document.createElement('div');
        cBody.classList.add('card-body');

        var nameHeading = document.createElement('h4');
        var pHeading = document.createElement('p');

        nameHeading.innerText = `${items[i].name}`;
        pHeading.innerText = `Rs. ${items[i].price}`;

        cBody.appendChild(nameHeading);
        cBody.appendChild(pHeading);

        cardItems.appendChild(cBody);

        menu.append(cardItems);
    }
}

// searching implementation for table
tableSearchingBox.addEventListener('keyup', function () {
    var value = tableSearchingBox.value;
    value = value.toLowerCase();
    const cardContainer = document.getElementById("pricingTable");
    const cards = cardContainer.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].querySelector(".card-body h4.card-title");
        if (title.innerHTML.toLowerCase().indexOf(value) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
});

// searching implementation for Menu
menuSearchingBox.addEventListener('keyup', function () {
    let val = menuSearchingBox.value;
    let menusToBeSearched = search(val, menu);
    buildmenu(menusToBeSearched);
});
buildmenu(menu);

// search function
function search(value, actualMenu) {
    var filteredData = [];

    for (var i = 0; i < actualMenu.length; i++) {
        value = value.toLowerCase();

        var name = actualMenu[i].name.toLowerCase();
        var courseArr = actualMenu[i].courseType;

        if (name.includes(value)) {
            filteredData.push(actualMenu[i]);
        }
        else {
            for (let j = 0; j < courseArr.length; j++) {
                let courseName = courseArr[j].toLowerCase();
                if (courseName.includes(value) && !filteredData.includes(actualMenu[i])) {
                    filteredData.push(actualMenu[i]);
                }
            }
        }
    }

    return filteredData;
}


var menuItemCardsToDrag = document.querySelectorAll(".menuCard");
var tableItemCardsToDragIn = document.querySelectorAll(".drop-table");
let draggableMenuCard = null;

// dragable menu items
menuItemCardsToDrag.forEach((cardMenuContent) => {
    cardMenuContent.addEventListener("dragstart", dragStart);
    cardMenuContent.addEventListener("dragend", dragEnd);
});

function dragStart() {
    draggableMenuCard = this;
}
function dragEnd() {
    draggableMenuCard = null;
    console.log("drag end");
}

tableItemCardsToDragIn.forEach((dragIn) => {
    dragIn.addEventListener("dragover", dragOver);
    dragIn.addEventListener("dragenter", dragEnter);
    dragIn.addEventListener("dragleave", dragLeave);
    dragIn.addEventListener("drop", dragDrop);
})

function dragOver(e) {
    e.preventDefault();
    this.style.border = "1px dashed grey";
}

function dragEnter() {
    this.style.border = "1px dashed grey";
}

function dragLeave() {
    this.style.border = "none";
}

function dragDrop() {
    this.style.border = "none";
    const spans = this.getElementsByTagName("span");
    const itemCost = draggableMenuCard.getElementsByTagName("p");
    // console.log(itemCost[0].innerHTML.substring(4));
    spans[1].innerHTML = Number(spans[1].innerHTML) + 1;
    spans[0].innerHTML =
        Number(spans[0].innerHTML) + Number(itemCost[0].innerHTML.substring(4));

    var str = this.getElementsByTagName("h4")[0].innerHTML;
    var matches = str.match(/(\d+)/);

    if (sessionStorage[matches[0]]) {
        let result = JSON.parse(sessionStorage.getItem(matches[0]));
        let flag = 1;
        for (let i = 0; i < result.length; i++) {
            let first = result[i][0];
            let quantity = result[i][1];
            if (first == draggableMenuCard.id) {
                result[i][1] = quantity += 1;
                flag = 0;
                break;
            }
        }
        if (flag) {
            result.push([draggableMenuCard.id, menu[draggableMenuCard.id].qty]);
        }
        sessionStorage.setItem(matches[0], JSON.stringify(result));
    } else {
        sessionStorage.setItem(
            matches[0],
            JSON.stringify([[draggableMenuCard.id, menu[draggableMenuCard.id].qty]])
        );
    }
}


// modal

function openModal(tableId) {
    let result = JSON.parse(sessionStorage.getItem(tableId));
    let sNo = "<h5>S.No</h5>",
        itemName = "<h5>Item</h5>",
        itemPrice = "<h5>Price</h5>";
    let servings = "<h5>Number of servings</h5>";
    let deleteIcon = "<h5>Delete</h5>";
    var totalbill = 0;
    if (result.length == 0) {
        document.querySelector(".pop-up").style.display = "none";
        return;
    }
    for (let i = 0; i < result.length; i++) {
        console.log(result);
        let first = result[i][0];
        let quantity = result[i][1];
        let itemId = Number(first);
        let val = i + 1;
        totalbill += menu[itemId].price * quantity;
        sNo += "<p>" + val + "</p>";
        itemName += "<p>" + menu[itemId].name + "</p>";
        itemPrice += "<p>" + menu[itemId].price + "</p>";
        servings +=
            "<input  type='number' name='" +
            tableId +
            "' value='" +
            quantity +
            "' size='1' onchange='increment(this," +
            itemId +
            "," +
            i +
            ")' /> ";
        deleteIcon +=
            "<p onclick='deleteItem(this, " +
            i +
            ", " +
            tableId +
            "," +
            quantity +
            "," +
            menu[itemId].price +
            ")'  > <i class='fa-solid fa-trash-can'></i></p>";
    }
    let closeSession =
        "<button onclick='generateBill(" +
        tableId +
        ")' class='btn btn-primary'>Generate Bill</button>";

    document.getElementById("sno").innerHTML = sNo;
    document.getElementById("item-name").innerHTML = itemName;
    document.getElementById("item-price").innerHTML = itemPrice;
    document.getElementById("servings").innerHTML = servings;
    document.getElementById("total-bill").innerHTML = totalbill;
    document.getElementById("delete-icon").innerHTML = deleteIcon;
    document.getElementById("close-session").innerHTML = closeSession;
    document.querySelector(".pop-up").style.display = "flex";
    document.getElementById("total-bill").style.display = "none";
}

function openPopUp(id) {
    var str = id.getElementsByTagName("h4")[0].innerHTML;
    var matches = str.match(/(\d+)/);
    // console.log(matches[0]);
    openModal(matches[0]);
}

function closePopUp(id) {
    document.querySelector(".pop-up").style.display = "none";
}

function deleteItem(id, index, tableId, qty, price) {
    let result = JSON.parse(sessionStorage.getItem(tableId));
    result.splice(index, 1);
    sessionStorage.setItem(tableId, JSON.stringify(result));
    billId = "tableBill-" + tableId;
    const tableName = document.getElementById(billId);
    const spans = tableName.getElementsByTagName("span");
    spans[1].innerHTML = Number(spans[1].innerHTML) - 1;
    spans[0].innerHTML = Number(spans[0].innerHTML) - qty * price;

    openModal(tableId);
}

function increment(id, itemId, index) {
    let serves = id.value;
    let result = JSON.parse(sessionStorage.getItem(id.name));
    result[index][1] = serves;
    sessionStorage.setItem(id.name, JSON.stringify(result));
    result = JSON.parse(sessionStorage.getItem(id.name));

    var totalbill = 0;
    for (let i = 0; i < result.length; i++) {
        let first = result[i][0];
        let quantity = result[i][1];
        let itemId = Number(first);
        totalbill += menu[itemId].price * quantity;
    }

    document.getElementById("total-bill").innerHTML = totalbill;
}

function generateBill(tableId) {
    let result = JSON.parse(sessionStorage.getItem(tableId));
    let sNo = "<h5>S.No</h5>",
        itemName = "<h5>Item</h5>",
        itemPrice = "<h5>Price</h5>";
    let servings = "<h5>Number of servings</h5>";
    var totalbill = 0;
    for (let i = 0; i < result.length; i++) {
        let first = result[i][0];
        let quantity = result[i][1];
        let itemId = Number(first);
        let val = i + 1;
        totalbill += menu[itemId].price * quantity;
        sNo += "<p>" + val + "</p>";
        itemName += "<p>" + menu[itemId].name + "</p>";
        itemPrice += "<p>" + menu[itemId].price + "</p>";
        servings += "<p>" + quantity + "</p>";
    }
    billId = "tableBill-" + tableId;
    const tableName = document.getElementById(billId);
    const spans = tableName.getElementsByTagName("span");
    spans[1].innerHTML = 0;
    spans[0].innerHTML = 0;
    sessionStorage.removeItem(tableId);
    document.getElementById("sno").innerHTML = sNo;
    document.getElementById("item-name").innerHTML = itemName;
    document.getElementById("item-price").innerHTML = itemPrice;
    document.getElementById("servings").innerHTML = servings;
    document.getElementById("total-bill").innerHTML = totalbill;
    document.getElementById("delete-icon").innerHTML = "";
    document.getElementById("close-session").innerHTML = "";
    document.getElementById("total-bill").style.display = "";
}



