// buynow side bar
const initializeSidebarToggle = () => {
  const sidebar = document.getElementById("sidebar");
  const toggleButton = document.getElementById("toggleSidebar");
  const sidebarClose = document.getElementById("sidebarClose");

  sidebar.classList.add("sidebar-collapsed");

  toggleButton.addEventListener("click", function () {
    sidebar.classList.toggle("sidebar-collapsed");
  });
  sidebarClose.addEventListener("click", function () {
    sidebar.classList.toggle("sidebar-collapsed");
  });
};
initializeSidebarToggle();

const listProductHTML = document.getElementById("listProduct");
let listCartHTML = document.querySelector(".listCart");
let iconCartSpan = document.querySelector(".AddCartConter");
let carts = [];

const addDataToHTML = () => {
  listProductHTML.innerHTML = "";
  if (listProduct.length > 0) {
    listProduct.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("item");
      newProduct.dataset.id = product.id;
      newProduct.innerHTML = ` 
          <img src="${product.image}" alt="" />
          <h2>${product.name}</h2>
          <div class="price">$${product.price}</div>
          <button class="addCart">Add to Cart</button>
        `;
      listProductHTML.appendChild(newProduct);
    });
  }
};

const initApp = () => {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      listProduct = data;
      addDataToHTML();

      //get cart from memory
      if (localStorage.getItem("cart")) {
        carts = JSON.parse(localStorage.getItem("cart"));
        addCartToHTML();
      }
    });
};
initApp();

listProductHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains("addCart")) {
    let product_id = positionClick.parentElement.dataset.id;
    console.log(product_id);
    addToCart(product_id);
  }
});

const addToCart = (product_id) => {
  let positionThisProductInCart = carts.findIndex(
    (value) => value.product_id == product_id
  );
  if (carts.length <= 0) {
    carts.push({
      product_id: product_id,
      quantity: 1,
    });
  } else if (positionThisProductInCart < 0) {
    carts.push({
      product_id: product_id,
      quantity: 1,
    });
  } else {
    carts[positionThisProductInCart].quantity += 1;
  }
  addCartToHTML();
  addCartToMemory();
};

const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(carts));
};

const addCartToHTML = () => {
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;
  if (carts.length > 0) {
    carts.forEach((cart) => {
      totalQuantity = totalQuantity + cart.quantity;
      let newCart = document.createElement("div");
      newCart.classList.add("item");

      newCart.dataset.id = cart.product_id;

      let positionProduct = listProduct.findIndex(
        (value) => value.id == cart.product_id
      );
      let info = listProduct[positionProduct];

      newCart.innerHTML = `
      <div class="image">
        <img src="${info.image}" />
      </div>
      <div class="name">${info.name}</div>
      <div class="totalPrice">${info.price * cart.quantity}</div>
      <div class="quantity">
        <span class="minus"><</span>
        <span>${cart.quantity}</span>
        <span class="plus">></span>
      </div>
    `;
      listCartHTML.appendChild(newCart);
    });
  }
  iconCartSpan.innerHTML = totalQuantity;
};

listCartHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (
    positionClick.classList.contains("minus") ||
    positionClick.classList.contains("plus")
  ) {
    let product_id = positionClick.parentElement.parentElement.dataset.id;

    let type = "minus";
    if (positionClick.classList.contains("plus")) {
      type = "plus";
    }
    changeQuantity(product_id, type);
  }
});

const changeQuantity = (product_id, type) => {
  let positionItemInCart = carts.findIndex(
    (value) => value.product_id == product_id
  );
  if (positionItemInCart >= 0) {
    switch (type) {
      case "plus":
        carts[positionItemInCart].quantity += 1;
        break;
      default:
        let valueChange = carts[positionItemInCart].quantity - 1;
        if (valueChange > 0) {
          carts[positionItemInCart].quantity = valueChange;
        } else {
          carts.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToMemory();
  addCartToHTML();
};
