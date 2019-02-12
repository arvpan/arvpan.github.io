
// Hack to please the linter.
var goog = {require: function() {}};
goog.require('lf.Type');
goog.require('lf.op');
goog.require('lf.schema');





function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}



window.taku=0,window.tura=[],window.tara=0,
window.transform={"<>":"div","class":"item rilrtl-products-list__item item ","style":"height:505px;left:0;position:relative;top:0;width:323px;","html":[
    {"<>":"a","class":"rilrtl-products-list__link","href":"/ajio-low-top-lace-up-casual-shoes/p/460242738_black","html":[
        {"<>":"div","class":"preview","html":[
            {"<>":"div","class":"imgHolder","html":[
                {"<>":"img","alt":"AJIO Black Lace-Ups Low-Top Lace-Up Casual Shoes","class":"rilrtl-lazy-img  rilrtl-lazy-img-loaded",
                    "src":"https://raw.githubusercontent.com/arvpan/mytest/master/Desk/${productid}.jpg","html":""},
                {"<>":"div","class":"exclusive","html":" Exclusive "},
                {"<>":"div","class":"popUp","html":"Quick View"}
              ]},
            {"<>":"div","class":"contentHolder","html":[
                {"<>":"div","class":"brand","html":"${filterBrand}"},
                {"<>":"div","class":"name","html":"${productname}"},
                {"<>":"div","class":"","html":[
                    {"<>":"span","class":"price","html":"Rs. ${price}"},
                    {"<>":"div","class":"offer-price","html":[
                        {"<>":"span","class":"orginal-price","html":"Rs. ${prediscountprice}"},
                        {"<>":"span","class":"discount","html":"\n                                                          (${discount}% off)\n                                                      "}
                      ]}
                  ]}
              ]}
          ]}
      ]}
  ]};



(function() {

  var db;

  function buildSchema() {
    var schemaBuilder = lf.schema.create('ajioproduct', 1);
    schemaBuilder.createTable('product').
        addColumn('productid', lf.Type.STRING).
        addColumn('productname', lf.Type.STRING).
        addColumn('discount', lf.Type.NUMBER).
        addColumn('price', lf.Type.NUMBER).
        addColumn('prediscountprice', lf.Type.NUMBER).
        addColumn('filtersGender', lf.Type.STRING).
        addColumn('filterCategory', lf.Type.STRING).
        addColumn('filterBrand', lf.Type.STRING).
        addColumn('filterOccasion', lf.Type.STRING).
        addColumn('filterColors', lf.Type.STRING).
        addColumn('filterSizeFit', lf.Type.STRING).

        addNullable(['filtersGender']).
        addNullable(['filterCategory']).
        addNullable(['filterBrand']).
        addNullable(['filterOccasion']).
        addNullable(['filterColors']).
        addNullable(['filterSizeFit']).


        addIndex('idx_price', ['price']).
        addIndex('idx_Brand', ['filterBrand']);
    return schemaBuilder;
  }



  function checkForExistingData_() {
    var product = db.getSchema().table('product');
    return db.select().from(product).exec().then(
        function(rows) {


          return rows.length > 0;
        });
  }

   function insertData_() {
    var product = db.getSchema().table('product');
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/search.json');
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        var response = JSON.parse(xhr.responseText);
        var rows = response.map(function(obj) {
          return product.createRow(obj);
        });
        return db.insert().into(product).values(rows).exec();


      }
    }.bind(this);

  }


 function init_() {
    return buildSchema().connect().then((function(database) {
      db = database;
      window.db = database;
      return checkForExistingData_();
    })).then((function(dataExist) {
      return dataExist ? Promise.resolve() : insertData_();

    }));
  }



  //   function init_() {
  //   return buildSchema().connect().then((function(database) {
  //     db = database;
  //     window.db = database;
  //     return checkForExistingData_();
  //   })).then((function(dataExist) {
  //     return dataExist ? Promise.resolve() : insertData_();
  //   }));
  // }


  function selectAllMovies() {
  var product = db.getSchema().table('product');
  db.select(product.productid, product.productname,product.filterBrand, product.price,product.prediscountprice,product.discount).
      from(product).exec().then(
      function(results) {


          $('#total').text(results.length)



$('#total').text(results.length)

tara=results.length;



for (itk=0;itk<40;itk++) {
    $('.ReactVirtualized__Grid__innerScrollContainer').json2html(results[itk], transform);
    taku=itk;


}



tura=results.slice(taku,results.length);





      });
}



