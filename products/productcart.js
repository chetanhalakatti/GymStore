document.addEventListener("DOMContentLoaded", (event) => {
  const minusButton = document.querySelector(".counter .minus");
  const plusButton = document.querySelector(".counter .plus");
  const countSpan = document.querySelector(".counter .count");

  let count = parseInt(countSpan.textContent);

  minusButton.addEventListener("click", () => {
    if (count > 1) {
      count--;
      countSpan.textContent = count;
    }
  });

  plusButton.addEventListener("click", () => {
    count++;
    countSpan.textContent = count;
  });
});

const price = document.getElementsByClassName("price");
const totalamount = document.getElementsByClassName("totalamount");
const remove = document.getElementById("remove");

document.addEventListener("DOMContentLoaded", ready);

function ready() {
  // Select all elements with the class "fa-trash" which are used as remove buttons
  var removeCartButtons = document.getElementsByClassName("fa-trash");
  console.log(removeCartButtons);

  // Loop through all remove buttons and add an event listener to each
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
}

function removeCartItem(event) {
  // Get the button that was clicked
  var buttonClicked = event.target;
  // Remove the parent element of the parent element of the clicked button (i.e., the entire cart item)
  buttonClicked.parentElement.parentElement.remove();
  innerHTML = "";
}
