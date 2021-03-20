
function roundNumber(number,decimals) {
  var newString;// The new rounded number
  decimals = Number(decimals);
  if (decimals < 1) {
    newString = (Math.round(number)).toString();
  } else {
    var numString = number.toString();
    if (numString.lastIndexOf(".") == -1) {// If there is no decimal point
      numString += ".";// give it one at the end
    }
    var cutoff = numString.lastIndexOf(".") + decimals;// The point at which to truncate the number
    var d1 = Number(numString.substring(cutoff,cutoff+1));// The value of the last decimal place that we'll end up with
    var d2 = Number(numString.substring(cutoff+1,cutoff+2));// The next decimal, after the last one we want
    if (d2 >= 5) {// Do we need to round up at all? If not, the string will just be truncated
      if (d1 == 9 && cutoff > 0) {// If the last digit is 9, find a new cutoff point
        while (cutoff > 0 && (d1 == 9 || isNaN(d1))) {
          if (d1 != ".") {
            cutoff -= 1;
            d1 = Number(numString.substring(cutoff,cutoff+1));
          } else {
            cutoff -= 1;
          }
        }
      }
      d1 += 1;
    } 
    if (d1 == 10) {
      numString = numString.substring(0, numString.lastIndexOf("."));
      var roundedNum = Number(numString) + 1;
      newString = roundedNum.toString() + '.';
    } else {
      newString = numString.substring(0,cutoff) + d1.toString();
    }
  }
  if (newString.lastIndexOf(".") == -1) {// Do this again, to the new string
    newString += ".";
  }
  var decs = (newString.substring(newString.lastIndexOf(".")+1)).length;
  for(var i=0;i<decimals-decs;i++) newString += "0";
  //var newNumber = Number(newString);// make it a number if you like
  return newString; // Output the result to the form field (change for your purposes)
}

function update_total() {
  var total = 0;
  var total_vax = 0;
  $('.tax').each(function(i){
      tax_sum = $(this).val().replace("$","");
      
      if (!isNaN(tax_sum)) total_vax += Number(tax_sum);

  });  

  $('.line_total').each(function(i){
    price_sum = $(this).html().replace("$","");

    if (!isNaN(price_sum)) total += Number(price_sum);
  });

  total = roundNumber(total,2);
  if(total_vax){
    var total_exclude_tax =  parseFloat(total)-parseFloat(total_vax);
    $('#subtotal').html("$"+total_exclude_tax);
  }else{
    $('#subtotal').html("$"+total);
  }
  $('#subtotal_inc_tax').html("$"+total);
  $('#grand_total').html("$"+total);
  
  
}

function update_price() {
  console.log(1);
  var row = $(this).parents('.item-row');
  var price = row.find('.price').val().replace("$","") * row.find('.qty').val();
  price = roundNumber(price,2);
  var tax = row.find('.tax').val();
  
  if(tax){
    var tax_sum = parseFloat(price)*(tax/100);
    $('#tax_val').val(tax_sum);
    var line_total = parseFloat(price)+tax_sum;
    
  }else{
    var line_total = price;

  }

  isNaN(price) ? row.find('.line_total').html("N/A") : row.find('.line_total').html("$"+line_total);
  
  update_total();
}

function update_grand_total(){
  var current_total = $('#subtotal_inc_tax').text().replace("$","");
  var type = $('.discnt_type').val();
  var discnt_val = $('.discnt').val();
  if(type ==1){
     var net_dicount = (current_total)*(discnt_val/100);
     var grand_total  = parseFloat(current_total) - parseFloat(net_dicount);
     console.log(discnt_val/100);
  }else{
    var grand_total   = parseFloat(current_total) - parseFloat(discnt_val);
  }
  grand_total = roundNumber(grand_total,2);
  $('#grand_total').html("$"+grand_total);

}

function bind() {

  $(".price").blur(update_price);
  $(".qty").blur(update_price);
  $(".tax").blur(update_price);
  $(".discnt").blur(update_grand_total);
  
}

$(document).ready(function() {
  $('#invoice_print').show();

  $('input').click(function(){
    $(this).select();
  });

   
  $("#addrow").click(function(){
    $(".item-row:last").after('<tr class="item-row"><td class="item-name"><div class="delete-wpr"><textarea>Name</textarea><a class="delete" href="javascript:;" title="Remove row">X</a></div></td><td><textarea class="qty">0</textarea></td><td><textarea class="price">$0</textarea></td></td><td><textarea class="tax">0</textarea></td><td><span class="line_total">$0</span></td></tr>');
    if ($(".delete").length > 0) $(".delete").show();
    bind();
  });
  
  bind();
  

 //Delete Row
  $(document).on("click", ".delete", function() {
    $(this).parents('.item-row').remove();
    update_total();
    if ($(".delete").length < 2) $(".delete").hide();
  });
  
  
  //print invoice
  $('#invoice_print').click(function(){
   
     setTimeout(function () {
                window.print();

            }, 500);


  });
 
$('.discnt_type').change(function(){
  $('.discnt').blur(update_grand_total);
   
})  
  
});