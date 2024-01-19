const addressBarContent = new URLSearchParams(location.search);
console.log(addressBarContent);

const productId = addressBarContent.get("productId");
console.log(productId);

const myURL = "https://striveschool-api.herokuapp.com/api/product";

fetch(myURL + "/" + productId, {
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
    console.log(product);
    document.getElementById("img-Product").src = product.imageUrl;
    document.getElementById("name").innerText = product.name;
    document.getElementById("description").innerText = product.description;
    document.getElementById("brand").innerText = product.brand;
    document.getElementById("price").innerText = product.price + " €";

    // edit btn
    document
      .getElementById("edit")
      .setAttribute(
        "href",
        "../html/back-office.html?productId=" + product._id
      );
  })
  .catch((err) => {
    console.log(err);
  });
