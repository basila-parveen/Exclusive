let search_input = document.getElementById("search_item");
let input_field = document.getElementById("container_product");
const fetchData = async () => {
  try {
    const response = await fetch("./products2.json");
    if (!response.ok) {
      throw new Error("not ok");
    }
    const productData = await response.json();
    displayProduct(productData);
    search_input.addEventListener("input", () => {
      handleSearch(productData);
    });
  } catch (error) {
    console.error("error");
  }
};

const displayProduct = (products) => {
  let productsHTML2 = products.map((pdt2) => {
    let price_variation = pdt2.old_price
      ? `<div class="reviews" style="display: flex; flex-direction: column; align-items: flex-start;">
            <div class="pricevariation" style="display: flex; align-items: center; gap: 10px">
              <p class="firstp">${pdt2.rating_p1}</p>
              <p class="old_price" style="width: 50%">${pdt2.old_price}</p>
            </div>
            <div class="reviewimg" style="display: flex">
              <img src="images/Five star.svg" alt="star" />
              <p class="rating" style="opacity:50%">${pdt2.rating_p2}</p>
            </div>
          </div>`
      : `

            <div class="rating">
              <p class="money">${pdt2.rating_p1}</p>
              <img src="${pdt2.rating_img}" alt="Rating Stars" />
              <p class="ratingno">${pdt2.rating_p2}</p>
            </div>`;

    let offer = "";
    if (pdt2.isoffer?.isoffer) {
      offer = `<div class="discount"><p>${pdt2.isoffer.paragraph}</p></div>`;
    }

    let circlecolor = "";
    if (pdt2.colorvarient?.length) {
      circlecolor += `<div
                  class="colorcircle"
                  style="display: flex; align-items: center; gap: 10px"
                >`;

      pdt2.colorvarient.map((elemnet) => {
        circlecolor += elemnet?.bordercolor
          ? `<div
                    class="first_circle_border"
                    style="
                      width: 20px;
                      height: 20px;
                      border: 2px solid black;
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      position: relative;
                    "
                  >
                    <div
                      class="first_circle"
                      style="
                        width: 16px;
                        height: 16px;
                        background-color: ${elemnet.first_circle};
                        border-radius: 50%;
                      "
                    ></div>
                  </div>`
          : `
          <div
                    class="secnd_circle"
                    style="
                      width: 20px;
                      height: 20px;
                      background: #db4444;
                      border-radius: 50%;
                    "
                  ></div>`;
      });
      circlecolor += `</div>`;
    }
    return `
        <div class="contentbox_container3">
          <div class="container3_content_box">
            <img src="${pdt2.images}" alt="img1" />

            <div class="addcart">
              <p>Add To Cart</p>
            </div>

            ${
              pdt2.isnew
                ? `<div class="container3_new"><h3>new</h3> </div>`
                : ""
            }

             ${offer}

            <div class="wishlist">
              <img src="images/Fill Heart.svg" alt="heart" />
              <img src="images/Fill Eye.svg" alt="eye" />
            </div>
          </div>
          <div class="review">
          <h3>${pdt2.review_h3}</h3>
          ${price_variation}
            ${circlecolor}
          </div>
        </div>`;
  });

  input_field.innerHTML = productsHTML2.join("");
};
const handleSearch = (products) => {
  const query = search_input.value.trim().toLowerCase();
  const filterpdt = products.filter((pdt2) => {
    return pdt2.review_h3.toLowerCase().includes(query);
  });

  displayProduct(filterpdt);
};
fetchData();
