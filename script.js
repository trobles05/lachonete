const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCouter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");

let cart = [];

cartBtn.addEventListener("click", function () {
  cartModal.style.display = "flex";
  updateCartModel();
});

cartModal.addEventListener("click", function (event) {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
});

closeModalBtn.addEventListener("click", function () {
  cartModal.style.display = "none";
});

menu.addEventListener("click", function (event) {
  let paretButton = event.target.closest(".add-cart-btn");
  if (paretButton) {
    const name = paretButton.getAttribute("data-name");
    const price = parseFloat(paretButton.getAttribute("data-price"));
    console.log(name);
    console.log(price);

    addToCart(name, price);
  }
});

function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quatity += 1;
  } else {
    cart.push({
      name,
      price,
      quatity: 1,
    });
  }

  updateCartModel();
}

function updateCartModel(addToCart) {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add(
      "flex",
      "justify-betwenn",
      "mb-4",
      "flex-col"
    );

    cartItemElement.innerHTML = `
    <div class="flex items-center justify-between">
      <div>
        <p class="font-bold" >${item.name}</p>
        <p>Qtd: ${item.quatity}</p>
        <p class="font-medium mt-2" >R$: ${item.price.toFixed(2)}</p>
      </div>
     
        <button class="remove-from-cart-btn" data-name="${item.name}">
          Remover
        </button>
  
    </div>
    `;

    total += item.price * item.quatity;

    cartItemsContainer.appendChild(cartItemElement);
  });

  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRl",
  });

  cartCouter.innerHTML = cart.length;
}

cartItemsContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const name = event.target.getAttribute("data-name");

    removeItemCart(name);
  }
});

function removeItemCart(name) {
  const index = cart.findIndex((item) => item.name === name);
  if (index !== -1) {
    const item = cart[index];

    if (item.quatity > 1) {
      item.quatity -= 1;
      updateCartModel();
      return;
    }

    cart.splice(index, 1);
    updateCartModel();
  }
}

addressInput.addEventListener("input", function (event) {
  let inputValeu = event.target.valeu;
});

checkoutBtn.addEventListener("click", function () {
  if (cart.length === 0) return;
  if (addressInput.valeu === "") {
    addressWarn.classList.remove("hidden");
  }
});
