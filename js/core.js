window.colchoa_params = {
  "selected_size": null,
  "selected_person_length": null,
  "selected_material": null,
  "person_one_weight": null,
  "person_one_height": null,
  "person_two_weight": null,
  "person_two_height": null
};

$(document).ready(function() {
  toggleHeader();
  $(window).scroll(function (event) {
    toggleHeader();
  });

  $("html, body").animate({
    scrollTop: 0
  });

  calculateBanner();
});

$(window).on("resize", function() {
  if (window.innerWidth > 768) {
    calculateBanner();
  }
});

function calculateBanner() {
  $(".banner").css({
    "height": window.innerHeight + "px",
    "min-height": ($(".banner-content").height() + 80) + "px"
  });
}

function toggleHeader() {
  var height = window.innerWidth < 768 ? 80 : 100;
  if (window.pageYOffset > 0) {
    $(".header").addClass("has-background");
  } else {
    $(".header").removeClass("has-background");
  }
}

function resetSelectedSize() {
  $(".calculator-pillow").removeClass("active");
  refreshNavigationsStepOne();
}

function canAdvanceStepOne() {
  return $(".calculator-pillow.active").length > 0;
}

function refreshNavigationsStepOne() {
  if (canAdvanceStepOne()) {
    $(".next-1").removeClass("inactive");
  } else {
    $(".next-1").addClass("inactive");
  };
}

function canAdvanceStepTwo() {
  return $(".calculator-person.active").length > 0;
}

function canAdvanceStepThree() {
  var personOneCan = false;
  var personTwoCan = false;
  if (colchoa_params.person_one_weight !== null &&
  colchoa_params.person_one_weight > 0 &&
  colchoa_params.person_one_height !== null &&
  colchoa_params.person_one_height > 0) {
    personOneCan = true;
  }

  if (colchoa_params.selected_person_length === 2) {
    if (colchoa_params.person_two_weight !== null &&
    colchoa_params.person_two_weight > 0 &&
    colchoa_params.person_two_height !== null &&
    colchoa_params.person_two_height > 0) {
      personTwoCan = true;
    }
  }

  return colchoa_params.selected_person_length === 1 ? personOneCan : (personOneCan && personTwoCan);
}

function canAdvanceStepFour() {
  return $(".calculator-material.active").length > 0;
}

function refreshNavigationsStepTwo() {
  if (canAdvanceStepTwo()) {
    $(".next-2").removeClass("inactive");
  } else {
    $(".next-2").addClass("inactive");
  };
}

function refreshNavigationsStepThree() {
  if (canAdvanceStepThree()) {
    $(".next-3").removeClass("inactive");
  } else {
    $(".next-3").addClass("inactive");
  };
}

function refreshNavigationsStepFour() {
  if (canAdvanceStepFour()) {
    $(".next-4").removeClass("inactive");
  } else {
    $(".next-4").addClass("inactive");
  };
}

function showStepOne() {
  $(".calculator-header-title.one").show();
  $(".calculator-step.one").show();
  $(".calculator-footer.one").css({"display": "flex"});
}

function hideStepOne() {
  $(".calculator-header-title.one").hide();
  $(".calculator-step.one").hide();
  $(".calculator-footer.one").hide();
}

function showStepTwo() {
  $(".calculator-header-title.two").show();
  $(".calculator-step.two").show();
  $(".calculator-footer.two").css({"display": "flex"});
}

function hideStepTwo() {
  $(".calculator-header-title.two").hide();
  $(".calculator-step.two").hide();
  $(".calculator-footer.two").hide();
}

function showStepThree() {
  refreshNavigationsStepThree();
  $(".calculator-header-title.three").show();
  $(".calculator-step.three").show();
  $(".calculator-footer.three").css({"display": "flex"});
}

function hideStepThree() {
  $(".calculator-header-title.three").hide();
  $(".calculator-step.three").hide();
  $(".calculator-footer.three").hide();
}

function showStepFour() {
  $(".calculator-header-title.four").show();
  $(".calculator-step.four").show();
  $(".calculator-footer.four").css({"display": "flex"});
}

