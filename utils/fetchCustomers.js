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
					phone
        }
      }
    }
  }
}`;
module.exports = () => {
	let customersArray = [];
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
			let customers = data.data.business.customers;
			const keys = Object.values(customers);
			const allCustomers = keys[0];
			allCustomers.forEach(customer => {
				const name = customer.node.name;
				const email = customer.node.email;
				const phone = customer.node.phone;
				const person = {};
				person.name = name;
				person.contact = {};
				if (email) person.contact.email = email;
				if (phone) person.contact.phone = phone;
				person.address = {};
				customersArray.push(person);
			});
			console.log(customersArray);
		})
		.then(() => {
			fs.writeFile(
				`${rootPath}/customers.json`,
				JSON.stringify(customersArray),
				err => {
					if (err) console.log(err);
				},
			);
		});
};
