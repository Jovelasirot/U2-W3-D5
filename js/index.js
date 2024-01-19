fetch("https://striveschool-api.herokuapp.com/api/product", {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMmU2MzE4N2U1YzAwMTgxNGM1ZjAiLCJpYXQiOjE3MDU2NTE4MTEsImV4cCI6MTcwNjg2MTQxMX0.MukAz4w7SSYtD1Jp_m3qP72gpThtgJ7mQZy-6TUbW34",
  },
});

const generateCards = function (arrayOfProducts) {
  // manipolazione del DOM
  arrayOfProducts.forEach((product) => {
    const newCol = document.createElement("div");
    newCol.classList.add("col", "col-12", "col-md-4", "col-lg-3");
    newCol.innerHTML = `
        <div class="card h-100 .anima">
            <img src="${product.imageUrl}" alt="graphic card">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text flex-grow-1">${product.description}</p>
                <p class="card-text "> ${product.price} €</p>
                <p class="card-text text-end ">from: ${product.brand}</p>
                <a href="#" class="btn btn-dark">Add to cart</a>
                <a href="./details.html?productId=${product._id}" class="btn btn-success mt-2"><i class="bi bi-caret-right"></i></i>
                 VAI AI DETTAGLI 
                </a>
            </div>
        </div>
        `;
    const productsRow = document.getElementById("products-row");
    productsRow.appendChild(newCol);
  });
};

const getProduct = () => {
  const myURL = "https://striveschool-api.herokuapp.com/api/product";
  fetch(myURL, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMmU2MzE4N2U1YzAwMTgxNGM1ZjAiLCJpYXQiOjE3MDU2NTE4MTEsImV4cCI6MTcwNjg2MTQxMX0.MukAz4w7SSYtD1Jp_m3qP72gpThtgJ7mQZy-6TUbW34",
    },
  })
    .then((response) => {
      console.log("response", response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Status: ${response.status}`);
      }
    })
    .then((data) => {
      console.log("DATA", data);
      generateCards(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

getProduct();
