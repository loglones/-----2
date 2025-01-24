const users = [];

document.getElementById('customerForm').addEventListener("submit", function(event){
    event.preventDefault();
    const lastName = document.getElementById('lastName').value;
    const firstName = document.getElementById('firstName').value;
    const middleName = document.getElementById('middleName').value;
    const gender = document.getElementById('gender').value;
    const national = document.getElementById('national').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const dateBirthday = document.getElementById('birthDay').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const bankNumber = document.getElementById('bankNumber').value;

    const user = {
        lastName,
        firstName,
        middleName,
        gender,
        national,
        height,
        weight,
        dateBirthday,
        phone,
        address,
        cardNumber,
        bankNumber
    };

    users.push(user);

    const output = `
    <h2>Последний добавленный пользователь</h2>
    <ul>
        <li>
            <p><strong>Фамилия:</strong>${lastName}</p>
            <p><strong>Имя:</strong>${firstName}</p>
            <p><strong>Отчество:</strong>${middleName}</p>
            <p><strong>Пол:</strong>${gender}</p>
            <p><strong>Национальность:</strong>${national}</p>
            <p><strong>Рост:</strong>${height}</p>
            <p><strong>Вес:</strong>${weight}</p>
            <p><strong>Дата рождения:</strong>${dateBirthday}</p>
            <p><strong>Номер телефона:</strong>${phone}</p>
            <p><strong>Адрес:</strong>${address}</p>
            <p><strong>Номер банковской карточки:</strong>${cardNumber}</p>
            <p><strong>Номер банковского счета:</strong>${bankNumber}</p>
        </li>
    </ul>
    `;
    
    document.getElementById('output').innerHTML = output;
    document.getElementById('customerForm').reset();

    document.getElementById('showAllUsers').addEventListener('click', function() {
        const output = `
        <h2>Список всех пользователей</h2>
        <ul>
            ${users.map(user => `
                <li>
                    <p><strong>Фамилия:</strong>${user.lastName}</p>
                    <p><strong>Имя:</strong>${user.firstName}</p>
                    <p><strong>Отчество:</strong>${user.middleName}</p>
                    <p><strong>Пол:</strong>${user.gender}</p>
                    <p><strong>Национальность:</strong>${user.national}</p>
                    <p><strong>Рост:</strong>${user.height}</p>
                    <p><strong>Вес:</strong>${user.weight}</p>
                    <p><strong>Дата рождения:</strong>${user.dateBirthday}</p>
                    <p><strong>Номер телефона:</strong>${user.phone}</p>
                    <p><strong>Адрес:</strong>${user.address}</p>
                    <p><strong>Номер банковской карточки:</strong>${user.cardNumber}</p>
                    <p><strong>Номер банковского счета:</strong>${user.bankNumber}</p>
                    <p><strong>---------------------------------------------------------------------------</strong></p>
                </li>
            `).join('')}
        </ul>
        `;
        document.getElementById('output').innerHTML = output;
    })
});
