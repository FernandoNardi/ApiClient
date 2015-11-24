module.exports = function(cpf) {
	var v = cpf;
	if(cpf.length == 11){
		var v1 = (2 * v[8]) + (3 * v[7]) + (4 * v[6]) + (5 * v[5]) + (6 * v[4]) + (7 * v[3]) + (8 * v[2]) + (9 * v[1]) + (10 * v[0]);
		var resto1 = v1 % 11;
		if(resto1 < 2){
			v1 = 0;
		}
		else{
			v1 = Math.abs(11 - resto1);
		}
		var v2 = (2 * v1) + (3 * v[8]) + (4 * v[7]) + (5 * v[6]) + (6 * v[5]) + (7 * v[4]) + (8 * v[3]) + (9 * v[2]) + (10 * v[1]) + (11 * v[0]);
		var resto2 = v2 % 11;
		if(resto2 < 2){
			v2 = 0;
		}
		else{
			v2 = Math.abs(11 - resto2);	
		}
		return (v1 == v[9] && v2 == v[10]);
	}
	else{
		return false;
	}
}