function hideStepFour() {
  $(".calculator-header-title.four").hide();
  $(".calculator-step.four").hide();
  $(".calculator-footer.four").hide();
}

function showStepFive() {
  calculateParams();
  getProducts(getCategory());
  $(".calculator-header-title.five").show();
  $(".calculator-step.five").show();
  $(".calculator-footer.five").css({"display": "flex"});
}

function hideStepFive() {
  $(".calculator-header-title.five").hide();
  $(".calculator-step.five").hide();
  $(".calculator-footer.five").hide();
}

function getMeasures() {
  var weight = colchoa_params.person_one_weight;
  var height = colchoa_params.person_one_height;

  if (colchoa_params.selected_person_length === 2) {
    if (colchoa_params.person_two_weight > weight) {
      weight = colchoa_params.person_two_weight;
    };
    if (colchoa_params.person_two_height > height) {
      height = colchoa_params.person_two_height;
    };
  };

  // return height + "m" + " - " + weight + "kg";
  return weight + "kg";
}

function getTamanho() {
  var label = "";
  var material = colchoa_params.selected_size;
  if (material === "solteiro") label = "Solteiro";
  if (material === "solteirao") label = "Solteirão";
  if (material === "viuva") label = "Viúva";
  if (material === "casal") label = "Casal";
  if (material === "queen") label = "Queen";
  if (material === "king") label = "King";
  return label;
}

function calculateParams() {
  $(".param-size").text(getTamanho());
  $(".param-person-length").text(colchoa_params.selected_person_length);
  $(".param-measures").text(getMeasures())
  $(".param-material").text(colchoa_params.selected_material);
}


$("body").on("click", ".calculator-overlay, .calculator-header-close", function() {
  $(".calculator").fadeOut();
  $("body").css("overflow-y", "auto");
  resetSelectedSize();
  hideStepOne();
  hideStepTwo();
  hideStepThree();
  hideStepFour();
  hideStepFive();
});

$("body").on("click", ".calculator-pillow", function() {
  $(".calculator-pillow").removeClass("active");
  colchoa_params.selected_size = $(this).attr("data-value");
  var size = colchoa_params.selected_size;
  if (size === "solteiro" || size === "solteirao" || size === "viuva") {
    $(".calculator-person.two").hide()
  } else {
    $(".calculator-person.two").show()
  }
  $(this).addClass("active");
  refreshNavigationsStepOne();
});

$("body").on("click", ".calculator-person", function() {
  $(".calculator-person").removeClass("active");
  colchoa_params.selected_person_length = Number($(this).attr("data-value"));
  $(this).addClass("active");
  refreshNavigationsStepTwo();
});

$("body").on("click", ".calculator-material", function() {
  $(".calculator-material").removeClass("active");
  colchoa_params.selected_material = $(this).attr("data-value");
  $(this).addClass("active");
  refreshNavigationsStepFour();
});


$("body").on("click", ".next-1", function() {
  hideStepOne();
  showStepTwo();
});

$("body").on("click", ".back-2", function() {
  hideStepTwo();
  showStepOne();
});

$("body").on("click", ".next-2", function() {
  hideStepTwo();
  showStepThree();
  if (colchoa_params.selected_person_length === 1) {
    $(".two-person").hide();
  } else {
    $(".two-person").show();
  }
});

$("body").on("click", ".back-3", function() {
  hideStepThree();
  showStepTwo();
});

$("body").on("click", ".next-3", function() {
  hideStepThree();
  showStepFour();
});

$("body").on("click", ".back-4", function() {
  hideStepFour();
  showStepThree();
});

$("body").on("click", ".next-4", function() {
  hideStepFour();
  showStepFive();
});

$("body").on("click", ".back-5", function() {
  hideStepFive();
  showStepFour();
});

$("body").on("keyup", "#person-1-weight", function() {
  document.getElementById("person-1-weight").value = onChangeWeight($(this).val());
  colchoa_params.person_one_weight = Number(onChangeWeight($(this).val()));
  refreshNavigationsStepThree();
});

$("body").on("keyup", "#person-2-weight", function() {
  document.getElementById("person-2-weight").value = onChangeWeight($(this).val());
  colchoa_params.person_two_weight = Number(onChangeWeight($(this).val()));
  refreshNavigationsStepThree();
});

