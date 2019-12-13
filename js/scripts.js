var female = 0;
var male = 0;
var favoriteFootball = 0;

$(document).ready(function(){
  buildTable();
  loadData();
  loadImages();
});


function loadData() {
  //ajax request
  //onSuccess parseData(data);

  $.ajax({
    method: "GET",
    url: "https://www.googleapis.com/download/storage/v1/b/teaching-api/o/people.json?generation=1576123202877101&alt=media",
    dataType: "text",
    success: parseData
  });
//
}

function parseData(data) {

  dataObj = $.parseJSON(data);
  for (var i = 0, len = dataObj.length; i < len; ++i) {
// console.log("inside loop");
// console.log(dataObj[i]["favoriteSport"]);
      if (dataObj[i]["gender"] == "female") {
          female = female + 1;
      } else {
          male = male + 1;
        }
      if(dataObj[i]["favoriteSport"] == "Football") {
          favoriteFootball++;
        }
      }
      console.log(female);
      console.log(male);



  buildCharts();
}

function buildCharts() {

var chart = c3.generate({
    bindto: '#chartTop',
    data: {
        // iris data from R
        columns: [
            ['Female', female],
            ['Male', male],
        ],
        type : 'pie',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    }
});

var total = female + male;
document.getElementById("stat").innerHTML = favoriteFootball + ' out of ' + total + ' favorite sport is football';

}


function buildTable() {
 $('#example').DataTable( {
       ajax: {
         url: 'https://www.googleapis.com/download/storage/v1/b/teaching-api/o/people.json?generation=1576123202877101&alt=media',
         dataSrc: ''
       },
       columns: [
         {data: 'name'},
         {data: 'company'},
         {data: 'email'},
         {data: 'gender'},
         {data: 'favoriteSport'},
         {data: 'about'},
         {data: 'picture', render: getImg }


       ],
       rowReorder: {
            selector: 'td:nth-child(2)'
        },
        responsive: true
   } );

}

function getImg(data, type, full, meta) {
       //
       return '<img  src="http://placehold.it/32x32" />';
}


function loadImages() {
  //ajax request
  //onSuccess parseData(data);

  $.ajax({
    method: "GET",
    url: "https://www.googleapis.com/download/storage/v1/b/teaching-api/o/photos.json?generation=1576123660992318&alt=media",
    dataType: "text",
    success: slider
  });
//
}

function slider(data) {
  dataObj = $.parseJSON(data);


  document.getElementById("slider").innerHTML = '<div id="carouselExampleControls" class="carousel slide" data-ride="carousel"> <div class="carousel-inner"> <div class="carousel-item active"><img class="d-block w-100" src="' + dataObj["photo-gallery"]["images"]["image"][0]["image-path"] + '" alt="First slide"> </div> <div class="carousel-item"> <img class="d-block w-100" src="'+ dataObj["photo-gallery"]["images"]["image"][1]["image-path"] +'" alt="Second slide"> </div> <div class="carousel-item"> <img class="d-block w-100" src="'+ dataObj["photo-gallery"]["images"]["image"][2]["image-path"]+'" alt="Third slide"> </div></div> <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev"> <span class="carousel-control-prev-icon" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a> <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a></div>'
}
