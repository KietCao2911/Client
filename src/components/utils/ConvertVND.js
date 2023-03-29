import React from 'react'

const convertVND = (string) => {
   let priceNumber = parseFloat(string);
   let formattedPrice = '';
 
   // Kiểm tra số hợp lệ
   if (isNaN(priceNumber)) {
     return '--';
   }
 
   // Chuyển đổi số thành giá trị tiền VND
   formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceNumber);
 
   return formattedPrice;
   
}

export default convertVND