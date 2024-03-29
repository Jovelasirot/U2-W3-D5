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
        <div class="card h-100 anima">
            <img src="${product.imageUrl}" alt="graphic card">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text flex-grow-1">${product.description}</p>
                <p class="card-text "> ${product.price} €</p>
                <div class="d-flex justify-content-between ">
                <a href="./back-office.html?productId=${product._id}" class="btn btn-muted"><i class="bi bi-pencil-square"></i></a>
                <p class="card-text">Brand: ${product.brand}</p>
                </div>
                <a href="#" class="btn btn-dark">Add to cart</a>
                <a href="./details.html?productId=${product._id}" class="btn btn-success mt-2">
                 Show more
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

      // search function
      const filterAndDisplayCards = (searchQuery) => {
        const filteredProducts = data.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const productsRow = document.getElementById("products-row");
        productsRow.innerHTML = "";
        const mainArticle = document.getElementById("heroSection");
        mainArticle.classList.add("d-none");
        const homeTittle = document.getElementById("homeTittle");
        if (filteredProducts.length === 0) {
          homeTittle.innerHTML = "Search Results: No graphics card found";
        } else {
          homeTittle.innerHTML = "Search Results:";
          generateCards(filteredProducts);
        }

        generateCards(filteredProducts);
      };

      const searchForm = document.querySelector('form[role="search"]');
      const searchInput = searchForm.querySelector('input[type="search"]');

      searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const searchQuery = searchInput.value.trim();

        if (searchQuery !== "") {
          filterAndDisplayCards(searchQuery);
        } else {
          generateCards(data);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

getProduct();