$("body").on("keyup", "#person-1-height", function() {
  document.getElementById("person-1-height").value = onChangeHeight($(this).val());
  colchoa_params.person_one_height = Number(onChangeHeight($(this).val()));
  refreshNavigationsStepThree();
});

$("body").on("keyup", "#person-2-height", function() {
  document.getElementById("person-2-height").value = onChangeHeight($(this).val());
  colchoa_params.person_two_height = Number(onChangeHeight($(this).val()));
  refreshNavigationsStepThree();
});

$("body").on("click", ".faq-content-item-title", function() {
  $($(this).parent()).toggleClass("expanded");
});

$("body").on("click", ".header-menu-btn", function() {
  $(".mobile-menu").fadeToggle();
  $(".header-menu-btn").toggleClass("active");
});

function onChangeWeight(val) {
  return val.replace(/[^0-9]/g, '');
}

function onChangeHeight(val) {
  val = String(val).replace(".", "");
  if (val.length === 3) {
    val = val.split('');
    val.splice(1, 0, ".");
    val = val.join('');
  };
  return val;
}

function getProducts(category) {
  $(".preloader-view").css("display", "flex");
  $.ajax({
   
    method: "GET",
    success: function(result) {
      var htmlStr = "";
      for (let i = 0; i < result.length; i++) {
        var cover = "https://" + result[i].cover.split(", //")[2].split(" 480w")[0];
        htmlStr += '<li class="calculator-product">' +
          '<a href="' + result[i].link + '" target="_blank">' +
            '<div class="calculator-product-icon" style="background-image:url('+ cover + ')"/></div>' +
            '<span class="calculator-product-title">' + result[i].title + '</span>' +
            '<span class="calculator-product-price">' + result[i].price + '</span>' +
            '<span class="calculator-product-installments">' + result[i].installments + '</span>' +
          '</a>' +
        '</li>';
      }
      if (result.length > 0) {
        $('.calculator-products').html(htmlStr);
      } else {
        $('.calculator-products').html('<li class="calculator-product-message">' +
          '<span class="calculator-product-message-icon"></span>' +
          '<span class="calculator-product-message-text">Em breve teremos produtos disponíveis nesta área do site.</span>' +
        '</li>');
      }
      
      $(".preloader-view").css("display", "none");
    }
  });
}

function getD20() {
  var tamanho = colchoa_params.selected_size;

  if (tamanho === "solteiro") return "d20";
  if (tamanho === "solteirao") return "d201";
  if (tamanho === "viuva") return "d202";
  if (tamanho === "casal") return "d203";
  // if (tamanho === "queen") return "d204";
  // if (tamanho === "king") return "d205";
  // TEMPORÁRIO
  if (tamanho === "queen") return "d334";
  if (tamanho === "king") return "d335";
}

function getD23() {
  var tamanho = colchoa_params.selected_size;

  if (tamanho === "solteiro") return "d23";
  if (tamanho === "solteirao") return "d231";
  if (tamanho === "viuva") return "d232";
  if (tamanho === "casal") return "d233";
  // if (tamanho === "queen") return "d234";
  // if (tamanho === "king") return "d235";
  // TEMPORÁRIO
  if (tamanho === "queen") return "d334";
  if (tamanho === "king") return "d335";
}

function getD26() {
  var tamanho = colchoa_params.selected_size;

  if (tamanho === "solteiro") return "d26";
  if (tamanho === "solteirao") return "d261";
  if (tamanho === "viuva") return "d262";
  if (tamanho === "casal") return "d263";
  // if (tamanho === "queen") return "d264";
  // if (tamanho === "king") return "d265";
  // TEMPORÁRIO
  if (tamanho === "queen") return "d334";
  if (tamanho === "king") return "d335";
}

function getD28() {
  var tamanho = colchoa_params.selected_size;

  if (tamanho === "solteiro") return "d28";
  if (tamanho === "solteirao") return "d281";
  if (tamanho === "viuva") return "d282";
  if (tamanho === "casal") return "d283";
  // if (tamanho === "queen") return "d284";
  // if (tamanho === "king") return "d285";
  // TEMPORÁRIO
  if (tamanho === "queen") return "d334";
  if (tamanho === "king") return "d335";
}

