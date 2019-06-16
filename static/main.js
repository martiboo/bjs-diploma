class Profile {
    constructor({username, name, password}) {
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
            console.log(`Enter your login ${username} , enter your first name ${firstName} , enter your last name ${lastName} , enter your password ${password}`);
            callback(err, data);
        });

    }

    performLogin({ username, password }, callback) {
        return ApiConnector.performLogin({ username, password }, (err, data) => {
            console.log(`Enter your login ${username}, enter your password ${password}`);
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
        let arr = [];
        arr.push( {EUR_NETCOIN, NETCOIN_EUR, NETCOIN_RUB, NETCOIN_USD, RUB_NETCOIN, USD_NETCOIN} );
        return arr;
    });

}



function main(){
    const Ivan = new Profile({
                    username: 'ivan',
                    name: { firstName: 'Ivan', lastName: 'Chernyshev' },
                    password: 'ivanspass',
                });
    // сначала создаем и авторизуем пользователя

    // после того, как мы авторизовали пользователя, добавляем ему денег в кошелек
    Ivan.addMoney({ currency: 'RUB', amount: 100 }, (err, data) => {
        if (err) {
                console.error('Error during adding money to Ivan');
        } else {
                console.log(`Added 500000 euros to Ivan`);
        }});
}

main();