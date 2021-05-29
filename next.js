
var upcount = 1;
var withs;
var storedvalues = []
var defpic = "url(pictures/stuff/default.jpg";
var newitem = true;
var globalitem1;
var item1;
var itemlength = $(".stuff").length;
var item2;
var catlength = $(".category").length
var allnone;
var nostuff;


var stufflist = {
    "Car" : "450",
    "Baseball" : "10",
    "Stadium" : "11000",
    "Japan" : "37797500000",
    "Television" : "110",
    "Refrigerator" : "91",
    "United States" : "983352000000",
    "South Korea" : "10036300000",
    "North America" : "2470900000000",
    "South America" : "1784000000000",
    "Europe" : "1018000000000",
    "Africa" : "3037000000000",
    "Asia" : "4457900000000",
    "Antarctica" : "1420000000000",
    "Australia" : "769202400000", 
    "Basketball" : "24",
    "Volleyball" : "21",
    "Coin" : "3",
    "Napkin" : "16",
    "Cup" : "11",
    "Spain" : "50599000000",
    "Norway" : "38520700000",
    "Bulgaria" : "11099300000",
    "New Zealand" : "26802100000",
    "Ireland" : "7027300000",
    "China" : "959696100000",
    "Russia" : "1709824600000",
    "Brazil" : "851576700000",
    "Egg" : "7",
    "Grape" : "3",
    "Watermelon" : "30",
    "Cat" : "46",
    "Elephant" : "400",
    "Ant" : "1",
    "Whale" : "1500",
    "Pencil" : "19",
    "Shoe" : "30",
    "House" : "1800",
    "Book" : "22"
}


function onreinstatestuff2() { 
  for(var i = 0; i < itemlength; i++) { 
    var stuff = $(".stuff")[i];
    if(stuff.style.display === "none") { 
      $(".stuff")[i].style.display = "block";
    }
  }
}


//When result button is clicked
$("#question-mark").click(function() { 
 
  //display result 
  $("#sumtext").css("display", "block")
  var itemnum = $("#figure").text()
  var item1 = $("#search1").val()
  var listitem1 = stufflist[item1]
  item2 = $("#search2").val()
  var listitem2 = stufflist[item2]
  var item2dim = parseInt(stufflist[item2]);
  var rawsum;
  var stuff1 = listitem1 * parseInt(itemnum)
  var lilover;
  
  //with or without a decimal point
   if((stuff1 / listitem2) > 10) {
     rawsum = Math.round(stuff1 / listitem2)
   } else { 
     rawsum = parseFloat(stuff1 / listitem2).toFixed(2)
       if(rawsum > 1.0 && rawsum < 1.1) { 
       rawsum = parseFloat(stuff1 / listitem2).toFixed(1)
       lilover = true
     } else rawsum = parseFloat(stuff1 / listitem2).toFixed(1)
       if(rawsum.slice(-2) === ".0") { 
         rawsum = Math.round(stuff1 / listitem2)
       }
   }
 

  $("#index1").text(itemnum)
  totalsum = rawsum.toLocaleString();
  if(lilover === true) { 
    $("#index2").text(totalsum)
    $("#lilover").css("display", "inline-block")
  } else { 
    $("#index2").text(totalsum)
    $("#lilover").css("display", "none")
  }


  //with or without 's' at the end.
  if(itemnum > 1) { 
    if(item1.slice(-1) === "s") { 
      $("#textitem1").text(item1)
      $("#plural").text("are")
    } else { 
      $("#textitem1").text(item1 + "s")
      $("#plural").text("are")
    }
    
  } else { 
    $("#textitem1").text(item1)
    $("#plural").text("is")
  }
  
  if(item2dim < stuff1) { 
    withs = true;
  } else withs = false;

   if(withs === true) { 
     if(item2.slice(-1) === "s" || lilover === true) { 
	    $("#textitem2").text(item2)
     } else $("#textitem2").text(item2 + "s")
   } else $("#textitem2").text(item2);

  
  //refresh both lists
  $("#search1default").prop("selected", true)
  $("#search2default").prop("selected", true)
  $("#search2").prop("disabled", true)
  $("#question-mark").prop("disabled", true)
  item2 = undefined;

  upcount = 1;
  $("#figure").text(upcount)

  onreinstatestuff2()
})



