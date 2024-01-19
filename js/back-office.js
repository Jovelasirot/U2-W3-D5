const nameInput = document.getElementById("name-Product");
const descriptionInput = document.getElementById("description");
const brandInput = document.getElementById("brand");
const imageInput = document.getElementById("img-Product");
const priceInput = document.getElementById("price");

const form = document.getElementById("product-Form");

const myUrl = "https://striveschool-api.herokuapp.com/api/product";

const addressBarContent = new URLSearchParams(location.search);
console.log(addressBarContent);
const productId = addressBarContent.get("productId");
console.log(productId);

if (productId) {
  document.getElementById("form-title").innerText = "Form di modifica evento";
  document.getElementById("btn-form").innerText = "Save Changes";
  fetch(myUrl + "/" + productId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMmU2MzE4N2U1YzAwMTgxNGM1ZjAiLCJpYXQiOjE3MDU2NTE4MTEsImV4cCI6MTcwNjg2MTQxMX0.MukAz4w7SSYtD1Jp_m3qP72gpThtgJ7mQZy-6TUbW34",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Status: ${response.status}`);
      }
    })
    .then((product) => {
      nameInput.value = product.name;
      descriptionInput.value = product.description;
      brandInput.value = product.brand;
      imageInput.value = product.imageUrl;
      priceInput.value = product.price;
      alert("you are in the edit section");
    })
    .catch((err) => {
      console.log(err);
    });
} else {
  document.getElementById("delete").style.display = "none";
}

// post
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const newProduct = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: imageInput.value,
    price: priceInput.value,
  };

  let URLToUse;
  let methodToUse;

  if (productId) {
    methodToUse = "PUT";
    URLToUse = myUrl + "/" + productId;
  } else {
    methodToUse = "POST";
    URLToUse = myUrl;
  }

  fetch(URLToUse, {
    method: methodToUse,
    body: JSON.stringify(newProduct),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMmU2MzE4N2U1YzAwMTgxNGM1ZjAiLCJpYXQiOjE3MDU2NTE4MTEsImV4cCI6MTcwNjg2MTQxMX0.MukAz4w7SSYtD1Jp_m3qP72gpThtgJ7mQZy-6TUbW34",

      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log(response);
      if (response.ok) {
        if (productId) {
          alert("Edit has been saved");
        } else {
          alert("Product saved");
          throw new Error(`Status: ${response.status}`);
        }

        nameInput.value = "";
        descriptionInput.value = "";
        brandInput.value = "";
        imageInput.value = "";
        priceInput.value = "";
      } else {
        alert("Error while saving");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// delete btn
document.getElementById("delete").addEventListener("click", function () {
  fetch(myUrl + "/" + productId, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMmU2MzE4N2U1YzAwMTgxNGM1ZjAiLCJpYXQiOjE3MDU2NTE4MTEsImV4cCI6MTcwNjg2MTQxMX0.MukAz4w7SSYtD1Jp_m3qP72gpThtgJ7mQZy-6TUbW34",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("the product has been successfully deleted!");
        location.assign("../html/index.html");
      } else {
        alert("error while deleting");
        throw new Error(`Status: ${response.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
