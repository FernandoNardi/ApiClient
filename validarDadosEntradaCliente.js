/*module.exports = function(cpf, nome, email, estadocivil, telefones, logradouro, numero, bairro, cidade, estado) {
	if(cpf.length == 0 || 
	   nome.length == 0 || 
	   email.length == 0 ||
	   estadocivil.length == 0 ||

	   logradouro.length == 0 ||
	   numero.length == 0 || 
	   bairro.length == 0 || 
	   cidade.length == 0 || 
	   estado.length == 0) {
			return false;
	}
	else{
		return true;		
	}
}*/


module.exports = function(cpf, nome, email, estadocivil, telefones, logradouro, numero, bairro, cidade, estado) {
	if(
		(cpf == null || cpf.length == 0) || 
	   (nome == null || nome.length == 0) || 
	   (email == null || email.length == 0) ||
	   (estadocivil == null || estadocivil.length == 0) ||
	   (telefones == null || telefones.length == 0) ||
	   (logradouro == null || logradouro.length == 0) ||
	   (numero == null || numero.length == 0 )|| 
	   (bairro == null || bairro.length == 0) || 
	   (cidade == null || cidade.length == 0) || 
	   (estado == null || estado.length == 0)) {
		return false;
	}
	else{
		return true;		
	}
}