const filterBrand = document.getElementById('filter-brand');
const filterType = document.getElementById('filter-type');
const filterName = document.getElementById('filter-name');
const filterSort = document.getElementById('sort-type');

!(async () => {
  let response = await fetch('data/products.json');

  loadProducts(await response.json(), 'A-Z');
})();

function loadProducts(json, sortType) {
  let products = sortProducts(json, sortType)
    .map((p) => productItem(p))
    .join('');

  productElement.innerHTML = products;

  loadComboOptions(filterBrand, productBrands.uniq().sort());
  loadComboOptions(filterType, productTypes.uniq().sort());
}

function loadComboOptions(combo, data) {
  data.map((opt) => {
    combo.insertAdjacentHTML('beforeend', `<option>${opt}</option>`);
  });
}

//EXEMPLO DO CÓDIGO PARA UM PRODUTO
function productItem(product) {
  productBrands = productBrands.concat([product.brand]);
  productTypes = productTypes.concat([product.product_type]);
}

function productItem(product) {
  return `<div class="product" data-name='${product.name}' data-brand='${
    product.brand
  }' data-type='${product.type}' tabindex='${product.id}'>
  <figure class="product-figure">
    <img src='${product.image_link}' width="215" height="215" alt='${
    product.name
  }' onerror="javascript:this.src='img/unavailable.png'">
  </figure>
  <section class="product-description">
    <h1 class="product-name">${product.name}</h1>
    <div class="product-brands"><span class="product-brand background-brand">${product.brand}</span>
<span class="product-brand background-price">R$ ${parseFloat(product.price * 5.5).toFixed(
    2
  )}</span></div>
  </section>
  <section class="product-details"><div class="details-row">
  ${loadDeatils(product)}
  </section>

  </div>`;
}

//EXEMPLO DO CÓDIGO PARA OS DETALHES DE UM PRODUTO
function loadDetails(product) {
  let details = ['brand', 'price', 'rating', 'category', 'product_type'];

  Object.entries(product)
    .filter(([name, value]) => {
      details.includes(name);
    })
    .map(([name, value]) => {
      `
      <div class="details-bar">
      <div>${name}</div>
           <div class="details-bar-bg" style="width= 250">nyx</div>
         </div>
       </div>
  `;
    });
}

function sortProducts(products, type) {
  switch (type) {
    case 'Melhores Avaliados':
      return products.sort((a, b) => {
        parseFloat(a.rating) > parseFloat(b.rating)
          ? -1
          : parseFloat(a.rating) < parseFloat(b.rating)
          ? 1
          : 0;
      });
    case 'Menores Preços':
      return products.sort((a, b) => {
        parseFloat(a.price) > parseFloat(b.price)
          ? 1
          : parseFloat(a.price) < parseFloat(b.price)
          ? -1
          : 0;
      });
    case 'A-Z':
      return products.sort((a, b) => {
        a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
      });
    case 'Z-A':
      return products.sort((a, b) => {
        a.name > b.name ? -1 : a.name < b.name ? 1 : 0;
      });
  }
}

filterBrand.addEventListener('keyup', loadFilters);
filterType.addEventListener('change', loadFilters);
filterName.addEventListener('change', loadFilters);
filterSort.addEventListener('change', (e) => {
  loadProducts;
});

function loadFilters() {}

Array.prototype.uniq = function () {
  return this.filter(function (value, index, self) {
    return self.indexOf(value) === index;
  });
};