function getD33() {
  var tamanho = colchoa_params.selected_size;

  if (tamanho === "solteiro") return "d33";
  if (tamanho === "solteirao") return "d331";
  if (tamanho === "viuva") return "d332";
  if (tamanho === "casal") return "d333";
  if (tamanho === "queen") return "d334";
  if (tamanho === "king") return "d335";
}

function getD40() {
  var tamanho = colchoa_params.selected_size;

  if (tamanho === "solteiro") return "d40";
  if (tamanho === "solteirao") return "d401";
  if (tamanho === "viuva") return "d402";
  if (tamanho === "casal") return "d403";
  if (tamanho === "queen") return "d404";
  if (tamanho === "king") return "d405";
}

function getD45() {
  var tamanho = colchoa_params.selected_size;

  if (tamanho === "solteiro") return "d45";
  if (tamanho === "solteirao") return "d451";
  if (tamanho === "viuva") return "d452";
  if (tamanho === "casal") return "d453";
  if (tamanho === "queen") return "d454";
  if (tamanho === "king") return "d455";
}

function getDensity() {
  var weight, height;
  var density = "";
  var firstWeight = colchoa_params.person_one_weight;
  var secondWeight = colchoa_params.person_two_weight;
  var firstHeight = colchoa_params.person_one_height;
  var secondHeight = colchoa_params.person_two_height;

  if (colchoa_params.selected_person_length === 1) {
    weight = firstWeight;
    height = firstHeight;
  } else {
    weight = firstWeight > secondWeight ? firstWeight : secondWeight;
    height = firstHeight > secondHeight ? firstHeight : secondHeight;
  }

  if (weight <= 50) {
    if (height <= 1.50) {
      density = getD23();
    } else if (height >= 1.51 && height <= 1.60) {
      density = getD23();
    } else if (height >= 1.61 && height <= 1.70) {
      density = getD23();
    } else if (height >= 1.71 && height <= 1.80) {
      density = getD20();
    } else if (height >= 1.81 && height <= 1.90) {
      density = getD20();
    } else if (height > 1.90) {
      density = getD20();
    } else {
      density = getD20();
    }
  } else if (weight >= 51 && weight <= 60) {
    if (height <= 1.50) {
      density = getD26();
    } else if (height >= 1.51 && height <= 1.60) {
      density = getD26();
    } else if (height >= 1.61 && height <= 1.70) {
      density = getD26();
    } else if (height >= 1.71 && height <= 1.80) {
      density = getD23();
    } else if (height >= 1.81 && height <= 1.90) {
      density = getD23();
    } else if (height > 1.90) {
      density = getD23();
    } else {
      density = getD23();
    }
  } else if (weight >= 61 && weight <= 70) {
    if (height <= 1.50) {
      density = getD28();
    } else if (height >= 1.51 && height <= 1.60) {
      density = getD28();
    } else if (height >= 1.61 && height <= 1.70) {
      density = getD28();
    } else if (height >= 1.71 && height <= 1.80) {
      density = getD28();
    } else if (height >= 1.81 && height <= 1.90) {
      density = getD26();
    } else if (height > 1.90) {
      density = getD26();
    } else {
      density = getD26();
    }
  } else if (weight >= 71 && weight <= 80) {
    if (height <= 1.50) {
      density = getD33();
    } else if (height >= 1.51 && height <= 1.60) {
      density = getD33();
    } else if (height >= 1.61 && height <= 1.70) {
      density = getD33();
    } else if (height >= 1.71 && height <= 1.80) {
      density = getD33();
    } else if (height >= 1.81 && height <= 1.90) {
      density = getD28();
    } else if (height > 1.90) {
      density = getD28();
    } else {
      density = getD28();
    }
  } else if (weight >= 81 && weight <= 90) {
    if (height <= 1.50) {
      density = getD33();
    } else if (height >= 1.51 && height <= 1.60) {
      density = getD33();
    } else if (height >= 1.61 && height <= 1.70) {
      density = getD33();
    } else if (height >= 1.71 && height <= 1.80) {
      density = getD33();
    } else if (height >= 1.81 && height <= 1.90) {
      density = getD33();
    } else if (height > 1.90) {
      density = getD28();
    } else {
      density = getD28();
    }
  } else if (weight >= 91 && weight <= 100) {
    if (height <= 1.50) {
      density = getD40();
    } else if (height >= 1.51 && height <= 1.60) {
      density = getD40();
    } else if (height >= 1.61 && height <= 1.70) {
      density = getD40();
    } else if (height >= 1.71 && height <= 1.80) {
      density = getD40();
    } else if (height >= 1.81 && height <= 1.90) {
      density = getD33();
    } else if (height > 1.90) {
      density = getD33();
    } else {
      density = getD33();
    }
  } else if (weight >= 101 && weight <= 120) {
    if (height <= 1.50) {
      density = getD45();
    } else if (height >= 1.51 && height <= 1.60) {
      density = getD45();
    } else if (height >= 1.61 && height <= 1.70) {
      density = getD45();
    } else if (height >= 1.71 && height <= 1.80) {
      density = getD40();
    } else if (height >= 1.81 && height <= 1.90) {
      density = getD40();
    } else if (height > 1.90) {
      density = getD40();
    } else {
      density = getD40();
    }
  } else if (weight >= 121 && weight <= 150) {
    if (height <= 1.50) {
      density = getD45();
    } else if (height >= 1.51 && height <= 1.60) {
      density = getD45();
    } else if (height >= 1.61 && height <= 1.70) {
      density = getD45();
    } else if (height >= 1.71 && height <= 1.80) {
      density = getD45();
    } else if (height >= 1.81 && height <= 1.90) {
      density = getD45();
    } else if (height > 1.90) {
      density = getD40();
    } else {
      density = getD40();
    }
  }

  return density;
}

