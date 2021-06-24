import { storageService } from '../../../services/async-storage-service.js';

const USER_KEY = 'User';

export const UserService = {
    query,
}

function query() {
    return storageService.query(USER_KEY)
        .then(users => {
            if (!users.length) {
                var userToSave = users = {
                    name: 'Dekel',
                    lName: 'Livyani',
                    age: 24,
                    email: 'Dekelliv0@gmail.com',
                };
                return storageService.post(USER_KEY, userToSave)
            } else return users;
        })
}