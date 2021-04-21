const categories = [
  {
    name: "Fruits",
    image:
      "https://resize.indiatvnews.com/en/resize/newbucket/715_-/2020/11/fruits-1606296336.jpg",
  },
  {
    name: "Vegetables",

    image:
      "https://multiplexurbangreen.com/pub/media/magefan_blog/Top%205%20vegetables%20to%20grow%20for%20terrace%20gardening.jpg",
  },
  {
    name: "Spices",

    image: "https://www.viralspices.com/wp-content/uploads/2018/07/Spices.jpg",
  },
  {
    name: "Food Grain",

    image:
      "https://5.imimg.com/data5/PR/VB/GLADMIN-41723424/pulses-500x500.png",
  },
  {
    name: "Oils",

    image:
      "https://s3.ap-south-1.amazonaws.com/media.netpebecho.com/momsmegamart/photos/category/1554214913oil%20and%20shee.jpg",
  },
  {
    name: "Bakery",

    image: "https://www.ubackground.com/_ph/9/92635964.jpg",
  },
  {
    name: "Non-veg",

    image: "https://www.vegro.in/wp-content/uploads/2019/10/Raw-Non-Veg.png",
  },
  {
    name: "Snacks",

    image:
      "https://www.shopickr.com/wp-content/uploads/2019/07/icon_cat_15_v_3_500_1553422359.jpg",
  },
];

const subcategories = [
  {
    name: "Seasonal Fruits",
    image: "https://upload.echemi.com/2019/0508/1557282602876.png",
  },
  {
    name: "Fleshy Fruits",
    image: "https://cdn.britannica.com/58/91558-004-02230751.jpg",
  },
  {
    name: "Leafy Vegetables",
    image:
      "https://www.verywellfit.com/thmb/SjYjIoGedSqO-nsoAPEyy4mrj5E=/500x350/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-962568356-38ba213f25ba43159500d909c4d5c926.jpg",
  },
  {
    name: "Root Vegetables",
    image:
      "https://3i77hz2byv5n1pii73412ndb-wpengine.netdna-ssl.com/wp-content/uploads/2020/01/iStock-1179964637.jpg",
  },
  {
    name: "Herbs and seasoning",
    image:
      "https://s20427.pcdn.co/wp-content/uploads/2017/09/22-Different-Spices-and-Herbs-and-How-to-Use-Them.jpg",
  },
  {
    name: "Cooking Spices",
    image:
      "https://media.30seconds.com/tip/lg/Spices-to-Add-to-Your-Cooking-Arsenal-19595-7288836097-1596569506.jpg",
  },
  {
    name: "Garam Masala",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/61cpI1VXCUL._SL1000_.jpg",
  },
  {
    name: "Pulses",
    image: "https://i.dawn.com/primary/2020/06/5edd9bb804f98.jpg",
  },
  {
    name: "Rice",
    image:
      "https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/foodnavigator-asia.com/headlines/markets/going-against-the-grain-declining-political-and-price-interference-provides-rice-sourcing-boost-to-asia-food-firms/11938415-1-eng-GB/Going-against-the-grain-Declining-political-and-price-interference-provides-rice-sourcing-boost-to-Asia-food-firms.jpg",
  },
  {
    name: "Edible Oil",
    image: "https://i.dawn.com/primary/2020/02/5e4058203c39d.jpg",
  },
  {
    name: "Snacks",
    image:
      "https://www.familyvacationcritic.com/wp-content/uploads/sites/19/2020/04/shutterstock-HERO-snacks-Ekaterina-Markelova.jpg",
  },
  {
    name: "Chicken",
    image:
      "https://images.ctfassets.net/3s5io6mnxfqz/6LZKudgmuP2XiHDwTSfem3/09ab4c9aa502c4cc119d4473f301daff/AdobeStock_200759507.jpeg?w=900&fm=jpg&fl=progressive",
  },
  {
    name: "Fish",
    image:
      "https://www.nutritionaction.com/wp-content/uploads/photodune-11194832-fresh-fish-xs.jpg",
  },
  {
    name: "Pasta",
    image:
      "https://studentlifeguide.co.uk/wp-content/uploads/2016/07/Pasta.jpg",
  },
  {
    name: "Noodles",
    image:
      "https://assets.gqindia.com/photos/5f6afcb8b41de4ca60031a6f/16:9/w_1920,c_limit/Best%20Instant%20Noodles%20in%20India%20(2).jpg",
  },
  {
    name: "Sauce",
    image:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-ketchup-1585931196.jpg?crop=1.00xw:0.997xh;0,0&resize=1200:*",
  },
  {
    name: "Pest control",
    image:
      "https://www.reganagency.com/wp-content/uploads/2019/11/The-Importance-of-Pest-Control-in-Libraries-e1574699832585.jpg",
  },
  {
    name: "Cleaning",
    image:
      "https://de927adv5b23k.cloudfront.net/wp-content/uploads/2017/10/11144136/shutterstock_677952907.jpg",
  },
  {
    name: "Appliances",
    image:
      "https://lh3.googleusercontent.com/proxy/9xAv2tCkIEm5kNENHjtXhFfRfCPYr-DnSMIGIOfcD68leZXjOJ8molZge2vFhItE7YRdUS6LiFkZsir0u4K46G3lLxtMRuN-3VVLaEwtCcFoq9uzG_Pyc7TLnZXZHe0EfIHf0msvXIdRKT6TtbENXpg_hv8eCNpyl-17U07Rv75VGdTbyqUXHoZosQyK-A",
  },
  {
    name: "Electronic Repair",
    image:
      "https://boiseappliancerepairservice.com/wp-content/uploads/2019/07/home-appliance-repair.jpg",
  },
  {
    name: "Appliances Repair",
    image:
      "https://www.abservice.in/wp-content/uploads/2017/10/Fridge-repair-service-coimbatore.jpg",
  },
  {
    name: "Electrcians",
    image:
      "https://content.jdmagicbox.com/comp/kolkata/j7/033pxx33.xx33.160304104903.l9j7/catalogue/mymistriwala-shyambazar-kolkata-electricians-hfx2nrbjg4.jpg?clr=",
  },
  {
    name: "Plumber",
    image:
      "https://advancedplumbingandrootertexas.com/wp-content/uploads/2019/01/How-Do-I-Find-a-Reliable-Plumber-Near-Me-2.jpg",
  },
  {
    name: "Spa",
    image: "https://tropicalretreat.in/assets/img/spamain.jpeg",
  },
  {
    name: "Parlour",
    image:
      "https://s3-ap-southeast-1.amazonaws.com/urbanclap-prod/categories/home_screen_v3/discover/promocards/Salonhomescreen.png",
  },
  {
    name: "Salon",
    image:
      "https://img.over-blog-kiwi.com/3/37/65/86/20190729/ob_cd645d_blog-01.jpg",
  },
];

module.exports = {
  categories: categories,
  subcategories: subcategories,
};
