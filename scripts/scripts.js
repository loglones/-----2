class User {
    constructor(data) {
        this.lastName = data.lastName;
        this.firstName = data.firstName;
        this.middleName = data.middleName;
        this.gender = data.gender;
        this.national = data.national;
        this.height = data.height;
        this.weight = data.weight;
        this.dateBirthday = data.dateBirthday;
        this.phone = data.phone;
        this.address = data.address;
        this.cardNumber = data.cardNumber;
        this.bankNumber = data.bankNumber;
    }

}
class UserManager {
    constructor() {
        this.users = [];
    }
    addUser(userData) {
        const user = new User(userData);
        this.users.push(user);
        return user;
    }
    getAllUsers() {
        return [... this.users];

    }
    searchUsers(field, value) {
        return this.users.filter(user => String(user[field]).includes(value));

    }
    sortUserByHeight(order = 'asc') {
        const sorted = [...this.users];
        sorted.sort((a,b) => {
            if (order === 'asc') {
                return a.height - b.height;
            } else {
                return b.height - a.height;
            }
        });
        return sorted;
    }
}
class UserInterface {
    constructor(userManager) {
        this.userManager = userManager;
        this.initElements();
        this.bindEvents();
    }
    initElements() {
        this.elements = {
            customerForm: document.getElementById('customerForm'),
            output: document.getElementById('output'),
            showAllUsers: document.getElementById('showAllUsers'),
            searchForm: document.getElementById('searchForm'),
            sortForm: document.getElementById('sortForm')
        };
    }
    bindEvents(){
        this.elements.customerForm.addEventListener('submit', this.handleFormSubmit.bind(this));
        this.elements.showAllUsers.addEventListener('click', this.showAllUsers.bind(this));
        this.elements.searchForm.addEventListener('submit', this.handleSearch.bind(this));
        this.elements.sortForm.addEventListener('submit', this.handleSort.bind(this));

    }

    handleFormSubmit(event) {
        event.preventDefault();
        const formData = this.getFormData(event.target);
        const user = this.userManager.addUser(formData);

        this.displayUser(user, 'Последний добавленный пользователь');
        event.target.reset();
    }
    getFormData(form) {
        return {
            lastName: form.querySelector('#lastName').value,
            firstName: form.querySelector('#firstName').value,
            middleName: form.querySelector('#middleName').value,
            gender: form.querySelector('#gender').value,
            national: form.querySelector('#national').value,
            height: parseInt(form.querySelector('#height').value),
            weight: parseInt(form.querySelector('#weight').value),
            dateBirthday: form.querySelector('#birthDay').value,
            phone: form.querySelector('#phone').value,
            address: form.querySelector('#address').value,
            cardNumber: form.querySelector('#cardNumber').value,
            bankNumber: form.querySelector('#bankNumber').value

        };
    }
    showAllUsers() {
        const users = this.userManager.getAllUsers();
        this.displayUsersList(users,'Список всех пользователей');

    }
    handleSearch(event) {
        event.preventDefault();
        const field = event.target.querySelector('#searchField').value;
        const value = event.target.querySelector('#searchValue').value;
        const results = this.userManager.searchUsers(field, value);

        this.displayUsersList(results, 'Результаты поиска');

    }
    handleSort(event) {
        event.preventDefault();
        const order = event.target.querySelector('#sortOrder').value;
        const sortedUsers = this.userManager.sortUserByHeight(order);

        this.displayUsersList(sortedUsers, 'Список пользователей, отсортированных по росту');
    }

    displayUser(user, title) {
        this.elements.output.innerHTML = this.generateUserHTML(user, title);
    }
    displayUsersList(users, title) {
        if (users.length === 0) {
            this.elements.output.innerHTML = `<h2>${title}</h2><p>Нет данных для отображения</p>`;
            return;
        }

        const usersHTML = users.map(user => this.generateUserHTML(user)).join('');
        this.elements.output.innerHTML = `
      <h2>${title}</h2>
      <ul>${usersHTML}</ul>
    `;
    }

    generateUserHTML(user, title = '') {
        return `
      ${title ? `<h2>${title}</h2>` : ''}
      <li>
        <p><strong>Фамилия:</strong> ${user.lastName}</p>
        <p><strong>Имя:</strong> ${user.firstName}</p>
        <p><strong>Отчество:</strong> ${user.middleName}</p>
        <p><strong>Пол:</strong> ${user.gender}</p>
        <p><strong>Национальность:</strong> ${user.national}</p>
        <p><strong>Рост:</strong> ${user.height}</p>
        <p><strong>Вес:</strong> ${user.weight}</p>
        <p><strong>Дата рождения:</strong> ${user.dateBirthday}</p>
        <p><strong>Номер телефона:</strong> ${user.phone}</p>
        <p><strong>Адрес:</strong> ${user.address}</p>
        <p><strong>Номер банковской карточки:</strong> ${user.cardNumber}</p>
        <p><strong>Номер банковского счета:</strong> ${user.bankNumber}</p>
        <hr>
      </li>
    `;
    }

}
document.addEventListener('DOMContentLoaded', () => {
    const userManager = new UserManager();
    new UserInterface(userManager);
});