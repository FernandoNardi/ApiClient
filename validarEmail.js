module.exports = function(email) {
 	var er = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2}/; 
	if(!er.exec(email) )
	{		
		return false;
	}
	else{
		return true;
	}	
}