var gender=[],
    category=[],
    priceD=[],
    brand=[],
    occasion=[],
    size=[],
    color=[],
    compositeColor,
    compositeSize,
    compositeOccasion,
    compositeBrand,
    compositePrice,
    compositeGender=null,
    compositeCategory=null;
 $(function() {



  init_().then(function() {





// if (document.cookie.match(/^(.*;)?\s*ppkcookie\s*=\s*[^;]+(.*)?$/)===null && checkForExistingData_())
//  {
//   setInterval(function () {

setTimeout( function() {

if (document.cookie.match(/^(.*;)?\s*ppkcookie\s*=\s*[^;]+(.*)?$/)===null )
 {

 selectAllMovies();
 setCookie('ppkcookie',1,1);
    
}
     }  , 1000 );


    // selectAllMovies()




//             }, 100);
//
// }

if (document.cookie.match(/^(.*;)?\s*ppkcookie\s*=\s*[^;]+(.*)?$/)!==null)
{
     selectAllMovies()



}


     var product = db.getSchema().table('product');




       if(gender.length==0 ){
        gender.push(product.price.gte(0));

}


     compositeGender = gender.length > 0 ?
          lf.op.or.apply(null, gender) :
          null;

           if(category.length==0 ){
        category.push(product.price.gte(0));

}
    compositeCategory = category.length > 0 ?
          lf.op.or.apply(null, category) :
          null;



           if(priceD.length==0 ){
        priceD.push(product.price.gte(0));

}

         compositePrice = priceD.length > 0 ?
          lf.op.or.apply(null, priceD) :
          null;

     if(brand.length==0 ){
        brand.push(product.price.gte(0));

}


          compositeBrand = brand.length > 0 ?
          lf.op.or.apply(null, brand) :
          null;


        if(occasion.length==0 ){
        occasion.push(product.price.gte(0));

}


          compositeOccasion = occasion.length > 0 ?
          lf.op.or.apply(null, occasion) :
          null;


             if(size.length==0 ){
        size.push(product.price.gte(0));

}


          compositeSize = size.length > 0 ?
          lf.op.or.apply(null, size) :
          null;

            if(color.length==0 ){
        color.push(product.price.gte(0));

}


          compositeColor = color.length > 0 ?
          lf.op.or.apply(null, color) :
          null;



   $('#gender').click(function(){




           gender = [];
           $('#gender :checkbox:checked').each(function (i) {

                gender.push(product.filtersGender.match( $(this).val()));


           });



       if(gender.length==0 ){
        gender.push(product.price.gte(0));

}


          compositeGender = gender.length > 0 ?
          lf.op.or.apply(null, gender) :
          null;

             var  query = db.select(product.productid, product.productname,product.filterBrand,
                    product.price,product.prediscountprice,product.discount).from(product).
 where(lf.op.and(compositeGender,compositeCategory,compositePrice,compositeBrand,compositeOccasion,compositeSize,compositeColor));
       query.exec().then(function(results) {
           $('#total').text(results.length)

            $('.ReactVirtualized__Grid__innerScrollContainer').empty();

tura=results;

for (itk=0;itk<Math.min(40,tura.length);itk++) {
    $('.ReactVirtualized__Grid__innerScrollContainer').json2html(results[itk], transform);

}
       })





   });


  $('#category').click(function(){




           category = [];
           $('#category :checkbox:checked').each(function (i) {

                category.push(product.filterCategory.eq( $(this).val()));


           });



          if(category.length==0 ){
        category.push(product.price.gte(0));

}



        compositeCategory = category.length > 0 ?
          lf.op.or.apply(null, category) :
          null;


             var  query = db.select(product.productid, product.productname,product.filterBrand,
                    product.price,product.prediscountprice,product.discount).from(product).
 where(lf.op.and(compositeGender,compositeCategory,compositePrice,compositeBrand,compositeOccasion,compositeSize,compositeColor));
       query.exec().then(function(results) {
           $('#total').text(results.length)

            $('.ReactVirtualized__Grid__innerScrollContainer').empty();

tura=results;

for (itk=0;itk<Math.min(40,tura.length);itk++) {
    $('.ReactVirtualized__Grid__innerScrollContainer').json2html(results[itk], transform);

}
       })


   });



  $('#price').click(function(){




           priceD = [];
           $('#price :checkbox:checked').each(function (i) {

 ArryPrice=[];
               temp=$(this).val().split("-");

               for (iki=0;iki<temp.length;iki++){

                  ArryPrice.push(parseInt(temp[iki]))
               }


                   priceD.push(product.price.between(ArryPrice[0],ArryPrice[1]));





           });


               if(priceD.length==0 ){
        priceD.push(product.price.gte(0));

}



      compositePrice = priceD.length > 0 ?
          lf.op.or.apply(null, priceD) :
          null;



             var  query = db.select(product.productid, product.productname,product.filterBrand,
                    product.price,product.prediscountprice,product.discount).from(product).
where(lf.op.and(compositeGender,compositeCategory,compositePrice,compositeBrand,compositeOccasion,compositeSize,compositeColor));
       query.exec().then(function(results) {
           $('#total').text(results.length)

            $('.ReactVirtualized__Grid__innerScrollContainer').empty();

tura=results;

for (itk=0;itk<Math.min(40,tura.length);itk++) {
    $('.ReactVirtualized__Grid__innerScrollContainer').json2html(results[itk], transform);

}
       })


   });

     $('#brand').click(function(){




           brand = [];
           $('#brand :checkbox:checked').each(function (i) {

                brand.push(product.filterBrand.eq( $(this).val()));


           });



       if(brand.length==0 ){
        brand.push(product.price.gte(0));

}


          compositeBrand = brand.length > 0 ?
          lf.op.or.apply(null, brand) :
          null;

             var  query = db.select(product.productid, product.productname,product.filterBrand,
                    product.price,product.prediscountprice,product.discount).from(product).
 where(lf.op.and(compositeGender,compositeCategory,compositePrice,compositeBrand,compositeOccasion,compositeSize,compositeColor));
       query.exec().then(function(results) {
           $('#total').text(results.length)

            $('.ReactVirtualized__Grid__innerScrollContainer').empty();

tura=results;

for (itk=0;itk<Math.min(40,tura.length);itk++) {
    $('.ReactVirtualized__Grid__innerScrollContainer').json2html(results[itk], transform);

}
       })





   });




       $('#occasion').click(function(){




           occasion = [];
           $('#occasion :checkbox:checked').each(function (i) {

                occasion.push(product.filterOccasion.match( $(this).val()));


           });



       if(occasion.length==0 ){
        occasion.push(product.price.gte(0));

}


          compositeOccasion = occasion.length > 0 ?
          lf.op.or.apply(null, occasion) :
          null;

             var  query = db.select(product.productid, product.productname,product.filterBrand,
                    product.price,product.prediscountprice,product.discount).from(product).
 where(lf.op.and(compositeGender,compositeCategory,compositePrice,compositeBrand,compositeOccasion,compositeSize,compositeColor));
       query.exec().then(function(results) {
           $('#total').text(results.length)

            $('.ReactVirtualized__Grid__innerScrollContainer').empty();

tura=results;

for (itk=0;itk<Math.min(40,tura.length);itk++) {
    $('.ReactVirtualized__Grid__innerScrollContainer').json2html(results[itk], transform);

}
       })





   });

       $('#colors').click(function(){




           color = [];
           $('#colors :checkbox:checked').each(function (i) {

                color.push(product.filterColors.match( $(this).val()));


           });



       if(color.length==0 ){
        color.push(product.price.gte(0));

}


          compositeColor = color.length > 0 ?
          lf.op.or.apply(null, color) :
          null;

             var  query = db.select(product.productid, product.productname,product.filterBrand,
                    product.price,product.prediscountprice,product.discount).from(product).
 where(lf.op.and(compositeGender,compositeCategory,compositePrice,compositeBrand,compositeOccasion,compositeSize,compositeColor));
       query.exec().then(function(results) {
           $('#total').text(results.length)

            $('.ReactVirtualized__Grid__innerScrollContainer').empty();

tura=results;

for (itk=0;itk<Math.min(40,tura.length);itk++) {
    $('.ReactVirtualized__Grid__innerScrollContainer').json2html(results[itk], transform);

}
       })





   });

       $('#size').click(function(){




           size = [];
           $('#size :checkbox:checked').each(function (i) {

                size.push(product.filterSizeFit.match( $(this).val()));


           });



       if(size.length==0 ){
        size.push(product.price.gte(0));

}


          compositeSize = size.length > 0 ?
          lf.op.or.apply(null, size) :
          null;

             var  query = db.select(product.productid, product.productname,product.filterBrand,
                    product.price,product.prediscountprice,product.discount).from(product).
 where(lf.op.and(compositeGender,compositeCategory,compositePrice,compositeBrand,compositeOccasion,compositeSize,compositeColor));
       query.exec().then(function(results) {
           $('#total').text(results.length)

            $('.ReactVirtualized__Grid__innerScrollContainer').empty();

tura=results;

for (itk=0;itk<Math.min(40,tura.length);itk++) {
    $('.ReactVirtualized__Grid__innerScrollContainer').json2html(results[itk], transform);

}
       })





   });









  });
});





















  })();
