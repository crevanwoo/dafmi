function validateForm(selector, f_name, f_invalid) {


    $(selector).validate({
        invalidHandler: function () {
            if (f_invalid) {
                console.log('error');
                f_invalid()
            }
        },
        submitHandler: function () {
            if (f_name) {
                console.log('success');
                f_name()
            }
        },
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
                number: true,
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
                number: true
            },
            comment: {
                required: true,
                maxlength: 800
            },
            pass_reg: {
                required: true
            },
            pass_confirm: {
                equalTo: "[name='pass_reg']"
            },
            num_0: {
                number: true
            },
            num_1: {
                number: true
            },
            num_2: {
                number: true
            },
            num_3: {
                number: true
            }
        },
        messages: {
            pass: {
                required: "Необходимо ввести пароль"
            },
            email: {
                required: "Необходимо ввести адрес почты",
                email: "Необходимо ввести адрес в правильном формате"
            },
            code: {
                required: "Необходимо ввести действительный код",
                minlength: "Необходимо ввести действительный код",
                maxlength: "Необходимо ввести действительный код",
                number: "Необходимо ввести действительный код"
            },
            city: {
                required: "Необходимо ввести город"
            },
            adress: {
                required: "Необходимо ввести действительный адрес"
            },
            tel: {
                required: "Необходимо ввести телефон",
                number: "Необходимо ввести только цифры",
            },
            comment: {
                required: "Напишите суть своего обращения",
                maxlength: "Сообщение слишком длинное. Максимум 800 символов",
            },

            name: {
                required: "Необходимо ввести имя"
            },
            pass_reg: {
                required: "Необходимо ввести пароль"
            },
            pass_confirm: {
                equalTo: "Ошибка ввода"
            },
            num_0: {
                number: "Вы должны указать число"
            },
            num_1: {
                number: "Вы должны указать число"
            },
            num_2: {
                number: "Вы должны указать число"
            },
            num_3: {
                number: "Вы должны указать число"
            }

        },
        errorClass: "invalid",
        validClass: "success",
        errorLabelContainer: ".error_message",
        wrapper: "li",
        errorElement: "span",

    })
}