function getMaxWeight() {
  var weight;
  var firstWeight = colchoa_params.person_one_weight;
  var secondWeight = colchoa_params.person_two_weight;

  if (colchoa_params.selected_person_length === 1) {
    weight = firstWeight;
  } else {
    weight = firstWeight > secondWeight ? firstWeight : secondWeight;
  };

  return weight;
}

function getCategory() {
  var size = colchoa_params.selected_size;
  var material = colchoa_params.selected_material;
  var subcategory;

  if (material === "espuma") {
    subcategory = getDensity();
  } else {
    var weight = getMaxWeight();
    if (weight <= 120) {
      subcategory = "molas-ensacadas-120kg";
    } else {
      subcategory = "molas-ensacadas-150kg";
    };
    if (size === "solteiro") subcategory += "-solteiro";
    if (size === "solteirao") subcategory += "-solteirao";
    if (size === "viuva") subcategory += "-viuva";
    if (size === "casal") subcategory += "-casal";
    if (size === "queen") subcategory += "-queen";
    if (size === "king") subcategory += "-king";
  }

  // solteiro
  // solteirao
  // viuva
  // casal
  // queen
  // king
  // colchoa_params.selected_material;
  // espuma
  // molas

  return size + "/" + subcategory;
}

$("body").on("click", ".header-menu-item a", function() {
  var _this = this;

  if (window.innerWidth < 768) {
    $(".mobile-menu").fadeOut();
    $(".header-menu-btn").removeClass("active");
  }

  $("html, body").animate({
    scrollTop: $($(_this).attr("data-target")).offset().top - 80
  });
});


$("body").on("click", ".continue-navigation", function() {
  $("html, body").animate({
    scrollTop: $("#produtos").offset().top - 80
  });
});

$("body").on("click", ".continue-navigationnn", function() {
  $("html, body").animate({
    scrollTop: $("#faq").offset().top - 80
  });
});

$("body").on("click", ".open-malha", function() {
  $("body").css("overflow", "hidden");
  $(".product-box.malha").fadeIn();
});

$("body").on("click", ".open-molas", function() {
  $("body").css("overflow", "hidden");
  $(".product-box.molas").fadeIn();
});

$("body").on("click", ".product-header-back", function() {
  $("body").css("overflow", "auto");
  $(".product-box.malha").fadeOut();
  $(".product-box.molas").fadeOut();
});

