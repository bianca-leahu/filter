import axios from 'axios'

export async function getData () {
 	const apiUrl = window.encodeURI('http://ws-old.parlament.ch/councillors/historic?legislativePeriodFromFilter=50&factionFilter=V&format=json'),
	repos = await axios.get(apiUrl)
	    .catch(err => {
	    	console.log(err);
	    });

  	return repos.data
}