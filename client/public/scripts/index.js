function getVisitorData() {
  $.getJSON('/visitor-data', function(data) {
    document.getElementById("data-visitors").innerHTML = data[0].sitevisitors; 
  });
};

function getPlantData() {
  $.getJSON('/plant-data', function(data) {
    document.getElementById("data-plant").innerHTML = data[0].plantwater; 
  });
};

function getDrinksData() {
  $.getJSON('/drinks-data', function(data) {
    drinksCount = data[0].drinkscount;
    document.getElementById("data-drinks").innerHTML = drinksCount; 
  });
};

function getOfficeTempData() {
  $.getJSON('/office-temp-data', function(data) {
    officeTemp = data[0].officetemp;
    document.getElementById("data-office-temp").innerHTML = officeTemp; 
  });
};

function getOutsideTempData() {
  $.getJSON('/outside-temp-data', function(data) {
    document.getElementById("data-outside-temp").innerHTML = data[0].outsidetemp; 
  });
};

function getAllData() {
  getVisitorData();
  getPlantData();
  getDrinksData();
  getOfficeTempData();
  getOutsideTempData();
};

function updateOfficeTemp(direction) {
  var oldtemp = officeTemp;
  if (direction == 'increase') {
    var newtemp = oldtemp + 1;
  } else {
    var newtemp = oldtemp - 1;
  };
  $.ajax({
    url: '/office-temp-data',
    type: 'PUT',
    data: {
      'oldtemp': oldtemp,
      'newtemp': newtemp,
    },
    success: function(){
      console.log("PUT worked");
      getOfficeTempData();
    }
  });
};

function updateDrinksCount(direction) {
  var oldcount = drinksCount;
  if (direction == 'increase') {
    var newcount = oldcount + 1;
  } else {
    var newcount = oldcount - 1;
  };
  $.ajax({
    url: '/drinks-data',
    type: 'PUT',
    data: {
      'oldcount': oldcount,
      'newcount': newcount,
    },
    success: function(){
      console.log("PUT worked");
      getDrinksData();
    }
  });
};

$( "#increase-office-temp" ).click(function() {
  var direction = 'increase';
  updateOfficeTemp(direction);
});

$( "#decrease-office-temp" ).click(function() {
  var direction = 'decrease';
  updateOfficeTemp(direction);
});

$( "#increase-drinks-count" ).click(function() {
  var direction = 'increase';
  updateDrinksCount(direction);
});

$( "#decrease-drinks-count" ).click(function() {
  var direction = 'decrease';
  updateDrinksCount(direction);
});

getAllData();
