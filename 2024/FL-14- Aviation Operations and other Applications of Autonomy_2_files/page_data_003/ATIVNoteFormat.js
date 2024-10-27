function GetNoteAndHashFromFormat(val){
	var note = val.substr(36, (val.length - 36));
	var hash = val.substr(0, 36);
	noteJSON = {"hash":hash, "note":note};
	return noteJSON;
}


function isNoteFormatCorrect(val){
	if(val.length >= 36 && val.search("ATIV") == 0){
		return true;
	}
	return false;
}
