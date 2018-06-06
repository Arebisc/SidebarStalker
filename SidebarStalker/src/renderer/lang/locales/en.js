export const en = {
    studentForm: {
        addStudent: 'Add student',
        date: 'Date',
        firstname: 'First name',
        lastname: 'Last name',
        index: 'Index',
        reset: 'Reset',
        add: 'Add',

        placeholders: {
            firstname: 'Insert student first name',
            lastname: 'Insert student last name',
            index: 'Insert student index'
        },

        validators: {
            firstnameNotEmpty: 'Firstname cannot be empty',
            lastnameNotEmpty: 'Lastname cannot be empty',
            indexNotEmpty: 'Index cannot be empty',
            indexLenght: 'Index has to be 1-10 lenght'
        }
    },

    asideMenuBar: {
        lecture: 'Lecture',
        settings: 'Settings',
        exit: 'Exit',
        detectedPeopleNumber: 'Detected people'
    },

    header: {
        studentsTable: 'Students Table',
        export: 'Export',
        exportCSV: 'Export CSV',
        exportXLS: 'Export XLS'
    },

    notifications: {
        error: 'Error!',
        formErrors: 'Form contains error',
        cameraErrorOccured: 'Camera error occured! Please check your ip camera settings',
        success: 'Success',
        successChanged: 'Successfully changed settings.',
        studentAdded: 'Added student'
    },

    settingsForm: {
        cancel: 'Cancel',
        submit: 'Change',

        placeholders: {
            cameraPort: 'IP camera port',
            cameraIp: 'IP camera adress'
        },

        validators: {
            cameraIpNotEmpty: 'Camera IP cannot be empty',
            cameraPortNotEmpty: 'Camera port cannot be empty'
        }
    }
}
