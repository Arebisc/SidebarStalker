export const pl = {
    studentForm: {
        addStudent: 'Dodaj studenta',
        date: 'Data',
        firstname: 'Imię',
        lastname: 'Nazwisko',
        index: 'Indeks',
        reset: 'Resetuj',
        add: 'Dodaj',

        placeholders: {
            firstname: 'Wprowadź imię',
            lastname: 'Wprowadź nazwisko',
            index: 'Wprowadź numer indeksu'
        },

        validators: {
            firstnameNotEmpty: 'Imię nie może być puste',
            lastnameNotEmpty: 'Nazwisko nie może być puste',
            indexNotEmpty: 'Indeks nie może być pusty',
            indexLenght: 'Indeks musi mieć długość z zakresu 1-10'
        }
    },

    asideMenuBar: {
        lecture: 'Wykład',
        settings: 'Ustawienia',
        export: 'Eksport',
        exit: 'Wyjście',
        detectedPeopleNumber: 'Wykryta liczba osób'
    },

    header: {
        studentsTable: 'Tabela studentów',
        export: 'Eksport',
        exportCSV: 'Eksport CSV',
        exportXLS: 'Eksport XLS'
    },

    notifications: {
        error: 'Błąd',
        formErrors: 'Formularz zawiera błędy',
        cameraErrorOccured: 'Wystąpił błąd kamery! Prosimy sprawdzić jeszcze raz parametry połączenia w ustawieniach.',
        success: 'Sukces',
        successChanged: 'Poprawnie zmodyfikowano ustawienia.',
        studentAdded: 'Dodano studenta'
    },

    settingsForm: {
        cancel: 'Anuluj',
        submit: 'Zmień',

        placeholders: {
            cameraPort: 'Port kamery IP',
            cameraIp: 'Adres IP kamery'
        },

        validators: {
            cameraIpNotEmpty: 'IP kamery nie może być puste',
            cameraPortNotEmpty: 'Port kamery nie może być pusty'
        }
    }
}