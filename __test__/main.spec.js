const functionMap = require('../main');
const isBarcodeValid = functionMap.isBarcodeValid;
const isBarcodeExisting = functionMap.isBarcodeExisting;
const getUniqueBarcodes = functionMap.getUniqueBarcodes;
const formatReceipt = functionMap.formatReceipt;
const printReceipt = functionMap.printReceipt;


it ('should output true when barcode is valid', () => {
	const barcode = '0001';

    expect(isBarcodeValid(barcode)).toBe(true);
});

it ('should output false when barcode is NOT valid', () => {
	const barcode = '999999999';

    expect(isBarcodeValid(barcode)).toBe(false);
});



it ('should output true when barcode is existing', () => {
	const barcode = '0001';

    expect(isBarcodeExisting(barcode)).toBe(true);
});

it ('should output false when barcode is NOT exising', () => {
	const barcode = '9999';

    expect(isBarcodeExisting(barcode)).toBe(false);
});



it ('should output unique barcode array given input', () => {
	const barcodeArray = ['0001', '0003', '0005', '0003', '0001', '0001', '0001'];
	const uniqueBarcodeArray = ['0001', '0003', '0005'];

    expect(getUniqueBarcodes(barcodeArray)).toStrictEqual(uniqueBarcodeArray);
});


it ('should output formatted receipt given uniqueBarcodeArray', () => {
	const inputBarcodeArray = ['0001', '0003', '0005', '0003'];
	const uniqueBarcodeArray = ['0001', '0003', '0005'];
	const expectedOutput = 'Receipts\n' +
		'------------------------------------------------------------\n' +
		'Coca Cola                       3          1\n' +
		'Pepsi-Cola                      5          2\n' +
		'Dr Pepper                       7          1\n' +
		'------------------------------------------------------------\n' +
		'Price: 20';

    expect(formatReceipt(uniqueBarcodeArray, inputBarcodeArray)).toBe(expectedOutput);
});



it ('should output error given invalid inputBarcodeArray', () => {
	const inputBarcodeArray = ['0001', '000312', '0005', '0003'];
	const expectedOutput = '[ERROR]: Barcode is invalid!\n';

    expect(printReceipt(inputBarcodeArray)).toBe(expectedOutput);
});


it ('should output error given invalid inputBarcodeArray', () => {
	const inputBarcodeArray = ['0001', '9999', '0005', '0003'];
	const expectedOutput = '[ERROR]: Barcode is not existing!\n';

    expect(printReceipt(inputBarcodeArray)).toBe(expectedOutput);
});


it ('should output whole receipt and have checking', () => {
	const inputBarcodeArray = ['0001', '0003', '0005', '0003'];
	const expectedOutput = 'Receipts\n' +
		'------------------------------------------------------------\n' +
		'Coca Cola                       3          1\n' +
		'Pepsi-Cola                      5          2\n' +
		'Dr Pepper                       7          1\n' +
		'------------------------------------------------------------\n' +
		'Price: 20';

    expect(printReceipt(inputBarcodeArray)).toBe(expectedOutput);
});