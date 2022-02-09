const continentsSelect = document.getElementById('continent-select');
const countriesList = document.getElementById('countries-list');
function getData(query) {
	return fetch('https://countries.trevorblades.com/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query,
		}),
	}).then((res) => res.json());
}

continentsSelect.addEventListener('change', (e) => {
	console.log(e.target.value);
	getData(`
  query {
    continent(code:"${e.target.value}"){
      countries{
        name
        capital
        currency
      }
    }
  }
  `)
		.then(({ data }) => {
			console.log(data.continent);
			const ul = document.createElement('ul');
			countriesList.innerHTML = '';
			data.continent.countries.forEach((country) => {
				const li = document.createElement('li');
				li.innerText = `${country.name} | ${country.capital || '-'} | ${
					country.currency || '-'
				}`;
				li.addEventListener('click', function (e) {
					alert(e.target.textContent.split('|')[0]);
				});
				ul.append(li);
			});
			countriesList.append(ul);
		})
		.catch((err) => console.log(err));
});

getData(`
query {
  continents {
    name
    code
  }
}
`)
	.then(({ data }) => {
		data.continents.forEach((continent) => {
			const option = document.createElement('option');
			option.value = continent.code;
			option.innerText = continent.name;
			continentsSelect.append(option);
		});
	})
	.catch((err) => console.log(err));
