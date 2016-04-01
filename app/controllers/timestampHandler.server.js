
function validateUnixTimeStamp(str){
	var num = parseInt(str);
	//console.log({num: num});
	if (Number.isNaN(num)) { return false; }
	if (num < 0) { return false; }
	return true;
}

var months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December' ]

function isMonth(str){
	return months.map(function(month, i){ return str===month; })
		.reduce(function(p,c){ return p||c; });
}

function validateDate(str){
	var dateArray = str.split(' ');
	//console.log(dateArray);
	//check if date has three strings
	//console.log('checking if three strings...');
	if (dateArray.length!=3){ return false; }

	//check if first string is an actual month
	//console.log('checking if first string is month...');
	if (!isMonth(dateArray[0])){ return false; }

	//check if second string has a number and a comma
	//console.log('checking if second string has comma...');
	if (dateArray[1].split('').reverse().shift()[0] !== ','){ return false; }
	//console.log('checking if second string is number...')
	if (Number.isNaN(parseInt(dateArray[1].split('').reverse().slice(1).join('')))) { return false; } 
	
	// check if third string has four numbers or 
	// within the limits of a unix time stamp
	//console.log('checking if third string has four numbers...');
	if (Number.isNaN(parseInt(dateArray[2])) ){ return false; }
	if (dateArray[2].split('').length !== 4) { return false; }

	//console.log('checking if third string is a valid year...');
	if (parseInt(dateArray[2]) < 1970 ){ return false; }

	return true;
}

function timestampHandler(input){
	//check if input is a unix timestamp
	if (validateUnixTimeStamp(input)){
		var date = new Date(parseInt(input)*1000);
		//console.log(date);
		return {
			unix: input, 
			natural: months[date.getUTCMonth()]+' '+
				date.getUTCDate()+', '+date.getUTCFullYear() 
		};
	}
	//check if input is a natural language date 
	if (validateDate(input)) {
		var dateArray = input.split(' ');
		var date = {
			year: parseInt(dateArray[2]),
			month: months.indexOf(dateArray[0]),
			day: parseInt(dateArray[1].split('')
				.reverse().slice(1).reverse().join(''))
		};
		//console.log(date);
		//console.log(Date.UTC(date.year,date.month,date.day));
		return {
			unix: Date.UTC(date.year, date.month, date.day)/1000,
			natural: input
		};
	}

	return {unix: null, natural: null};
}

module.exports = timestampHandler;
