function validateForm(selector, f_name) {
    $(selector).validate({
         submitHandler: f_name,
        rules: {
            name: {
                required: true,
            },
            pass: {
                required: true,
            },
            email: {
                required: true,
                email: true
            },
            code: {
                required: true,
                minlength: 8,
                maxlength: 8
            },
            city: {
                required: true,
            },
            adress: {
                required: true,
            },
            tel: {
                required: true,
                numbers: true
            },
            comment: {
                required: true,
                maxlength: 800
            }
        },
        messages: {
            pass: "Необходимо ввести пароль",
            email: {
                required: "Необходимо ввести адрес почты",
                email: "Необходимо ввести адрес в правильном формате"
            },
            code: "Необходимо ввести действительный код",
            city: "Необходимо ввести город",
            adress: "Необходимо ввести действительный адрес",
            tel: {
                required: "Необходимо ввести телефон",
                numbers: "Необходимо ввести только цифры",
            },
            comment: {
                required: "Напишите суть своего обращения",
                maxlength: "Сообщение слишком длинное. Максимум 800 символов",
            },

            name: "Необходимо ввести имя",

        },
        errorClass: "invalid",
        errorLabelContainer: ".error_message",
        wrapper: "li",

    })
}
