function getMessage(a, b) {
  if (typeof a === 'boolean') {
    if (a) {
      return "Переданное GIF-изображение анимировано и содержит " + b + " кадров";
    } else {
      return "Переданное GIF-изображение не анимировано";
    }
  }
  if (typeof a === 'number') {
    if (a) {
      return "Переданное SVG-изображение содержит " + a + " объектов и " + b * 4 + " аттрибутов"
    }
  }




  if (Array.isArray(a) && Array.isArray(b)) {
    var square = 0;
    for (var i = 0; i < b.length; i++) {
      var d = a[i]*b[i];
      square += d;
    }
    if(a,b) {
      return "Общая площадь артефактов сжатия: " + square +  " пикселей";
    }

  }



  if (Array.isArray(a)) {

      var sum = 0;
      for (var i = 0; i < a.length; i++) {
        sum += a[i];
      }

    if (a) {
      return "Количество красных точек во всех строчках изображения: " + sum + "";

    }
  }


}
