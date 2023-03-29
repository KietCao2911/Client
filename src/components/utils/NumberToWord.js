function convertNumberToWords(number) {
  const ones = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
  const tens = ['', 'muòi', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi'];
  const teens = ['', 'mươi một', 'mười hai', 'mười ba', 'mười bốn', 'mười lăm', 'mười sáu', 'mười bảy', 'mười tám', 'mười chín'];

  if (number == 0) {
    return 'zero';
  }

  if (number < 0) {
    return 'minus ' + convertNumberToWords(Math.abs(number));
  }

  let words = '';

  if (number >= 1000000000) {
    words += convertNumberToWords(Math.floor(number / 1000000000)) + ' tỷ ';
    number %= 1000000000;
  }

  if (number >= 1000000 && number < 1000000000) {
    words += convertNumberToWords(Math.floor(number / 1000000)) + ' triệu ';
    number %= 1000000;
  }

  if (number >= 1000 && number < 1000000) {
    words += convertNumberToWords(Math.floor(number / 1000)) + ' ngàn ';
    number %= 1000;
  }

  if (number >= 100 && number < 1000) {
    words += ones[Math.floor(number / 100)] + ' trăm ';
    number %= 100;
  }

  if (number >= 20 && number < 100) {
    words += tens[Math.floor(number / 10)] + ' ';
    number %= 10;
  } else if (number >= 11 && number < 20) {
    words += teens[number - 10] + ' ';
    number = 0;
  }

  if (number >= 1 && number < 11) {
    words += ones[number];
  }

  return words.trim() ;
}
export default convertNumberToWords