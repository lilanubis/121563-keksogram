function getMessage (a, b) {
  if (typeof a == 'boolean') {
    if (a) {
      return "Переданное GIF-изображение анимировано и содержит [" + b + "] кадров";
    } else {
      return "Переданное GIF-изображение не анимировано";
    }
  } else if (typeof a == 'number') {
    if (a) {
      return "Переданное SVG-изображение содержит [" + a + "] объектов и [" + b * 4 + "] аттрибутов"
    }
  }


}
