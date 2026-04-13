let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ADD TO CART */
function addToCart(name, price) {
    cart.push({name, price});
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart");
}

/* DISPLAY CART */
function displayCart() {
    let cartItems = document.getElementById("cartItems");
    let total = 0;

    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - ₦${item.price}
            <button onclick="removeItem(${index})">Remove</button>
        `;
        cartItems.appendChild(li);
        total += item.price;
    });

    document.getElementById("total").textContent = "Total: ₦" + total;
}

/* REMOVE ITEM */
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

/* FILTER PRODUCTS */
function filterProducts(category) {
    let products = document.querySelectorAll(".product");

    products.forEach(product => {
        if (category === "all") {
            product.style.display = "block";
        } else {
            product.style.display = product.dataset.category === category ? "block" : "none";
        }
    });
}

/* CHECKOUT (WHATSAPP) */
function checkout() {
    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let phone = document.getElementById("phone").value;
    let deliveryPreference = document.getElementById("time").value;
    let paymentMethod = document.getElementById("paymentMethod").value;
    let additionalNotes = document.getElementById("additionalNotes").value;

    if (!name || !address || !phone || !time || !paymentMethod || !additionalNotes) {
        alert("Fill all details");
        return;
    }

    let message = `🛒 NEW ORDER\n\n👤 ${name}\n📞 ${phone}\n📍 ${address}\n\nITEMS:\n`;

    let total = 0;

    cart.forEach(item => {
        message += `- ${item.name} ₦${item.price}\n`;
        total += item.price;
    });

    message += `\nTOTAL: ₦${total}`;

    let owner = "2348026063635"; // change this
    let url = `https://wa.me/${owner}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
}

/* INIT CART */
if (document.getElementById("cartItems")) {
    displayCart();
}


