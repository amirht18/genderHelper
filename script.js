// clear button
document.getElementById('clear').onclick = function (event) {
    const name = document.getElementById('name').value;
    const names = getLocal();
    if (name !== '' && names.hasOwnProperty(name)) {
        delete names[name];
        setLocal(names);
        document.getElementById('saved_gender').innerHTML = 'nothing saved';
    }
}
//set names to local storage
function setLocal(names){
	localStorage.setItem('names', JSON.stringify(names));
}
//get the names from local storage
function getLocal() {
	return localStorage.getItem('names') ? JSON.parse(localStorage.getItem('names')) : {};
}

//submit button sending data to genderize
document.getElementById('submit_button').onclick = function (event) {
	const name = document.getElementById('name').value;
	event.preventDefault();
	fetch('https://api.genderize.io/' + `?name=${name}`)
    .then(response => response.json())
    .then(function(response){
        document.getElementById('gender_predict').innerHTML = response.gender;
        document.getElementById('probability').innerHTML = response.probability;
        if(response.gender == 'male'){
        	document.getElementById('male_check').checked = true; 
    	} 
    	else if (response.gender == 'female'){
         	document.getElementById('female_check').checked = true;
    	}
    })
}
//save button gender to local storage 
document.getElementById('save_button').onclick = function (event){
	const name = document.getElementById('name').value;
    if (name !== '') {
        const names = getLocal();
        if (document.getElementById('male_check').checked) {
            names[name] = 'male';
            document.getElementById('saved_gender').innerHTML = 'male';
        } else if (document.getElementById('female_check').checked) {
            names[name] = 'female';
            document.getElementById('saved_gender').innerHTML = 'female';
        }
        setLocal(names);
    }
}
