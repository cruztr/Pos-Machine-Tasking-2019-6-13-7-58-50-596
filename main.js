const productDatabase = 
	[
	    {"id": "0001", "name" : "Coca Cola", "price": 3},
	    {"id": "0002", "name" : "Diet Coke", "price": 4},
	    {"id": "0003", "name" : "Pepsi-Cola", "price": 5},
	    {"id": "0004", "name" : "Mountain Dew", "price": 6},
	    {"id": "0005", "name" : "Dr Pepper", "price": 7},
	    {"id": "0006", "name" : "Sprite", "price": 8},
	    {"id": "0007", "name" : "Diet Pepsi", "price": 9},
	    {"id": "0008", "name" : "Diet Mountain Dew", "price": 10},
	    {"id": "0009", "name" : "Diet Dr Pepper", "price": 11},
	    {"id": "0010", "name" : "Fanta", "price": 12}
	];
var totalPrice = 0;

function isBarcodeValid(barcode) {
	return barcode.length == 4 ? true : false;
}

function isBarcodeExisting(barcode) {
	const productInDb = productDatabase.filter(product => product.id == barcode);
	return productInDb.length ==0 ? false : true;
}

function getUniqueBarcodes(inputBarcodeArray) {
	var uniqueBarcodeArray = new Set();

	for(let barcode of inputBarcodeArray)
		uniqueBarcodeArray.add(barcode);

	return Array.from(uniqueBarcodeArray);
}

function formatReceipt(uniqueBarcodeArray, inputBarcodeArray) {
	var receiptString = 'Receipts\n' +
		'------------------------------------------------------------\n';

	uniqueBarcodeArray.forEach(uniqueBarcode => receiptString += generateReceiptForSingleProduct(uniqueBarcode, inputBarcodeArray));


	receiptString += '------------------------------------------------------------\n' +
		'Price: '+totalPrice;

	return receiptString;
}

function generateReceiptForSingleProduct(uniqueBarcode, inputBarcodeArray) {
	var receiptLineString = '';
	const productObjectArray = productDatabase.filter(productObject => productObject.id == uniqueBarcode);
	var productName = productObjectArray[0].name;
	var productPrice = productObjectArray[0].price;
	var productQuantity = inputBarcodeArray.filter(productId => productId == uniqueBarcode).length;

	receiptLineString += productName+generateSpacesBetweenNameAndPrice(productName.length)+productPrice+'          '+productQuantity+'\n';

	totalPrice += productQuantity * productPrice;

	return receiptLineString;
}

function generateSpacesBetweenNameAndPrice(nameLength){
	const pricePosition = 31;
	let spaceString = '';

	for(let i=0; i<=pricePosition-nameLength; i++)
		spaceString += ' ';

	return spaceString;
}


function printReceipt(inputBarcodeArray) {
	totalPrice = 0;
	for(let i=0; i<inputBarcodeArray.length; i++) {
		if(!isBarcodeValid(inputBarcodeArray[i])){
			return '[ERROR]: Barcode is invalid!\n';
		} else{
			if(!isBarcodeExisting(inputBarcodeArray[i]))
				return '[ERROR]: Barcode is not existing!\n';
		}
	}

	const uniqueBarcodeArray = getUniqueBarcodes(inputBarcodeArray);
	return formatReceipt(uniqueBarcodeArray, inputBarcodeArray);
}

module.exports = {
	isBarcodeValid : isBarcodeValid,
	isBarcodeExisting : isBarcodeExisting,
	getUniqueBarcodes : getUniqueBarcodes,
	formatReceipt : formatReceipt,
	printReceipt : printReceipt
}