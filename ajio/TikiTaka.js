var goog={require:function(){}};function setCookie(e,t,l){var n="";if(l){var r=new Date;r.setTime(r.getTime()+24*l*60*60*1e3),n="; expires="+r.toUTCString()}document.cookie=e+"="+(t||"")+n+"; path=/"}function getCookie(e){for(var t=e+"=",l=document.cookie.split(";"),n=0;n<l.length;n++){for(var r=l[n];" "==r.charAt(0);)r=r.substring(1,r.length);if(0==r.indexOf(t))return r.substring(t.length,r.length)}return null}function eraseCookie(e){document.cookie=e+"=; Max-Age=-99999999;"}goog.require("lf.Type"),goog.require("lf.op"),goog.require("lf.schema"),window.taku=0,window.tura=[],window.tara=0,window.transform={"<>":"div",class:"item rilrtl-products-list__item item ",style:"height:505px;left:0;position:relative;top:0;width:323px;",html:[{"<>":"a",class:"rilrtl-products-list__link",href:"/ajio-low-top-lace-up-casual-shoes/p/460242738_black",html:[{"<>":"div",class:"preview",html:[{"<>":"div",class:"imgHolder",html:[{"<>":"img",alt:"AJIO Black Lace-Ups Low-Top Lace-Up Casual Shoes",class:"rilrtl-lazy-img  rilrtl-lazy-img-loaded",src:"https://raw.githubusercontent.com/arvpan/mytest/master/Desk/${productid}.jpg",html:""},{"<>":"div",class:"exclusive",html:" Exclusive "},{"<>":"div",class:"popUp",html:"Quick View"}]},{"<>":"div",class:"contentHolder",html:[{"<>":"div",class:"brand",html:"${filterBrand}"},{"<>":"div",class:"name",html:"${productname}"},{"<>":"div",class:"",html:[{"<>":"span",class:"price",html:"Rs. ${price}"},{"<>":"div",class:"offer-price",html:[{"<>":"span",class:"orginal-price",html:"Rs. ${prediscountprice}"},{"<>":"span",class:"discount",html:"\n                                                          (${discount}% off)\n                                                      "}]}]}]}]}]}]},function(){var n;function e(){return(e=lf.schema.create("ajioproduct",1),e.createTable("product").addColumn("productid",lf.Type.STRING).addColumn("productname",lf.Type.STRING).addColumn("discount",lf.Type.NUMBER).addColumn("price",lf.Type.NUMBER).addColumn("prediscountprice",lf.Type.NUMBER).addColumn("filtersGender",lf.Type.STRING).addColumn("filterCategory",lf.Type.STRING).addColumn("filterBrand",lf.Type.STRING).addColumn("filterOccasion",lf.Type.STRING).addColumn("filterColors",lf.Type.STRING).addColumn("filterSizeFit",lf.Type.STRING).addNullable(["filtersGender"]).addNullable(["filterCategory"]).addNullable(["filterBrand"]).addNullable(["filterOccasion"]).addNullable(["filterColors"]).addNullable(["filterSizeFit"]).addIndex("idx_price",["price"]).addIndex("idx_Brand",["filterBrand"]),e).connect().then(function(e){return n=e,window.db=e,t=n.getSchema().table("product"),n.select().from(t).exec().then(function(e){return 0<e.length});var t}).then(function(e){return e?Promise.resolve():function(){var t=n.getSchema().table("product"),l=new XMLHttpRequest;l.open("GET","data/search.json"),l.send(),l.onreadystatechange=function(){if(4==l.readyState){var e=JSON.parse(l.responseText).map(function(e){return t.createRow(e)});return n.insert().into(t).values(e).exec()}}.bind(this)}()});var e}var l,r,i,o,c,a=[],u=[],p=[],d=[],s=[],h=[],f=[],m=null,g=null;$(function(){e().then(function(){setInterval(function(){var e;null===document.cookie.match(/^(.*;)?\s*ppkcookie\s*=\s*[^;]+(.*)?$/)&&(e=n.getSchema().table("product"),n.select(e.productid,e.productname,e.filterBrand,e.price,e.prediscountprice,e.discount).from(e).exec().then(function(e){for($("#total").text(e.length),$("#total").text(e.length),tara=e.length,itk=0;itk<40;itk++)$(".ReactVirtualized__Grid__innerScrollContainer").json2html(e[itk],transform),taku=itk;tura=e.slice(taku,e.length)}),setCookie("ppkcookie","1",1))},100);var t=n.getSchema().table("product");0==a.length&&a.push(t.price.gte(0)),m=0<a.length?lf.op.or.apply(null,a):null,0==u.length&&u.push(t.price.gte(0)),g=0<u.length?lf.op.or.apply(null,u):null,0==p.length&&p.push(t.price.gte(0)),c=0<p.length?lf.op.or.apply(null,p):null,0==d.length&&d.push(t.price.gte(0)),o=0<d.length?lf.op.or.apply(null,d):null,0==s.length&&s.push(t.price.gte(0)),i=0<s.length?lf.op.or.apply(null,s):null,0==h.length&&h.push(t.price.gte(0)),r=0<h.length?lf.op.or.apply(null,h):null,0==f.length&&f.push(t.price.gte(0)),l=0<f.length?lf.op.or.apply(null,f):null,$("#gender").click(function(){a=[],$("#gender :checkbox:checked").each(function(e){a.push(t.filtersGender.match($(this).val()))}),0==a.length&&a.push(t.price.gte(0)),m=0<a.length?lf.op.or.apply(null,a):null,n.select(t.productid,t.productname,t.filterBrand,t.price,t.prediscountprice,t.discount).from(t).where(lf.op.and(m,g,c,o,i,r,l)).exec().then(function(e){for($("#total").text(e.length),$(".ReactVirtualized__Grid__innerScrollContainer").empty(),tura=e,itk=0;itk<Math.min(40,tura.length);itk++)$(".ReactVirtualized__Grid__innerScrollContainer").json2html(e[itk],transform)})}),$("#category").click(function(){u=[],$("#category :checkbox:checked").each(function(e){u.push(t.filterCategory.eq($(this).val()))}),0==u.length&&u.push(t.price.gte(0)),g=0<u.length?lf.op.or.apply(null,u):null,n.select(t.productid,t.productname,t.filterBrand,t.price,t.prediscountprice,t.discount).from(t).where(lf.op.and(m,g,c,o,i,r,l)).exec().then(function(e){for($("#total").text(e.length),$(".ReactVirtualized__Grid__innerScrollContainer").empty(),tura=e,itk=0;itk<Math.min(40,tura.length);itk++)$(".ReactVirtualized__Grid__innerScrollContainer").json2html(e[itk],transform)})}),$("#price").click(function(){p=[],$("#price :checkbox:checked").each(function(e){for(ArryPrice=[],temp=$(this).val().split("-"),iki=0;iki<temp.length;iki++)ArryPrice.push(parseInt(temp[iki]));p.push(t.price.between(ArryPrice[0],ArryPrice[1]))}),0==p.length&&p.push(t.price.gte(0)),c=0<p.length?lf.op.or.apply(null,p):null,n.select(t.productid,t.productname,t.filterBrand,t.price,t.prediscountprice,t.discount).from(t).where(lf.op.and(m,g,c,o,i,r,l)).exec().then(function(e){for($("#total").text(e.length),$(".ReactVirtualized__Grid__innerScrollContainer").empty(),tura=e,itk=0;itk<Math.min(40,tura.length);itk++)$(".ReactVirtualized__Grid__innerScrollContainer").json2html(e[itk],transform)})}),$("#brand").click(function(){d=[],$("#brand :checkbox:checked").each(function(e){d.push(t.filterBrand.eq($(this).val()))}),0==d.length&&d.push(t.price.gte(0)),o=0<d.length?lf.op.or.apply(null,d):null,n.select(t.productid,t.productname,t.filterBrand,t.price,t.prediscountprice,t.discount).from(t).where(lf.op.and(m,g,c,o,i,r,l)).exec().then(function(e){for($("#total").text(e.length),$(".ReactVirtualized__Grid__innerScrollContainer").empty(),tura=e,itk=0;itk<Math.min(40,tura.length);itk++)$(".ReactVirtualized__Grid__innerScrollContainer").json2html(e[itk],transform)})}),$("#occasion").click(function(){s=[],$("#occasion :checkbox:checked").each(function(e){s.push(t.filterOccasion.match($(this).val()))}),0==s.length&&s.push(t.price.gte(0)),i=0<s.length?lf.op.or.apply(null,s):null,n.select(t.productid,t.productname,t.filterBrand,t.price,t.prediscountprice,t.discount).from(t).where(lf.op.and(m,g,c,o,i,r,l)).exec().then(function(e){for($("#total").text(e.length),$(".ReactVirtualized__Grid__innerScrollContainer").empty(),tura=e,itk=0;itk<Math.min(40,tura.length);itk++)$(".ReactVirtualized__Grid__innerScrollContainer").json2html(e[itk],transform)})}),$("#color").click(function(){f=[],$("#color :checkbox:checked").each(function(e){f.push(t.filterColors.match($(this).val()))}),0==f.length&&f.push(t.price.gte(0)),l=0<f.length?lf.op.or.apply(null,f):null,n.select(t.productid,t.productname,t.filterBrand,t.price,t.prediscountprice,t.discount).from(t).where(lf.op.and(m,g,c,o,i,r,l)).exec().then(function(e){for($("#total").text(e.length),$(".ReactVirtualized__Grid__innerScrollContainer").empty(),tura=e,itk=0;itk<Math.min(40,tura.length);itk++)$(".ReactVirtualized__Grid__innerScrollContainer").json2html(e[itk],transform)})}),$("#size").click(function(){h=[],$("#size :checkbox:checked").each(function(e){h.push(t.filterSizeFit.match($(this).val()))}),0==h.length&&h.push(t.price.gte(0)),r=0<h.length?lf.op.or.apply(null,h):null,n.select(t.productid,t.productname,t.filterBrand,t.price,t.prediscountprice,t.discount).from(t).where(lf.op.and(m,g,c,o,i,r,l)).exec().then(function(e){for($("#total").text(e.length),$(".ReactVirtualized__Grid__innerScrollContainer").empty(),tura=e,itk=0;itk<Math.min(40,tura.length);itk++)$(".ReactVirtualized__Grid__innerScrollContainer").json2html(e[itk],transform)})})})})}();
