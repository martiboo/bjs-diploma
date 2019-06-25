class Profile {
    constructor({ username, name, password }) {
        this.username = username;
        this.firstName = name.firstName;
        this.lastName = name.lastName;
        this.password = password;
    }

    createUser(
        {
            username,
            name: { firstName, lastName },
            password,
        },
        callback
    ) {
        return ApiConnector.createUser({
            username,
            name: { firstName, lastName },
            password,
        }, (err, data) => {
            console.log(`The user ${username} was successfully created: first name ${firstName} , last name ${lastName} , password ${password}`);
            callback(err, data);
        });

    }

    performLogin({ username, password }, callback) {
        return ApiConnector.performLogin({ username, password }, (err, data) => {
            console.log(`Authorizing the user: login ${username}, password ${password}`);
            callback(err, data);
        });

    }

    addMoney({ currency, amount }, callback) {
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
            console.log(`Adding ${amount} of ${currency} to ${this.username}`);
            callback(err, data);
        });

    }

    convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback) {
        return ApiConnector.convertMoney({ fromCurrency, targetCurrency, targetAmount }, (err, data) => {
            console.log(`Convert ${fromCurrency} to ${targetCurrency} , total amount of transfer is ${targetAmount}`);
            callback(err, data);
        });

    }

    transferMoney({ to, amount }, callback) {
        return ApiConnector.transferMoney({ to, amount }, (err, data) => {
            console.log(`Transferring ${amount} to ${to}`);
            callback(err, data);
        });

    }

}

function getCurrencyExchange(callback) {
    return ApiConnector.getStocks((err, data) => {
        let arrayElement = data.pop();
        console.log(arrayElement);
        callback(err, data);
    });

}

function main() {
    const Ivan = new Profile({
        username: 'ivan',
        name: { firstName: 'Ivan', lastName: 'Chernyshev' },
        password: 'ivanspass',
    });
    const Anna = new Profile({
        username: 'anna',
        name: { firstName: 'Anna', lastName: 'Petrova' },
        password: 'petrova1',
    });

    Ivan.createUser({ username: 'ivan', name: { firstName: 'Ivan', lastName: 'Chernyshev' }, password: 'ivanspass', }, (err, data) => {
        console.log(err);
        if (err) {
            console.log('Error during creating user ivan');
        } else {
            Ivan.performLogin({ username: 'ivan', password: 'ivanspass' }, (err, data) => {
                if (err) {
                    console.log('Error during authorizing user ivan');
                } else {
                    Ivan.addMoney({ currency: 'RUB', amount: 100 }, (err, data) => {
                        if (err) {
                            console.log('Error during adding money to Ivan');
                        } else {
                            convertMoney({ fromCurrency: 'RUB', targetCurrency: 'NETCOIN', targetAmount: '100' }, (err, data) => {
                                if (err) {
                                    console.log('Error during converting money');
                                } else {
                                    Anna.createUser({ username: 'anna', name: { firstName: 'Anna', lastName: 'Petrova' }, password: 'petrova1', }, (err, data) => {
                                        if (err) {
                                            console.log('Error during creating user anna');
                                        } else {
                                            transferMoney({ to: anna, amount: 50 }, (err, data) => {
                                                if (err) {
                                                    console.log('Error during transferring money');
                                                } else {
                                                    console.log(`Transferring 50 to anna`);
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

main();
