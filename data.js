const getData = async () => {
  let productsHTML = ``;
  try {
    const res = await fetch("./data.json");
    if (!res.ok) {
      throw new Error("NOT OK");
    }
    const products = await res.json();
    products.map((i) => {
      productsHTML += `
                <div class="container2_items">
                 <img src="${i.image}" alt="${i.p}" />
                 <p>${i.p}</p>
              </div>`;
    });
    document.querySelector(".js-product-grid").innerHTML = productsHTML;
  } catch (error) {
    console.error("error", error);
  }
};

getData();

const containerData = async () => {
  let productsHTML2 = ``;
  try {
    const res1 = await fetch("./products.json");
    if (!res1.ok) {
      throw new Error("NOT OK");
    }
    const products1 = await res1.json();
    products1.map((pdt2) => {
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
      productsHTML2 += `
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
    
            <div class="wishlist">
              <img src="images/Fill Heart.svg" alt="heart" />
              <img src="images/Fill Eye.svg" alt="eye" />
            </div>
          </div>
          <div class="review">
            <h3>${pdt2.review_h3}</h3>
            <div class="rating">
              <p class="money">${pdt2.rating_p1}</p>
              <img src="${pdt2.rating_img}" alt="star" />
              <p class="ratingno">${pdt2.rating_p2}</p>
            </div>
            ${circlecolor}
          </div>
        </div>`;
    });

    document.querySelector(".container3_content_grid").innerHTML =
      productsHTML2;
  } catch (error) {
    console.error("error", error);
  }
};
containerData();
