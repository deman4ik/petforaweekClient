/*
	Ресурсы для локализации приложения (в литералах поддерживаются макроподстановки %1$s - первая, %2$s - вторая и т.д.)
*/
var langs = [
	//язык по умолчанию
	{
		//код языка
		lang: "DEFAULT",
		display: false,
		//формат даты по умолчанию
		DATE_FORMAT: "dd.mm.yyyy",
		//общая ошибка
		UNDEFINED_RESOURCE: "Undefined message!",
		//ресурсы для клиентских сообщений об ошибках и информации
		CLNT_NO_LANGUAGE: "No language selected!",
		CLNT_NO_OBJECT: "No object passed!"
	},
	//русский
	{
		//код языка
		lang: "RU",
		display: true,
		//валюта для языка
		CURRENCY: "руб",
		//код языка каленаря и формат даты
		CALENDAR: "ru",
		DATE_FORMAT: "dd.mm.yyyy",
		//метрики
		METER: "м",
		//общая ошибка
		UNDEFINED_RESOURCE: "Неопределенное сообщение!",
		//ресурсы для пользовательского интерфейса
		UI_COPYRIGHT: "Copyright © 2015",
		UI_UNIT_UNDER_CONSTRUCTION: "Раздел в разработке",
		UI_UNIT_NOT_FOUND: "Раздел не найден",
		UI_NO_DATA: "Нет данных для отображения",
		UI_MENU_AUTH_LOGIN: "Войти",
		UI_MENU_AUTH_LOGOUT: "Выйти",
		UI_MAIN_MENU_SEARCH: "Поиск",
		UI_MAIN_MENU_PROFILE: "Профиль",
		UI_MAIN_MENU_FAVOR: "Избранное",
		UI_FOOTER_MENU_HOWITWORKS: "Как это работает?",
		UI_FOOTER_MENU_TERMSUSE: "Условия использования",
		UI_FOOTER_MENU_RULES: "Правила",
		UI_FOOTER_MENU_HELP: "Центр помощи",
		UI_FOOTER_MENU_CONTACT: "Связаться с нами",
		UI_FOOTER_MENU_SOCIAL_FACEBOOK: "КНИГА-ЛИЦО",
		UI_FOOTER_MENU_SOCIAL_TWITTER: "ЩЕБЕТУН",
		UI_FOOTER_MENU_SOCIAL_INSTAGRAM: "ФОТОГРАММ",
		UI_FOOTER_MENU_SOCIAL_GOOGLEPLUS: "ДОБРО+",
		UI_TAB_PROFILE_REVIEWS_IN: "Меня бронировали",
		UI_TAB_PROFILE_REVIEWS_OUT: "Я бронировал",
		UI_TAB_PROFILE_ORDERS: "Запросы",
		UI_TBL_HDR_PROFILE_REVIEW_POST: "Объявление",
		UI_TBL_HDR_PROFILE_REVIEW_TO_ME: "Меня оценили",
		UI_TBL_HDR_PROFILE_REVIEW_FROM_ME: "Я оценил",
		UI_BTN_OK: "ОК",
		UI_BTN_CHANCEL: "Отмена",
		UI_BTN_REG_CONFIRM: "Подтвердить",
		UI_BTN_LOGIN: "Войти",
		UI_BTN_LOGIN_FB: "Войти через FB",
		UI_BTN_LOGIN_VK: "Войти через VK",
		UI_BTN_REGISTER: "Регистрация",
		UI_BTN_CLOSE: "Закрыть",
		UI_BTN_LEASE: "Сдать квартиру",
		UI_BTN_SEARCH: "Искать",
		UI_BTN_FILTER: "Фильтр",
		UI_BTN_FAVOR_ADD: "В избранное",
		UI_BTN_FAVOR_RM: "В избранном",
		UI_BTN_FAVOR_DEL: "Убрать",
		UI_BTN_CLEAR: "Очистить",
		UI_BTN_REQ_RENT: "Запросить бронирование",
		UI_BTN_SEND_COMPLAINT: "Пожаловаться",
		UI_BTN_SHOW_PHONE: "Показать телефон",
		UI_BTN_RATE: "Отзыв",
		UI_BTN_ADD_RENT_POST: "Разместить",
		UI_BTN_UPD_RENT_POST: "Изменить",
		UI_BTN_EDIT: "Редактировать",
		UI_BTN_DELETE_ADVERT: "Удалить объявление",
		UI_BTN_ADD: "Добавить",
		UI_BTN_UPD: "Изменить",
		UI_BTN_DEL: "Удалить",
		UI_BTN_ADD_REVIEW: "Оставить отзыв",
		UI_BTN_ACCEPT: "Подтвердить",
		UI_BTN_DECLINE: "Отклонить",
		UI_BTN_ADD_PHOTO: "Добавить фото",
		UI_BTN_PICK_ON_MAP: "Указать на карте",
		UI_BTN_RESET_PASS: "Восстановить пароль",
		UI_BTN_CHPWD: "Сменить пароль",
		UI_BTN_MAIN_TRY_NOW: "Попробовать",
		UI_TITLE_APP: "Apartmenthost",
		UI_TITLE_LOGIN: "Вход",
		UI_TITLE_ADD_RENT_POST: "Размещение объявления о сдаче жилья",
		UI_TITLE_UPD_RENT_POST: "Изменение объявления о сдаче жилья",
		UI_TITLE_COMPLAINT: "Жалоба",
		UI_TITLE_REVIEW: "Отзыв",
		UI_TITLE_REVIEWS: "Отзывы",
		UI_TITLE_PICK_ON_MAP: "Укажите место на карте",
		UI_TITLE_REG_CONFIRM: "Подтверждение регистрации",
		UI_TITLE_PASS_RESET_CONFIRM: "Восстановление пароля",
		UI_TITLE_REGISTER: "Регистрация нового пользователя",
		UI_TITLE_CHPWD: "Смена пароля",
		UI_FLD_FIRST_NAME: "Имя",
		UI_FLD_REVIEW_TEXT: "Текст отзыва",
		UI_FLD_REVIEW_RATE: "Оценка",
		UI_FLD_COMPLAINT_TEXT: "Текст жалобы",
		UI_FLD_USERPIC: "Фото",
		UI_FLD_USER: "Пользователь",		
		UI_FLD_PASS: "Пароль",
		UI_FLD_DATE: "Дата",
		UI_FLD_PRICE: "Цена",
		UI_FLD_PHONE: "Телефон",
		UI_FLD_ADRESS: "Адрес",
		UI_FLD_UNAVAILABLE: "Недоступно",
		UI_FLD_APARTMENT_DESC: "Описание жилья",
		UI_FLD_RENT_EXTRA: "Дополнительно",
		UI_FLD_GENDER: "Пол",
		UI_FLD_MAIL: "Почта",
		UI_FLD_ABOUT_ME: "О себе",
		UI_FLD_PHOTO: "Фото",
		UI_FLD_SEARCH_RADIUS: "Радиус поиска",
		UI_FLD_CONF_CODE: "Код подтверждения",
		UI_FLD_NEW_PASS_CONF: "Подтверждение",
		UI_FLD_NEW_PASS: "Новый пароль",
		UI_FLD_SEARCH_RADIUS_CHECK: "Искать в радиусе",
		UI_PLH_NEW_PASS: "Введите новый пароль",
		UI_PLH_NEW_PASS_CONF: "Повторите новый пароль",
		UI_PLH_CONF_CODE: "Укажите код, полученный по E-mail",
		UI_PLH_USER: "Имя пользователя (e-mail)",
		UI_PLH_PASS: "Пароль пользователя",
		UI_PLH_DATE_FROM: "Дата с",
		UI_PLH_DATE_TO: "Дата по",
		UI_PLH_FILTER_ADRESS: "Пункт назначения, адрес или его часть",
		UI_PLH_ADRESS: "Адрес жилья",
		UI_PLH_APARTMENT_DESC: "Расскажите о своем жилье",
		UI_PLH_RENT_EXTRA: "Укажите дополнительные параметры через запятую",
		UI_PLH_FIRST_NAME: "Имя",
		UI_PLH_LAST_NAME: "Фамилия",
		UI_PLH_PHONE: "Телефон",
		UI_PLH_MAIL: "Почта",
		UI_PLH_ABOUT_ME: "Расскажите о себе",
		UI_LBL_FILTER_RESULT: "Найдено предложений",
		UI_LBL_ANY_PRICE: "не имеет значения",
		UI_LBL_LESS: "менее %1$s %2$s",
		UI_LBL_BETWEEN: "от %1$s до %2$s %3$s",
		UI_LBL_MORE: "более %1$s %2$s",
		UI_LBL_PERIOD_DAY: "день",
		UI_LBL_PERIOD: "период",
		UI_LBL_EXTRAS: "Дополнительно",
		UI_LBL_BOOKED: "Запрос отправлен",
		UI_LBL_MAKE_CALL: "или",
		UI_LBL_CAN_RATE_AFTER_BOOKING: "Запросив бронирование вы также сможете оставить отзыв",
		UI_LBL_DESCR: "Описание",
		UI_LBL_ABOUT_OWNER: "О собственнике",
		UI_LBL_PROFILE: "Мой профиль",
		UI_LBL_USER_PROFILE: "Профиль пользователя",
		UI_LBL_ADVERT: "Моё объявление",
		UI_LBL_MAIN_MAKE_ACTION: "Сдай своё жильё",
		UI_LBL_MAIN_AND_BE_OK: "И живи спокойно.",
		UI_LBL_MAIN_OR: "или",
		UI_LBL_MAIN_TRY_ANOTHER_ACTION: "Найди себе новое!",
		UI_NOTE_PHONE: "Телефон Вашего профиля.",
		UI_NOTE_UNAVAILABLE: "Отметьте дни, в которые жилье будет точно не доступно.",
		UI_NOTE_RENT_EXTRA: "Здесь можно указать наиболее привлекательные параметры жилья, например: кондиционер, консъерж, гаражное место.",
		UI_NOTE_REG_CODE: "Введите код полученный по E-mail и нажмите \"%1$s\" для активации Вашей учетной записи",
		UI_NOTE_RESET_PASS: "Введите код полученный по E-mail и новый пароль, затем нажмите \"%1$s\" для сброса пароля Вашей учетной записи",
		UI_NOTE_USER: "Введите Ваш E-mail, в дальнейшем Вы будете использовать его для входа",
		UI_NOTE_PHOTO: "Нажмите на фото, чтобы сделать его основным",
		//ресурсы для метаописания объектов - фиксированные поля
		MD_ITM_ID: "Идентификатор",
		MD_ITM_NAME: "Наименование",
		MD_ITM_USERID: "Идентификатор пользователя",
		MD_ITM_ADRESS: "Адрес",
		MD_ITM_LATITUDE: "Широта",
		MD_ITM_LONGITUDE: "Долгота",
		MD_ITM_LANG: "Язык",
		MD_ITM_CREATEDAT: "Создан",
		MD_ITM_UPDATEDAT: "Изменен",
		MD_ITM_COHABITATIONTYPE: "Тип проживания",
		MD_ITM_APARTMENTTYPE: "Тип жилья",
		MD_ITM_GUEST_SEX: "Пол постояльца",
		//ресурсы для описания списков - пол пользователя
		PG_MALE: "Мужской",
		PG_FEMALE: "Женский",
		//ресурсы для описания списков - категории цен
		PC_DOG: "Собака",
		PC_CAT: "Кот",
		PC_THING: "Средний",
		PC_ALIEN: "Инопланетный",
		//ресурсы для описания списков - типы недвижимости
		POT_HOUSE: "Дом",
		POT_ROOM: "Комната",
		POT_OFFICE: "Офис",
		POT_FLAT: "Квартира",
		POT_HOTEL_ROOM: "Гостиничный номер",
		//ресурсы для описания списков - состояния запросов на бронирование
		DVAL_ACCEPTED: "Подтверждено",
		DVAL_DECLINED: "Отклонено",
		DVAL_PENDING: "Ожидает подтверждения...",
		//ресурсы для серверных сообщений об ошибках и информации
		SRV_EXCEPTION: "Ошибка сервера!",
		SRV_COMMON_ERROR: "Ошибка сервера!",
		SRV_UNAUTH: "Требуется аутентификация!",
		SRV_LOGIN_INVALID_EMAIL: "Некорректно указано имя пользователя!",
		SRV_LOGIN_INVALID_PASS: "Некорректно указан пароль!",
		SRV_APARTMENT_REQUIRED: "Незаполнено обязательное поле \"%1$s\"!",
		SRV_APARTMENT_DEPENDENCY: "У данного объекта есть зависимости!",
		SRV_CARD_EXISTS: "У Вас уже есть объявление!",
		SRV_RESERVATION_EXISTS: "Вы уже отрправили запрос на указанные даты!",
		SRV_CARD_WRONG_DATE: "Некорректно указаны даты! Проверьте границы диапазона!",
		SRV_RESERVATION_UNAVAILABLE_DATE: "Некорректно указаны даты! Объект недоступен в указанное время!",
		SRV_CARD_INVALID_FILTER: "Не заданы параметры отбора карточек объявлений!",
		SRV_REG_INVALID_EMAIL: "Некорретный E-mail!",
		SRV_REG_INVALID_PASSWORD: "Некорректный пароль (должен быть 8 и более символов)!",
		SRV_REG_EXISTS_EMAIL: "Такой E-mail уже зарегистрирован!",
		SRV_USER_BLOCKED: "Пользователь заблокирован!",
		SRV_USER_NOTFOUND: "Пользователь не найден!",
		SRV_USER_CONFIRMED: "Ваш E-mail уже подтвержден!",
		SRV_USER_WRONG_CODE: "Некорректный код подтверждения!",
		SRV_USER_REQUIRED: "Незаполнено обязательное поле \"%1$s\"",
		SRV_USER_NO_NAME: "Не задано имя пользователя! Установите имя и фамилию пользователя в профиле!",
		SRV_USER_NOT_CONFIRMED: "Учетная запись не подтверждена!",
		SRV_REVIEW_WRONG_DATE: "Пока нельзя добавить отзыв...",
		SRV_CARD_REQUIRED: "Не заполнено обязательное поле карточки \"%1$s\"",
		FirstName: "Имя",
		LastName: "Фамилия",
		Gender: "Пол",
		Phone: "Телефон",		
		code: "Код",
		password: "Пароль",
		//ресурсы для клиентских сообщений об ошибках и информации
		CLNT_ON_OFF: "Вкыл/выкл",
		CLNT_COMMON_ERROR: "Ошибка",
		CLNT_COMMON_SUCCESS: "Успех",
		CLNT_COMMON_DONE: "Операция успешно выполнена",
		CLNT_COMMON_PROGRESS: "Загрузка данных...",
		CLNT_COMMON_CONFIRM: "Подтвердите действие",
		CLNT_COMMON_CONFIRM_REMOVE: "Действительно хотите удалить это?",
		CLNT_NO_LANGUAGE: "Не указан язык!",
		CLNT_NO_OBJECT: "Не указан объект!",
		CLNT_NO_ID: "Не указан идентификатор",
		CLNT_BAD_OBJECT: "Объект \"%1$s\" имеет некорректную структуру!",
		CLNT_NO_ELEM: "Не указан структурный элемент \"%2$s\" объекта \"%1$s\"!",
		CLNT_BAD_ELEM: "Структурный элемент \"%2$s\" объекта \"%1$s\" указан некорректно!",
		CLNT_FORM_BAD_META: "Метаданные формы не прошли валидацию!",
		CLNT_FORM_ITEM_BAD_META: "Метаданные элемента формы не прошли валидацию!",
		CLNT_REGISTER_NO_FIRST_NAME: "Не указано имя!",
		CLNT_AUTH_NO_USER_NAME: "Не указано имя пользователя (e-mail)!",
		CLNT_AUTH_NO_PASSWORD: "Не указан пароль!",
		CLNT_META_NO_OBJ_TYPE: "Не указан тип объекта!",
		CLNT_WS_NO_CALL_BACK: "Ошибка исполнения запроса к серверу: не указана CallBack функция!",
		CLNT_WS_NO_QUERY: "Ошибка исполнения запроса к серверу: не указан запрос!",
		CLNT_LOGIN_ERR: "Ошибка входа в систему",
		CLNT_LOGIN_PROCESS: "Вход в систему...",
		CLNT_NO_MODE: "Не указан режим работы компонента!",
		CLNT_NO_FAVORITES: "У вас в избранном нет объявлений",
		CLNT_BOOKING_NO_DATES: "Не указаны даты бронирования и категория цены!",
		CLNT_NO_ADVERTS: "У вас нет объявлений, нажмите здесь для создания объявления",
		CLNT_NO_ADVERTS_VIEW: "Пользователь ещё не создал объявления",
		CLNT_ADVERTS_VIEW_TITLE: "Объявления пользователя",
		CLNT_COMPLAINT_ADDED: "Спасибо за помощь",		
		CLNT_ADVER_NO_PHONE: "Необходимо указать телефон, чтобы съемщики могли связаться с вами!",
		CLNT_DATES_INTERVAL_LIMITS: "Дата начала диапазона должна быть раньше даты его завершения!",
		CLNT_DATES_INTERVAL_CROSS: "Указаны пересекающиеся диапазоны дат!",
		CLNT_NO_POST: "Отзыв пока не оставили",
		CLNT_CAN_NOT_ADD_REVIEW: "Вы не можете оставить отзыв, пока не закончился период бронирования",
		CLNT_RESERVATION_DECLINED: "Ваш запрос отклонен",
		CLNT_RESERVATION_ACCEPTED: "Ваш запрос подтвержден",
		CLNT_REVIEW_ADDED: "Ваш отзыв отправлен!",
		CLNT_UNKNOWN_ADDRESS: "Неизвестный адрес",
		CLNT_CONFIRM_DONE: "Учетная запись активирована! Теперь Вы можете войти используя свое имя пользователя и пароль указанные при регистрации!",
		CLNT_RESTORE_PASS_FORGET: "восстановить пароль",
		CLNT_PASS_RESET_DONE: "Пароль восстановлен! Теперь Вы можете войти используя свой новый пароль!",
		CLNT_CAN_NOT_DELETE_DEFAULT_PICTURE: "Нельзя удалять изображение по умолчанию (если оно не последнее)! Укажите другое изображение по-умолчанию, а затем удалите данное!",
		CLNT_PASS_NOT_CONF: "Пароль и его подтверждение не совпадают!",
		CLNT_PASS_CHANGE_DONE: "Пароль изменен! Теперь Вы можете входить используя свой новый пароль!",
		CLNT_PRICE_CATEGORY_APPEND_ERR: "Не могу добавить категорию цены: не указаны или указаны не корректно наименование категории и цена!",
		CLNT_PRICE_CATEGORY_CALC_ERR: "Укажите пол и даты:",
		CLNT_LOGIN_SOCIAL_ERR: "Ошибка входа через социальную сеть!",
		CLNT_CONFIRM_RESET_PASSWORD: "На адрес \"%1$s\" будет выслано письмо с подтвеждением восстановления пароля. Продолжить?",
		CLNT_EULA_AGREE: "Я согласен с условиями использования",
		CLNT_NO_EULA_AGREE: "Вы должны согласиться с условиями использования для продолжения регистрации...",
		CLNT_EULA_NOTE: "Перед регистрацией ознакомьтесь с условиями использования и подтвердите Ваше согласие с ними... Нажмите здесь для ознакомления с условиями использования...",
		//загрузчик картинок
		IUPLDR_SOURCES_LOCAL_TITLE: "Файлы",
		IUPLDR_SOURCES_LOCAL_DROP_FILE: "Перетащите файл с картинкой сюда",
		IUPLDR_SOURCES_LOCAL_DROP_FILES: "Перетащите файлы с картинками сюда",
		IUPLDR_SOURCES_LOCAL_DROP_OR: "или",
		IUPLDR_SOURCES_LOCAL_SELECT_FILE: "Укажите",
		IUPLDR_SOURCES_LOCAL_SELECT_FILES: "Укажите",
		IUPLDR_SOURCES_URL_TITLE: "URL",
		IUPLDR_SOURCES_URL_NOTE: "Общедоступный URL файла с картинкой:",
		IUPLDR_SOURCES_URL_UPLOAD: "Загрузить",
		IUPLDR_SOURCES_URL_ERROR: "Пожалуйста, укажите корректный адрес URL.",
		IUPLDR_SOURCES_CAMERA_TITLE: "Камера",
		IUPLDR_SOURCES_CAMERA_NOTE: "Убедитесь что Ваш браузер поддерживает управление камерой, разместите объект перед ней и нажмите Захватить:",
		IUPLDR_SOURCES_CAMERA_CAPTURE: "Захватить",
		IUPLDR_PROGRESS_UPLOADING: "Загружаю...",
		IUPLDR_PROGRESS_UPLOAD_CROPPED: "Загрузить",
		IUPLDR_PROGRESS_PROCESSING: "Обрабатываю...",
		IUPLDR_PROGRESS_RETRY_UPLOAD: "Попробуйте еще раз",
		IUPLDR_PROGRESS_USE_SUCCEEDED: "OK",
		IUPLDR_PROGRESS_FAILED_NOTE: "Некоторые картинки не смогли загрузиться."
	},
	//английский
	{
		//код языка
		lang: "EN",
		display: true,
		//валюта для языка
		CURRENCY: "USD",
		//код языка каленаря и формат даты
		CALENDAR: "en",
		DATE_FORMAT: "mm/dd/yyyy",
		//метрики
		METER: "m",
		//общая ошибка
		UNDEFINED_RESOURCE: "Undefined message!",
		//ресурсы для пользовательского интерфейса
		UI_COPYRIGHT: "Copyright © 2015",
		UI_UNIT_UNDER_CONSTRUCTION: "Unit is under construction",
		UI_UNIT_NOT_FOUND: "Unit not found",
		UI_NO_DATA: "No data to display",
		UI_MENU_AUTH_LOGIN: "Login",
		UI_MENU_AUTH_LOGOUT: "Logout",		
		UI_MAIN_MENU_SEARCH: "Search",
		UI_MAIN_MENU_PROFILE: "Profile",
		UI_MAIN_MENU_FAVOR: "Favorits",
		UI_FOOTER_MENU_HOWITWORKS: "How does it works?",
		UI_FOOTER_MENU_TERMSUSE: "Terms of use",
		UI_FOOTER_MENU_RULES: "Rules",
		UI_FOOTER_MENU_HELP: "Help",
		UI_FOOTER_MENU_CONTACT: "Contact us",
		UI_FOOTER_MENU_SOCIAL_FACEBOOK: "FACEBOOK",
		UI_FOOTER_MENU_SOCIAL_TWITTER: "TWITTER",
		UI_FOOTER_MENU_SOCIAL_INSTAGRAM: "INSTAGRAM",
		UI_FOOTER_MENU_SOCIAL_GOOGLEPLUS: "GOOGLE+",
		UI_TAB_PROFILE_REVIEWS_IN: "My customers",
		UI_TAB_PROFILE_REVIEWS_OUT: "I'm customer",
		UI_TAB_PROFILE_ORDERS: "Orders",
		UI_TBL_HDR_PROFILE_REVIEW_POST: "Advert",
		UI_TBL_HDR_PROFILE_REVIEW_TO_ME: "Review for me",
		UI_TBL_HDR_PROFILE_REVIEW_FROM_ME: "My review",
		UI_BTN_OK: "OK",
		UI_BTN_CHANCEL: "Chancel",
		UI_BTN_REG_CONFIRM: "Confirm",
		UI_BTN_LOGIN: "Login",
		UI_BTN_LOGIN_FB: "Login via FB",
		UI_BTN_LOGIN_VK: "Login via VK",
		UI_BTN_REGISTER: "Register",
		UI_BTN_CLOSE: "Close",
		UI_BTN_LEASE: "Lease apartment",
		UI_BTN_SEARCH: "Find",
		UI_BTN_FILTER: "Filter",
		UI_BTN_FAVOR_ADD: "To favorites",
		UI_BTN_FAVOR_RM: "In favorites",
		UI_BTN_FAVOR_DEL: "Remove",
		UI_BTN_CLEAR: "Clear",
		UI_BTN_REQ_RENT: "Request rent",
		UI_BTN_SEND_COMPLAINT: "Send complaint",
		UI_BTN_SHOW_PHONE: "Show phone",
		UI_BTN_RATE: "Rate",
		UI_BTN_ADD_RENT_POST: "Publish",
		UI_BTN_UPD_RENT_POST: "Update",
		UI_BTN_EDIT: "Edit",
		UI_BTN_DELETE_ADVERT: "Remove advert",
		UI_BTN_ADD: "Add",
		UI_BTN_UPD: "Update",
		UI_BTN_DEL: "Remove",
		UI_BTN_ADD_REVIEW: "Add review",
		UI_BTN_ACCEPT: "Accept",
		UI_BTN_DECLINE: "Decline",
		UI_BTN_ADD_PHOTO: "Add photo",
		UI_BTN_PICK_ON_MAP: "Pick on map",
		UI_BTN_RESET_PASS: "Reset password",
		UI_BTN_CHPWD: "Change password",
		UI_BTN_MAIN_TRY_NOW: "Try now",
		UI_TITLE_APP: "Apartmenthost",
		UI_TITLE_LOGIN: "Login",
		UI_TITLE_ADD_RENT_POST: "New apartment rent",
		UI_TITLE_UPD_RENT_POST: "Update apartment rent",
		UI_TITLE_COMPLAINT: "Complaint",
		UI_TITLE_REVIEW: "Review",
		UI_TITLE_REVIEWS: "Reviews",
		UI_TITLE_PICK_ON_MAP: "Pick place on map",
		UI_TITLE_REG_CONFIRM: "Registration confirm",
		UI_TITLE_PASS_RESET_CONFIRM: "Password reset confirm",
		UI_TITLE_REGISTER: "New user registration",
		UI_TITLE_CHPWD: "Change password",
		UI_FLD_FIRST_NAME: "Name",
		UI_FLD_REVIEW_TEXT: "Review text",
		UI_FLD_REVIEW_RATE: "Rate it",
		UI_FLD_COMPLAINT_TEXT: "Complaint text",
		UI_FLD_USERPIC: "Picture",
		UI_FLD_USER: "User",
		UI_FLD_PASS: "Password",
		UI_FLD_DATE: "Date",
		UI_FLD_PRICE: "Price",
		UI_FLD_PHONE: "Phone",
		UI_FLD_ADRESS: "Adress",		
		UI_FLD_UNAVAILABLE: "Unavalable",
		UI_FLD_APARTMENT_DESC: "Apartment description",
		UI_FLD_RENT_EXTRA: "Extras",
		UI_FLD_GENDER: "Gender",
		UI_FLD_MAIL: "E-mail",
		UI_FLD_ABOUT_ME: "About myself",
		UI_FLD_PHOTO: "Photo",
		UI_FLD_SEARCH_RADIUS: "Search radius",
		UI_FLD_CONF_CODE: "Confirmation code",
		UI_FLD_NEW_PASS_CONF: "Confirmation",
		UI_FLD_NEW_PASS: "New password",
		UI_FLD_SEARCH_RADIUS_CHECK: "Search in radius",
		UI_PLH_NEW_PASS: "Enter new password",
		UI_PLH_NEW_PASS_CONF: "Repeat new password",
		UI_PLH_CONF_CODE: "Enter code from E-mail",
		UI_PLH_USER: "User name",		
		UI_PLH_PASS: "User password",
		UI_PLH_DATE_FROM: "Date from",
		UI_PLH_DATE_TO: "Date to",
		UI_PLH_FILTER_ADRESS: "Target place, adress or it's part",
		UI_PLH_ADRESS: "Apartment adress",
		UI_PLH_APARTMENT_DESC: "Tell customers about your apartment.",
		UI_PLH_RENT_EXTRA: "Enter comma separated additional parameters.",
		UI_PLH_FIRST_NAME: "First name",
		UI_PLH_LAST_NAME: "Last name",
		UI_PLH_PHONE: "Phone",
		UI_PLH_MAIL: "E-mail",
		UI_PLH_ABOUT_ME: "Tell us about your self",
		UI_LBL_FILTER_RESULT: "Adverts found",
		UI_LBL_ANY_PRICE: "any price",
		UI_LBL_LESS: "less %1$s %2$s",
		UI_LBL_BETWEEN: "from %1$s to %2$s %3$s",
		UI_LBL_MORE: "more %1$s %2$s",
		UI_LBL_PERIOD_DAY: "day",
		UI_LBL_PERIOD: "period",
		UI_LBL_EXTRAS: "Options",
		UI_LBL_BOOKED: "Request sent",
		UI_LBL_MAKE_CALL: "or",
		UI_LBL_CAN_RATE_AFTER_BOOKING: "You can rate this advert after booking",
		UI_LBL_DESCR: "Description",
		UI_LBL_ABOUT_OWNER: "About owner",
		UI_LBL_PROFILE: "My profile",
		UI_LBL_USER_PROFILE: "User profile",
		UI_LBL_ADVERT: "My advert",
		UI_LBL_MAIN_MAKE_ACTION: "Hand in your apart",
		UI_LBL_MAIN_AND_BE_OK: "and live like a boss",
		UI_LBL_MAIN_OR: "or",
		UI_LBL_MAIN_TRY_ANOTHER_ACTION: "Find a new one!",	
		UI_NOTE_PHONE: "Your profile's phone number.",
		UI_NOTE_UNAVAILABLE: "Set days, when your apartment is unavalable.",
		UI_NOTE_RENT_EXTRA: "Show the best features of you apartmetn. Condition, security, parking place, etc...",
		UI_NOTE_REG_CODE: "Enter code from E-mail and press \"%1$s\" to activate your account",
		UI_NOTE_RESET_PASS: "Enter code from E-mail and new password, then press \"%1$s\" to reset your account password",
		UI_NOTE_USER: "Enter your E-mail, you should use it to log in later",
		//ресурсы для метаописания объектов - фиксированные поля
		MD_ITM_ID: "Object identifier",
		MD_ITM_NAME: "Name",
		MD_ITM_USERID: "User identifier",
		MD_ITM_ADRESS: "Adress",
		MD_ITM_LATITUDE: "Latitude",
		MD_ITM_LONGITUDE: "Longitude",
		MD_ITM_LANG: "Language",
		MD_ITM_CREATEDAT: "Created",
		MD_ITM_UPDATEDAT: "Updated",
		MD_ITM_COHABITATIONTYPE: "Cohabitation type",
		MD_ITM_APARTMENTTYPE: "Apartment type",
		MD_ITM_GUEST_SEX: "Guest sex",
		//ресурсы для описания списков - пол пользователя
		PG_MALE: "Male",
		PG_FEMALE: "Female",
		//ресурсы для описания списков - категории цен
		PC_DOG: "Dog",
		PC_CAT: "Cat",
		PC_THING: "The Thing",
		PC_ALIEN: "Alien",
		//ресурсы для описания списков - типы недвижимости
		POT_HOUSE: "House",
		POT_ROOM: "Room",
		POT_OFFICE: "Office",
		POT_FLAT: "Flat",
		POT_HOTEL_ROOM: "Hotel room",
		//ресурсы для описания списков - состояния запросов на бронирование
		DVAL_ACCEPTED: "Accepted",
		DVAL_DECLINED: "Declined",
		DVAL_PENDING: "Pending...",
		//ресурсы для серверных сообщений об ошибках и информации
		SRV_EXCEPTION: "Server error!",
		SRV_COMMON_ERROR: "Server error!",
		SRV_UNAUTH: "Authorization has been denied for this request!",
		SRV_LOGIN_INVALID_EMAIL: "Invalid user name!",
		SRV_LOGIN_INVALID_PASS: "Invalid password!",
		SRV_APARTMENT_REQUIRED: "Field \"%1$s\" required!",
		SRV_APARTMENT_DEPENDENCY: "Object have dependencies!",
		SRV_CARD_EXISTS: "Your advert card already exists!",
		SRV_RESERVATION_EXISTS: "Reservation already exists!",
		SRV_CARD_WRONG_DATE: "Bad dates! Check interval limits!",
		SRV_RESERVATION_UNAVAILABLE_DATE: "Bad dates! Apartment not available!",
		SRV_CARD_INVALID_FILTER: "No cards filter specified!",
		SRV_REG_INVALID_EMAIL: "Bad E-mail!",
		SRV_REG_INVALID_PASSWORD: "Bad password (should be more then 8 chars)!",
		SRV_REG_EXISTS_EMAIL: "This E-mail already registered!",
		SRV_USER_BLOCKED: "User blocked!",
		SRV_USER_NOTFOUND: "User not found!",
		SRV_USER_CONFIRMED: "This E-mail already confirmed!",
		SRV_USER_WRONG_CODE: "Bad confirm code!",
		SRV_USER_REQUIRED: "Field \"%1$s\" required!",
		SRV_USER_NO_NAME: "User have no name! Set user's first and last name in profile",
		SRV_USER_NOT_CONFIRMED: "Account is not confirmed!",
		SRV_REVIEW_WRONG_DATE: "Can not make review yet...",
		SRV_CARD_REQUIRED: "Card field \"%1$s\" required!",
		FirstName: "First name",
		LastName: "Last name",
		Gender: "Gender",
		Phone: "Phone",
		code: "Code",
		password: "Password",
		//ресурсы для клиентских сообщений об ошибках и информации
		CLNT_ON_OFF: "On/Off",
		CLNT_COMMON_ERROR: "Error",
		CLNT_COMMON_SUCCESS: "Success",
		CLNT_COMMON_DONE: "Operation completed successfully",
		CLNT_COMMON_PROGRESS: "Loading...",
		CLNT_COMMON_CONFIRM: "Confirm action",
		CLNT_COMMON_CONFIRM_REMOVE: "Realy want to delete this?",
		CLNT_NO_LANGUAGE: "No language selected!",
		CLNT_NO_OBJECT: "No object passed!",
		CLNT_NO_ID: "No ID passed!",
		CLNT_BAD_OBJECT: "Object \"%1$s\" have no valid structure!",
		CLNT_NO_ELEM: "Element \"%2$s\" of object \"%1$s\" do not exists!",
		CLNT_BAD_ELEM: "Element \"%2$s\" of object \"%1$s\" is invalid!",
		CLNT_FORM_BAD_META: "Bad form defenition!",
		CLNT_FORM_ITEM_BAD_META: "Bad form item defenition!",
		CLNT_REGISTER_NO_FIRST_NAME: "No first name!",
		CLNT_AUTH_NO_USER_NAME: "No username (e-mail)!",
		CLNT_AUTH_NO_PASSWORD: "No password!",
		CLNT_META_NO_OBJ_TYPE: "No object type!",
		CLNT_WS_NO_CALL_BACK: "Server access error: no CallBack function!",
		CLNT_WS_NO_QUERY: "Server access error: no query!",
		CLNT_LOGIN_ERR: "Login error",
		CLNT_LOGIN_PROCESS: "Logging in...",
		CLNT_NO_MODE: "No component mode specified!",
		CLNT_NO_FAVORITES: "You have no favorites!",
		CLNT_BOOKING_NO_DATES: "No booking dates and price category specified!",
		CLNT_NO_ADVERTS: "You have no posts, click here to make one",
		CLNT_NO_ADVERTS_VIEW: "This user have no posts yet...",
		CLNT_ADVERTS_VIEW_TITLE: "User posts",
		CLNT_COMPLAINT_ADDED: "Thank you for cooperation",		
		CLNT_ADVER_NO_PHONE: "Specify you phone for customers!",
		CLNT_DATES_INTERVAL_LIMITS: "Start date should be less then end date!",
		CLNT_DATES_INTERVAL_CROSS: "Dates intervals cross over!",
		CLNT_NO_POST: "No review for now",
		CLNT_CAN_NOT_ADD_REVIEW: "You can not add review now",
		CLNT_RESERVATION_DECLINED: "Your reservation declined",
		CLNT_RESERVATION_ACCEPTED: "Your reservation accepted",
		CLNT_REVIEW_ADDED: "Your review sent!",
		CLNT_UNKNOWN_ADDRESS: "Unknown address",
		CLNT_CONFIRM_DONE: "Account activation successfull! You can log in now using your account!",
		CLNT_RESTORE_PASS_FORGET: "reset password",
		CLNT_PASS_RESET_DONE: "Password reset successfull! You can log in now using your new password!",
		CLNT_CAN_NOT_DELETE_DEFAULT_PICTURE: "Can not delete default picture (if it's not last)! Pick other picture as default and then delete this one!",
		CLNT_PASS_NOT_CONF: "Password does not equals it's confirmation!",
		CLNT_PASS_CHANGE_DONE: "Password changed successfully! You can log in using your new password!",
		CLNT_PRICE_CATEGORY_APPEND_ERR: "Can't append price category: bad category name or price!",
		CLNT_PRICE_CATEGORY_CALC_ERR: "Set category and dates to calc price!",
		CLNT_LOGIN_SOCIAL_ERR: "Social network login error!",
		CLNT_CONFIRM_RESET_PASSWORD: "We'll send a letter to \"%1$s\" with password reset confimation. Continue?",
		CLNT_EULA_AGREE: "I'm agree with the terms of use",
		CLNT_NO_EULA_AGREE: "You shuld agree with terms of use to register...",
		CLNT_EULA_NOTE: "You shuld read terms of use and confirm your agreement to register... Click here to read it...",
		//загрузчик картинок
		IUPLDR_SOURCES_LOCAL_TITLE: "Files",
		IUPLDR_SOURCES_LOCAL_DROP_FILE: "Move image here",
		IUPLDR_SOURCES_LOCAL_DROP_FILES: "Move images here",
		IUPLDR_SOURCES_LOCAL_DROP_OR: "or",
		IUPLDR_SOURCES_LOCAL_SELECT_FILE: "Pick a file",
		IUPLDR_SOURCES_LOCAL_SELECT_FILES: "Pick a files",
		IUPLDR_SOURCES_URL_TITLE: "URL",
		IUPLDR_SOURCES_URL_NOTE: "Public picture URL:",
		IUPLDR_SOURCES_URL_UPLOAD: "Upload",
		IUPLDR_SOURCES_URL_ERROR: "Please type a valid HTTP URL.",
		IUPLDR_SOURCES_CAMERA_TITLE: "Camera",
		IUPLDR_SOURCES_CAMERA_NOTE: "Make sure your browser allows camera capture, position yourself and click Capture:",
		IUPLDR_SOURCES_CAMERA_CAPTURE: "Capture",
		IUPLDR_PROGRESS_UPLOADING: "Uploading...",
		IUPLDR_PROGRESS_UPLOAD_CROPPED: "Upload",
		IUPLDR_PROGRESS_PROCESSING: "Processing...",
		IUPLDR_PROGRESS_RETRY_UPLOAD: "Try one more time",
		IUPLDR_PROGRESS_USE_SUCCEEDED: "OK",
		IUPLDR_PROGRESS_FAILED_NOTE: "Some pictures was not uploaded."
	}
]