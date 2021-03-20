<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
	<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
	
	<title>Editable Invoice</title>
	
	<link rel='stylesheet' type='text/css' href='css/style.css' />
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
	<script src='https://code.jquery.com/jquery-2.2.4.min.js'></script>
	<script type='text/javascript' src='js/invoice.js'></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

</head>

<body>

	<div id="page-wrap">
		<textarea id="header">INVOICE</textarea>
		<table id="items">
		
		  <tr>
		      <th>Name</th>
		      <th>Quantity</th>
		      <th>Unit Price($)</th>
		      <th>Tax(0%/1%/5%/10%)</th>
		      <th>Total Price</th>
		      
		  </tr>
		  
		  <tr class="item-row">
		      <td class="item-name"><div class="delete-wpr"><textarea>product1</textarea><a class="delete" href="javascript:;" title="Remove row">X</a></div></td>
		      <td><textarea class="qty">10</textarea></td>
		      <td><textarea class="price">$10</textarea></td>
		      <td><textarea class="tax">5</textarea><input type="hidden" id="tax_val"></td>
		      <td><span class="line_total">$105</span></td>
		     
		  </tr>
		  <tr id="hiderow">
		    <td colspan="5"><a id="addrow" href="javascript:;" title="Add a row">Add a row</a></td>
		  </tr>
		  
		  <tr>
		      <td colspan="2" class="blank"> </td>
		      <td colspan="2" class="total-line">Subtotal with out tax</td>
		      <td class="total-value"><div id="subtotal">$100</div></td>
		  </tr>
		   <tr>
		      <td colspan="2" class="blank"> </td>
		      <td colspan="1" class="total-line">Discount</td>
		      <td><select class="discnt_type">
		      		<option value="">Select type</option>
		      		<option value="1">Percentage</option>
		      		<option value="2">Amount</option>
		      	</select>
		      		
		      		
		      </td>
		      <td colspan="1"><textarea class="discnt"></textarea></td>
		  </tr>
		  <tr>

		      <td colspan="2" class="blank"> </td>
		      <td colspan="2" class="total-line">Subtotal with tax</td>
		      <td class="total-value"><div id="subtotal_inc_tax">$105</div></td>
		  </tr>
		   <tr>

		      <td colspan="2" class="blank"> </td>
		      <td colspan="2" class="total-line">Grand Total</td>
		      <td class="total-value"><div id="grand_total">$105</div></td>
		  </tr>
		</table>
		<button type="button" id="invoice_print" class="btn btn-primary">Generate invoice</button>
	
	</div>
	
</body>

</html>