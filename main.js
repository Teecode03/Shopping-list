let arr = [];
        const item = document.getElementById("item");
        const price = document.getElementById("price");
        const quantity = document.getElementById("quantity");
        const output = document.getElementById("min");
        const totalResult = document.getElementById("total");

        // Load shopping list from local storage on page load
        window.onload = function () {
            if (localStorage.getItem("shoppingList")) {
                arr = JSON.parse(localStorage.getItem("shoppingList"));
                renderList();
            }
        };

        function saveListToLocalStorage() {
            localStorage.setItem("shoppingList", JSON.stringify(arr));
        }

        function addItem() {
            const itemValue = item.value.trim();
            const priceValue = parseFloat(price.value);
            const quantityValue = parseInt(quantity.value, 10);

            if (!itemValue || isNaN(priceValue) || isNaN(quantityValue) || quantityValue <= 0 || priceValue < 0) {
                alert("Please enter valid item details.");
                return;
            }

            const myobj = {
                item: itemValue,
                price: priceValue,
                quantity: quantityValue,
            };
            arr.push(myobj);
            renderList();
            saveListToLocalStorage();
            item.value = "";
            price.value = "";
            quantity.value = "";
        }

        function edit(i) {
            const newitem = prompt("Enter the item name", arr[i].item);
            const newprice = prompt("Enter the item price", arr[i].price);
            const newquantity = prompt("Enter the item quantity", arr[i].quantity);

            if (!newitem || !newprice || !newquantity) return;

            const newObj = {
                item: newitem,
                price: parseFloat(newprice),
                quantity: parseInt(newquantity, 10),
            };
            arr.splice(i, 1, newObj);
            renderList();
            saveListToLocalStorage();
        }

        function delet(i) {
            arr.splice(i, 1);
            renderList();
            saveListToLocalStorage();
        }

        function renderList() {
            output.innerHTML = "";
            for (let i = 0; i < arr.length; i++) {
                output.innerHTML += `
                <p>
                    Item: ${arr[i].item} &nbsp;
                    Price: ${arr[i].price} &nbsp;
                    Quantity: ${arr[i].quantity} &nbsp;
                    Subtotal: ${arr[i].price * arr[i].quantity} &nbsp;
                    <button onclick="edit(${i})" style="width:150px; background-color: darkcyan; height: 30px; border-radius: 5px;">Edit</button>&nbsp;
                    <button onclick="delet(${i})" style="width:150px; background-color: red; height: 30px; border-radius: 5px;">Delete</button>
                </p>
                `;
            }
            const totalanswer = arr.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            totalResult.innerHTML = "Total: " + totalanswer;
        }