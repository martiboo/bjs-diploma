class Profile {
    constructor({ username, name, password }) {
        this.username = username;
        this.firstName = name.firstName;
        this.lastName = name.lastName;
        this.password = password;
    }

    createUser(callback) {
        return ApiConnector.createUser({
            username: this.username,
            name: { firstName: this.firstName, lastName: this.lastName },
            password: this.password,
        }, (err, data) => {
            console.log(`The user ${this.username} was successfully created: first name ${this.firstName} , last name ${this.lastName} , password ${this.password}`);
            callback(err, data);
        });

    }

    performLogin(callback) {
        return ApiConnector.performLogin({ username: this.username, password: this.password }, (err, data) => {
            console.log(`Authorizing the user: login ${this.username}, password ${this.password}`);
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

    Ivan.createUser((err, data) => {
        if (err) {
            console.log('Error during creating user ivan');
        } else {
            Ivan.performLogin((err, data) => {
                if (err) {
                    console.log('Error during authorizing user ivan');
                } else {
                    let moneyAmount = 50000;
                    Ivan.addMoney({ currency: 'RUB', amount: moneyAmount }, (err, data) => {
                        if (err) {
                            console.log('Error during adding money to Ivan');
                        } else {
                            getCurrencyExchange((err, data) => {
                                if (err) {
                                    console.log('Error during currency exchange');
                                } else {
                                    let currencyRate = data.pop();
                                    let targetMoneyAmount = currencyRate.RUB_NETCOIN * moneyAmount;

                                    Ivan.convertMoney({ fromCurrency: 'RUB', targetCurrency: 'NETCOIN', targetAmount: targetMoneyAmount }, (err, data) => {
                                        if (err) {
                                            console.log('Error during converting money');
                                        } else {
                                            Anna.createUser((err, data) => {
                                                if (err) {
                                                    console.log('Error during creating user anna');
                                                } else {
                                                    Ivan.transferMoney({ to: Anna.username, amount: 50 }, (err, data) => {
                                                        if (err) {
                                                            console.log('Error during transferring money');
                                                        } else {
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
    });
}

main();
