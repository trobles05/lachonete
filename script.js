document.addEventListener("DOMContentLoaded", function () {
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
  const addressObs = document.getElementById("address-obs");
  const saveButton = document.getElementById("save-btn");

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
      addToCart(name, price);
    }
  });

  function addToCart(name, price) {
    const existingItem = cart.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quatity += 1;
    } else {
      cart.push({ name, price, quatity: 1 });
    }
    updateCartModel();
  }

  function updateCartModel() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
      const cartItemElement = document.createElement("div");
      cartItemElement.classList.add(
        "flex",
        "justify-between",
        "mb-4",
        "flex-col"
      );

      cartItemElement.innerHTML = `
          <div class="flex items-center justify-between">
              <div>
                  <p class="font-bold">${item.name}</p>
                  <p>Qtd: ${item.quatity}</p>
                  <p class="font-medium mt-2">R$: ${item.price.toFixed(2)}</p>
              </div>
              <button class="remove-from-cart-btn" data-name="${item.name}">
                  Remover
              </button>
          </div>`;

      total += item.price * item.quatity;
      cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotal.textContent = total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
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
    let inputValue = event.target.value;
    if (inputValue !== "") {
      addressInput.classList.remove("border-red-500");
      addressWarn.classList.add("hidden");
    }
  });

  checkoutBtn.addEventListener("click", function () {
    const isOpen = checkRestaurantOpen();
    if (!isOpen) {
      Toastify({
        text: "O restaurante está fechado!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: { background: "#ef4444" },
      }).showToast();
    }

    if (cart.length === 0) return;
    if (addressInput.value === "") {
      addressWarn.classList.remove("hidden");
      addressInput.classList.add("border-red-500");
      return;
    }

    const obsValue = addressObs.value.trim()
      ? `\nObservação: ${addressObs.value}`
      : "";

    const cartItems = cart
      .map((item) => {
        return ` *${item.name}*
        Quantidade:(${item.quatity})
        Preço: R$${item.price.toFixed(2)}`;
      })
      .join("\n");

    const message = encodeURIComponent(
      `${cartItems} \n${obsValue}\nEndereço: ${addressInput.value}`
    );
    const phone = "41984729241";

    window.open(
      `https://wa.me/${phone}?text=${message} *Endereço:* ${addressInput.value} `,
      "_blank"
    );

    cart.length = 0;
    updateCartModel();
  });

  function checkRestaurantOpen() {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 22;
  }

  const spanItem = document.getElementById("data-span");
  const isOpen = checkRestaurantOpen();

  if (isOpen) {
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600");
  } else {
    spanItem.classList.add("bg-red-500");
    spanItem.classList.remove("bg-green-600");
  }
});