function onstuff1change() { 

  //remove item1 from stuff2 list
  for(var i = 0; i < itemlength; i++) { 
    var stuff2 = $(".stuff")[i].innerHTML;
    
    if(item1 === stuff2) { 
      $(".stuff")[i].style.display = "none"
      break;
    }
  }

  //remove smaller items from stuff2 list
  for(let item in stufflist) { 
    var propname = item;
    var itemsdim = parseInt(stufflist[propname]);
    var myitem = parseInt(stufflist[item1])
    var figurenum = $("#figure").text()
    var numofstuff = myitem * parseInt(figurenum)

    if(numofstuff < itemsdim) { 
    
      for(var m = 0; m < itemlength; m++) { 
        var stufftext = $(".stuff")[m].innerHTML;
        if(stufftext === propname) { 
          $(".stuff")[m].style.display = "none"
          break;

        }
      }
    } 
  }

  //remove stuff2 list category if no items inside
  for(var i = 0; i < catlength; i ++) { 
    var catid = $(".category")[i].getAttribute("id")

    $("#"+catid + "> option").each(function() { 
      if($(this).css("display") != "none") { 
        allnone = false;
        return false;
      } else allnone = true;
    })

    if(allnone === true) { 
      $("#"+catid).css("display", "none")
    }
  }
}


function onreinstate() { 

  //reinstate removed items from stuff2 list
  onreinstatestuff2()

  //reinstate removed categories from stuff2 list
  $(".category").filter(function() { 
    if($(this).css("display") === "none") { 
      $(this).css("display", "block")
    }
  })
}


function onemptylist() { 
   //in case no category left in stuff2 list
   $(".stuff").each(function() { 
    if($(this).css("display") != "none") { 
      nostuff = false;
      return false;
    } else nostuff = true;
  })
}


function onstuff2default() { 
  $("#search2default").prop("selected", true)
  $("#question-mark").prop("disabled", true)
  $("#pic2").css("backgroundImage", defpic)
}


function figurechange() { 

  onreinstate()
  onstuff1change() 

  //when smaller items are reinstated
  if($("#nosmaller").prop("selected") === true) { 
    $("#search2default").prop("selected", true)
    $("#search2").prop("disabled", false)
  }

  //if selected item on stuff2 list was removed
  for(var i = 0; i < itemlength; i++) { 
    var secondstuff = $(".stuff")[i].innerHTML;
    
    if(item2 === secondstuff) { 
      if($(".stuff")[i].style.display === "none") { 
        onstuff2default()
      }
    }
  }

  onemptylist()
  
  if(nostuff === true && $("#search1default").prop("selected") != true) { 
    $("#nosmaller").prop("selected", true)
    $("#search2").prop("disabled", true)
  }
}


//click UP button
$(".up").click(function() { 
  if(upcount < 999) {
    upcount++
    $("#figure").text(upcount)
    figurechange();
  } 
})

//click DOWN button
$(".down").click(function() { 
  if(upcount > 1) {
    upcount--
    $("#figure").text(upcount)
    figurechange();
  }
})


//when stuff1 list is altered
$("#search1").on("input", function() { 
  item1 = $(this).val();
  var stuff1length = $(".firststuff").length
  var trimmeditem1 = item1.split(" ").join('');
  var picurl = "url(pictures/stuff/" + trimmeditem1 + ".jpg";
  
  //in case selected stuff1 list item is changed
  if(newitem === true) { 
    globalitem1 = item1;
    newitem = false;
  }

  if(globalitem1 != item1) { 
    globalitem1 = item1;
    onreinstate()
    onstuff2default()
    upcount = 1;
    $("#figure").text(upcount)
    item2 = undefined;
  }

  onstuff1change()

  //set the right pic on stuff1 box
  for(var c = 0; c < stuff1length; c++) { 
    var stuff1 = $(".firststuff")[c].innerHTML;

    if(item1 === stuff1) { 
      $("#pic1").css("backgroundImage", picurl)
      break;
    } else $("#pic1").css("backgroundImage", defpic)
  }

  $("#search2").prop("disabled", false)

  onemptylist()

  if(nostuff === true) { 
    $("#nosmaller").prop("selected", true)
    $("#search2").prop("disabled", true)
  }
})


//when stuff2 list is altered
$("#search2").on("input", function() { 
  item2 = $(this).val();
  var trimmeditem2 = item2.split(" ").join('');
  var picurl = "url(pictures/stuff/" + trimmeditem2 + ".jpg";

  //set the right pic on stuff2 box
  for(var c = 0; c < itemlength; c++) { 
    var stuff1 = $(".stuff")[c].innerHTML;
   
    if(item2 === stuff1) { 
      $("#question-mark").prop("disabled", false)
      $("#pic2").css("backgroundImage", picurl)
      break;
    } else $("#pic2").css("backgroundImage", defpic)
  }
})


window.onload = function() { 
  $("#pic2").css("backgroundImage", defpic)
  $("#pic1").css("backgroundImage", defpic)
  $("#question-mark").prop("disabled", true)
}



