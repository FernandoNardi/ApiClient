module.exports = function(cpf, nome, email, estadocivil, telefones, logradouro, numero, bairro, cidade, estado) {
	if(cpf || nome || email || estadocivil || telefones || telefones.length == 0 || logradouro || numero || bairro || cidade || estado) {
		return true;
	}
	else{
		return false;		
	}
}