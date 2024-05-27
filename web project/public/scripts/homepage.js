// const puppeteer = require("puppeteer");

$(document).ready(function () {
  // Click event for carousel indicators
  $(".carousel-indicators li").click(function () {
    var slideTo = $(this).attr("data-slide-to");
    $("#myCarousel").carousel(parseInt(slideTo));
  });

  //   (async () => {
  //     const browser = await puppeteer.launch();
  //     const page = await browser.newPage();
  //     await page.goto("https://furorjeans.com/collections/men-casual-shirts");

  //     // Wait for the product cards to be loaded
  //     await page.waitForSelector(".product-card");

  //     // Get product card elements
  //     const productCards = await page.$$(".product-card");

  //     // Loop through each product card element
  //     for (const productCard of productCards) {
  //       // Extract product title
  //       const title = await productCard.$eval(".product-card-title", (element) =>
  //         element.textContent.trim()
  //       );

  //       // Extract image URL
  //       const imageUrl = await productCard.$eval(
  //         ".product-primary-image",
  //         (img) => img.getAttribute("src")
  //       );

  //       // Extract available sizes
  //       const sizes = await productCard.$$eval(
  //         ".product-card-sizes--size span",
  //         (sizes) => sizes.map((size) => size.textContent)
  //       );

  //       // Extract prices
  //       const comparePrice = await productCard.$eval(
  //         ".compare-price del",
  //         (element) => element.textContent.trim()
  //       );
  //       const salePrice = await productCard.$eval(".price.on-sale", (element) =>
  //         element.textContent.trim()
  //       );

  //       // Display product information
  //       console.log("Title:", title);
  //       console.log("Image URL:", imageUrl);
  //       console.log("Available Sizes:", sizes);
  //       console.log("Compare Price:", comparePrice);
  //       console.log("Sale Price:", salePrice);
  //       console.log("-------------------");
  //     }

  //     await browser.close();
  //   })();
});
