document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');

    //функция для загрузки данных из localStorage и установки значений полей
    function loadFormData() {
        ['series', 'number', 'licensePlate', 'meetingDate', 'transport', 'driver', 'issued', 'whenIssued'].forEach(id => {
            const value = localStorage.getItem(id);
            if (value) {
                document.getElementById(id).value = value;
            }
        });
    }

    // сохранение данных полей в localStorage
    function saveFormData() {
        ['series', 'number', 'licensePlate', 'meetingDate', 'transport', 'driver', 'issued', 'whenIssued'].forEach(id => {
            localStorage.setItem(id, document.getElementById(id).value);
        });
    }

    //загрузка данных
    loadFormData();

    //сохранение данных полей
    form.addEventListener('input', saveFormData);

    // Валидация формы при отправке
    form.addEventListener('submit', (event) => {
        const series = document.getElementById('series').value;
        const number = document.getElementById('number').value;
        const licensePlate = document.getElementById('licensePlate').value;
        const meetingDate = document.getElementById('meetingDate').value;

        //серия
        if (!/^\d{4}$/.test(series)) {
            alert('Серия паспорта должна состоять из 4 цифр.');
            event.preventDefault();
            return;
        }

        //номер
        if (!/^\d{6}$/.test(number)) {
            alert('Номер паспорта должен состоять из 6 цифр.');
            event.preventDefault();
            return;
        }

        //госномер
        const licensePlatePattern = /^[АВЕКМНОРСТУХ]{1}\d{3}[АВЕКМНОРСТУХ]{2}$/i;
        if (!licensePlatePattern.test(licensePlate)) {
            alert('Госномер должен соответствовать формату а000аа');
            event.preventDefault();
            return;
        }

        //дата встречи
        const today = new Date().toISOString().split('T')[0];
        if (meetingDate < today) {
            alert('Дата встречи не может быть в прошлом.');
            event.preventDefault();
            return;
        }
    });
});
