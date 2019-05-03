const fetch = require('node-fetch');
const query = `query {
  business(id: "QnVzaW5lc3M6NDgxZDExM2QtMzUxOC00YzBiLWFiOTItZWM1MTMyNDBiMTFh") {
    id
    name
    customers(page: 1, pageSize: 50) {
      edges {
        node {
          id
          name
          email
        }
      }
    }
  }
}`;
const query2 = `query {
  user {
    id
    defaultEmail
  }
}`;
module.exports = () => {
	let customers = [];
	fetch('https://gql.waveapps.com/graphql/public', {
		method: 'POST',
		headers: {
			Authorization: 'Bearer 44JWI9Z5Jk9ZBDpjnu1w13bXYiYM9j',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ query }),
	})
		.then(res => res.json())
		.then(data => {
			customers.push(data.data.business.customers.edges);
		});
	return customers;
};
