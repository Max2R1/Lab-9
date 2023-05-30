var categoryLinks = document.getElementById('categoryLinks');
var homeLink1 = document.getElementById('homeLink1');
var homeLink2 = document.getElementById('homeLink2');
fetchCategories();
categoryLinks.addEventListener('click', function(event) {
  event.preventDefault();
  var category = event.target.dataset.category;
  if (category === 'random') {
    fetchCategoryById(Math.floor(Math.random() * 3) + 1);
  } else {
    fetchCategoryById(category);
  }
});

homeLink1.addEventListener('click', function(event) {
    renderHomePage();
});


function renderHomePage() {
  var categoryDiv = document.getElementById('category');
  categoryDiv.innerHTML = `<p class="fs-1">Lab 9</p>`;
  var itemsDiv = document.getElementById('items');
  itemsDiv.innerHTML = '';
}

function renderLinks(categories) {
  categories.forEach(category => {
    category = `
    <li><a class="dropdown-item" href="#" data-category="${category.id}">${category.shortname}</a></li>
    `;
    categoryLinks.innerHTML += category;
  });
  category = `
    <li><a class="dropdown-item" href="#" data-category="random">Specials</a></li>
  `;
  categoryLinks.innerHTML += category;
}

function fetchCategories() {
  fetch('categories.json')
    .then(response => response.json())
    .then(data => {
      renderLinks(data.categories);
    })
    .catch(error => console.error(error));
}

function fetchCategoryById(categoryId) {
  fetch('category' + categoryId + '.json')
    .then(response => response.json())
    .then(data => {
      renderCategory(data.category);
      renderItems(data.items);
    })
    .catch(error => console.error(error));
}

function renderCategory(category) {
  var categoryDiv = document.getElementById('category');
  categoryDiv.innerHTML = `
    <div class="p-5  rounded-3">
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold text-success text-center">${category.name}</h1>
        <p class=" fs-4 text-success text-center">${category.notes}</p>
      </div>
    </div>
  `;
}

function renderItems(items) {
  var itemsDiv = document.getElementById('items');
  var itemsHTML = '';
  items.forEach(item => {
    itemsHTML += `
    <div class="card p-3" style="width: 300px;">
    <div class="row g-0">
    <div class="col-md-4">
    <img class="card-img-top object-cover" src="${item.photo + "&text=" + item.shortname + "&fontsize=16"}" alt="Card image cap">
    </div>
    <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">${item.name}</h5>
      <p class="card-text">${item.description}</p>
      </div>
    </div>
    <div class="card-footer"><strong>Price: $${item.price}</strong></div>
    </div>
  </div>
    `;
  });
  itemsDiv.innerHTML = itemsHTML;
}

// Initial home page rendering
renderHomePage();