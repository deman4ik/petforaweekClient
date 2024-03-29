/*
	Профиль пользователя
*/
//состояние подтвержденности телефона профиля
var ProfilePhoneState = {
	unConfirmed: "UNCONF",
	confirmPending: "PENDING",
	confirmed: "CONF"
}
//класс профиля
var UserProfile = React.createClass({
	//состояние профиля
	getInitialState: function () {
		return {
			profile: {}, //профиль пользователя
			profileTmp: {}, //буфер для редактирования профиля
			profileReady: false, //профиль пользователя готов к отображению			
			notifyParentProfileLoaded: false, //флаг необходимости оповещения родителя о загруженности профиля пользователя
			notifyParentProfileChanged: false, //флаг необходимости оповещения родителя о смене профиля пользователя
			modeEdit: false, //режим редактирования профиля	
			displayChPwd: false, //флаг отображения формы смены пароля
			displayPhoneConf: false, //флаг отображения формы подтверждения телефона
			phoneConfForm: {}, //форма подтверждения телефона
			chPwdForm: {}, //форма смены пароля
			phoneCodes: [], //телефонные коды стран
		}
	},
	//сборка телефонных кодов стран
	buildPhoneCodes: function (props) {
		var pCtmp = [];
		pCtmp = phoneCodes.map(function(item, i) {
			return {
				label: Utils.getStrResource({lang: props.language, code: item.countryCode}) + " (+" + item.phoneCode + ")",
				code: item.phoneCode
			}
		});
		this.setState({phoneCodes: pCtmp});
	},
	//сборка буфера для редактирования профиля
	buildProfileTmp: function (profile) {
		var profileTmp = {};
		_.extend(profileTmp, profile);
		if(profile.phone) {
			profileTmp.phonePrefix = profileTmp.phone.substring(0, 1);
			profileTmp.phone = profileTmp.phone.substring(1);
		} else {
			profileTmp.phonePrefix = config.defaultPhonePrefix;
		}
		return profileTmp;
	},
	//сборка формы подтверждения телефона
	buildPhoneConfForm: function (props) {
		var formTmp = formFactory.buildForm({
			language: props.language,
			title: Utils.getStrResource({lang: props.language, code: "UI_TITLE_CONF_PHONE"})
		});
		var codeItemTmp = formFactory.buildFormItem({
			language: props.language,
			label: Utils.getStrResource({lang: props.language, code: "UI_FLD_CONF_CODE"}),
			name: "confCode",
			dataType: formFactory.itemDataType.NUMB,
			inputType: formFactory.itemInputType.MANUAL,
			required: true,
			value: ""
		});
		formFactory.appedFormItem(formTmp, codeItemTmp);
		this.setState({phoneConfForm: formTmp});
	},
	//отправка подтверждения телефона
	onPhoneConfFormOK: function (values) {		
		if(_.find(values, {name: "confCode"}))
			this.sendPhoneConfirmCode(_.find(values, {name: "confCode"}).value);		
	},
	//отмена подтверждения телефона
	onPhoneConfFormChancel: function () {
		this.setState({displayPhoneConf: false}, function() {this.buildPhoneConfForm(this.props);});
	},
	//сборка формы смены пароля
	buildChPwdForm: function (props) {
		var formTmp = formFactory.buildForm({
			language: props.language,
			title: Utils.getStrResource({lang: props.language, code: "UI_TITLE_CHPWD"})
		});
		var currPwdItemTmp = formFactory.buildFormItem({
			language: props.language,
			label: Utils.getStrResource({lang: props.language, code: "UI_FLD_PASS"}),
			name: "currenPass",
			dataType: formFactory.itemDataType.STR,
			inputType: formFactory.itemInputType.PWD,
			required: true,
			value: ""
		});
		var newPwdItemTmp = formFactory.buildFormItem({
			language: props.language,
			label: Utils.getStrResource({lang: props.language, code: "UI_FLD_NEW_PASS"}),
			name: "newPass",
			dataType: formFactory.itemDataType.STR,
			inputType: formFactory.itemInputType.PWD,
			required: true,
			value: ""
		});
		var newPwdConfItemTmp = formFactory.buildFormItem({
			language: props.language,
			label: Utils.getStrResource({lang: props.language, code: "UI_FLD_NEW_PASS_CONF"}),
			name: "newPassConf",
			dataType: formFactory.itemDataType.STR,
			inputType: formFactory.itemInputType.PWD,
			required: true,
			value: ""
		});
		formFactory.appedFormItem(formTmp, currPwdItemTmp);
		formFactory.appedFormItem(formTmp, newPwdItemTmp);
		formFactory.appedFormItem(formTmp, newPwdConfItemTmp);
		this.setState({chPwdForm: formTmp});
	},
	//смена пароля
	onChPwdFormOK: function (values) {		
		this.changePassword(
			_.find(values, {name: "currenPass"}).value, 
			_.find(values, {name: "newPass"}).value,
			_.find(values, {name: "newPassConf"}).value
		);
	},
	//отмена смены пароля
	onChPwdFormChancel: function () {
		this.setState({displayChPwd: false}, function() {this.buildChPwdForm(this.props);});
	},
	//смена пароля
	changePassword: function (currentPassword, password, passwordConfirm) {
		if(this.props.session.loggedIn) {
			if(
				(currentPassword)&&
				(password)&&
				(passwordConfirm)&&
				(password == passwordConfirm)
			) {
				this.props.onDisplayProgress(Utils.getStrResource({lang: this.props.language, code: "CLNT_COMMON_PROGRESS"}));
				var addPrms = {
					language: this.props.language, 
					session: this.props.session.sessionInfo,
					data: {
						currentPassword: currentPassword,
						password: password
					}				
				}
				clnt.changePassword(addPrms, this.handleChangePassword);
			} else {
				var message;
				if(!currentPassword) {
					message = Utils.getStrResource({lang: this.props.language, code: "SRV_USER_REQUIRED", values: ["UI_FLD_PASS"], searchVals: true});
				} else {
					if(!password) {
						message = Utils.getStrResource({lang: this.props.language, code: "SRV_USER_REQUIRED", values: ["UI_FLD_NEW_PASS"], searchVals: true});
					} else {
						if(!passwordConfirm) {
							message = Utils.getStrResource({lang: this.props.language, code: "SRV_USER_REQUIRED", values: ["UI_FLD_NEW_PASS_CONF"], searchVals: true});
						} else {
							if(password != passwordConfirm) {
								message = Utils.getStrResource({lang: this.props.language, code: "CLNT_PASS_NOT_CONF"});
							}
						}						
					}
				}				
				if(message) {
					this.props.onShowError(Utils.getStrResource({lang: this.props.language, code: "CLNT_COMMON_ERROR"}), message);
				}
			}
		}
	},	
	//оповещение родитлея о смене профиля
	notifyParentProfileChanged: function () {
		if((this.props.onProfileChange)&&(Utils.isFunction(this.props.onProfileChange))) {
			this.props.onProfileChange(this.state.profile);
		}
	},
	//оповещение родитлея о загруженности профиля
	notifyParentProfileLoaded: function () {
		if((this.props.onProfileLoaded)&&(Utils.isFunction(this.props.onProfileLoaded))) {
			this.props.onProfileLoaded(this.state.profile);
		}
	},
	//обработка загруженных данных объявления
	handleLoadProfileResult: function (resp) {
		this.props.onHideProgress();
		if(resp.STATE == clnt.respStates.ERR) {
			this.props.onShowError(Utils.getStrResource({lang: this.props.language, code: "CLNT_COMMON_ERROR"}), resp.MESSAGE);
		} else {
			var profileTmp = this.buildProfileTmp(resp.MESSAGE);
			this.setState({profile: resp.MESSAGE, profileTmp: profileTmp, profileReady: true});
			if(this.state.notifyParentProfileChanged) {
				this.setState({notifyParentProfileChanged: false}, this.notifyParentProfileChanged);
			}
			if(this.state.notifyParentProfileLoaded) {
				this.setState({notifyParentProfileLoaded: false}, this.notifyParentProfileLoaded);
			}			
		}
	},	
	//обработка результатов обновления профиля
	handleProfileUpdateResult: function (resp) {
		this.props.onHideProgress();
		if(resp.STATE == clnt.respStates.ERR) {
			this.props.onShowError(Utils.getStrResource({lang: this.props.language, code: "CLNT_COMMON_ERROR"}), resp.MESSAGE);
		} else {
			this.setState({modeEdit: false, notifyParentProfileChanged: true}, this.loadProfile);
		}
	},
	//обработка результата смены пароля
	handleChangePassword: function (resp) {
		this.props.onHideProgress();
		if(resp.STATE == clnt.respStates.ERR) {
			this.props.onShowError(Utils.getStrResource({lang: this.props.language, code: "CLNT_COMMON_ERROR"}), resp.MESSAGE);
		} else {
			this.props.onShowMessage(Utils.getStrResource({lang: this.props.language, code: "CLNT_COMMON_SUCCESS"}), 
				Utils.getStrResource({lang: this.props.language, code: "CLNT_PASS_CHANGE_DONE"}));
			this.setState({displayChPwd: false}, function() {this.buildChPwdForm(this.props);});
		}
	},
	//обработка результата загрузки изображения пользователя
	handleUploadProfilePictureResult: function (resp) {
		this.props.onHideProgress();
		if(resp.STATE == clnt.respStates.ERR) {
			this.props.onShowError(Utils.getStrResource({lang: this.props.language, code: "CLNT_COMMON_ERROR"}), resp.MESSAGE);
		} else {
			this.setState({notifyParentProfileChanged: true}, this.loadProfile);
		}
	},
	//обработка нажатия на изменение изображения пользователя
	handleUploadProfilePicture: function (error, result) {
		if(error) {
			if(error.message != ImageUpLoaderErrs.CLOSED)
				this.props.onShowError(Utils.getStrResource({lang: this.props.language, code: "CLNT_COMMON_ERROR"}), error.message);
		} else {
			if(result) {
				if(this.props.session.loggedIn) {
					this.props.onDisplayProgress(Utils.getStrResource({lang: this.props.language, code: "CLNT_COMMON_PROGRESS"}));
					var uplPrms = {
						language: this.props.language, 
						session: this.props.session.sessionInfo,
						profileId: this.state.profile.id,
						picture: {
							name: result[0].path, 
							cloudinaryPublicId: result[0].public_id
						}
					}
					clnt.uploadProfilePicture(uplPrms, this.handleUploadProfilePictureResult);
				}			
			}
		}
	},
	//обработка результата удаления изображения пользователя
	handleDeleteProfilePictureResult: function (resp) {
		this.props.onHideProgress();
		if(resp.STATE == clnt.respStates.ERR) {
			this.props.onShowError(Utils.getStrResource({lang: this.props.language, code: "CLNT_COMMON_ERROR"}), resp.MESSAGE);
		} else {
			this.setState({notifyParentProfileChanged: true}, this.loadProfile);
		}
	},
	//обработка результата отправки запроса на подтверждение телефона
	handleSendPhoneConfirmRequestResult: function (resp) {
		this.props.onHideProgress();
		if(resp.STATE == clnt.respStates.ERR) {
			this.props.onShowError(Utils.getStrResource({lang: this.props.language, code: "CLNT_COMMON_ERROR"}), resp.MESSAGE);
		} else {
			var tmpProf = {};
			_.extend(tmpProf, this.state.profile);
			tmpProf.phoneStatus = ProfilePhoneState.confirmPending;
			this.setState({profile: tmpProf}, this.notifyParentProfileChanged);
			this.props.onShowMessage(Utils.getStrResource({lang: this.props.language, code: "CLNT_COMMON_SUCCESS"}), 
				Utils.getStrResource({lang: this.props.language, code: "CLNT_PHONE_CONF_SENT"}));
		}
	},
	//обработка результата отправки кода на подтверждение телефона
	handleSendPhoneConfirmCodeResult: function (resp) {
		this.props.onHideProgress();
		if(resp.STATE == clnt.respStates.ERR) {
			this.props.onShowError(Utils.getStrResource({lang: this.props.language, code: "CLNT_COMMON_ERROR"}), resp.MESSAGE);
		} else {
			this.setState({displayPhoneConf: false, notifyParentProfileChanged: true}, function() {
				this.buildPhoneConfForm(this.props);
				this.loadProfile();
			});			
		}
	},
	//обработка нажатия на удаления изображения пользователя
	handleDeleteProfilePicture: function () {
		if(this.props.session.loggedIn) {
			this.props.onDisplayProgress(Utils.getStrResource({lang: this.props.language, code: "CLNT_COMMON_PROGRESS"}));
			var delPrms = {
				language: this.props.language, 
				session: this.props.session.sessionInfo,
				profileId: this.state.profile.id
			}
			clnt.removeProfilePicture(delPrms, this.handleDeleteProfilePictureResult);
		}
	},
	//загрузка данных профиля
	loadProfile: function () {
		this.props.onDisplayProgress(Utils.getStrResource({lang: this.props.language, code: "CLNT_COMMON_PROGRESS"}));
		var getPrms = {
			language: this.props.language, 
			userId: this.props.profileId,
			session: this.props.session.sessionInfo
		}
		clnt.getProfile(getPrms, this.handleLoadProfileResult);
	},
	//отправка запроса на подтверждение телефона
	sendPhoneConfirmRequest: function () {
		this.props.onDisplayProgress(Utils.getStrResource({lang: this.props.language, code: "CLNT_COMMON_PROGRESS"}));
		var sendPrms = {
			language: this.props.language, 
			session: this.props.session.sessionInfo
		}
		clnt.phoneConfirmRequest(sendPrms, this.handleSendPhoneConfirmRequestResult);
	},
	//отправка кода подтверждение телефона
	sendPhoneConfirmCode: function (code) {
		this.props.onDisplayProgress(Utils.getStrResource({lang: this.props.language, code: "CLNT_COMMON_PROGRESS"}));
		var sendPrms = {
			language: this.props.language, 
			session: this.props.session.sessionInfo,
			data: {code: code}
		}
		clnt.phoneConfirm(sendPrms, this.handleSendPhoneConfirmCodeResult);
	},
	//инициализация при подключении компонента к странице
	componentDidMount: function () {
		this.buildPhoneConfForm(this.props);
		this.buildChPwdForm(this.props);
		this.buildPhoneCodes(this.props);
		this.setState({notifyParentProfileLoaded: true}, this.loadProfile);
	},
	//обновление свойств компонента
	componentWillReceiveProps: function (newProps) {
		if(newProps.language != this.props.language) {
			this.buildPhoneConfForm(newProps);		
			this.buildChPwdForm(newProps);
			this.buildPhoneCodes(newProps);
		}
		if(newProps.profileId != this.props.profileId) {
			this.setState({notifyParentProfileLoaded: true}, this.loadProfile);
		}
	},
	//обработка изменения поля формы редактирования профиля
	handleFormItemChange: function (e) {
		var tmp = {};
		_.extend(tmp, this.state.profileTmp);
		tmp[e.target.id] = e.target.value;
		this.setState({profileTmp: tmp});
	},
	//нажатие на кнопку смены пароля
	handleChPwdClick: function () {
		this.setState({displayChPwd: true});
	},
	//обработка нажатия на кнопку редактирования
	handleEditClick: function () {
		var tmp = this.buildProfileTmp(this.state.profile);
		this.setState({profileTmp: tmp, modeEdit: true});
	},
	//обработка нажатия на кнопку отмены редактирования
	handleCancelEditClick: function () {
		this.setState({modeEdit: false});
	},
	//обработка нажатия на кнопку изменения профиля
	handleOKEditClick: function () {
		if(this.state.profileTmp.phone) {
			if(!this.state.profileTmp.phonePrefix) {
				this.props.onShowError(
					Utils.getStrResource({lang: this.props.language, code: "CLNT_COMMON_ERROR"}), 
					Utils.getStrResource({lang: this.props.language, code: "CLNT_NO_PHONE_PREFIX"})
				);
				return;
			}
			var phoneConf = _.findWhere(phoneCodes, {phoneCode: this.state.profileTmp.phonePrefix})
			if(
				(!Utils.isNumber(this.state.profileTmp.phone))||
				(!Utils.isNumberRe(this.state.profileTmp.phone))||
				(this.state.profileTmp.phone.length != phoneConf.phoneLength)
			) {
				this.props.onShowError(
					Utils.getStrResource({lang: this.props.language, code: "CLNT_COMMON_ERROR"}), 
					Utils.getStrResource({lang: this.props.language, code: "CLNT_BAD_PHONE", values: [phoneConf.phoneLength]})
				);
				return;
			}
		}
		this.props.onDisplayProgress(Utils.getStrResource({lang: this.props.language, code: "CLNT_COMMON_PROGRESS"}));
		var updPrms = {
			language: this.props.language, 
			data: {
				id: this.state.profileTmp.id,
				email: this.state.profileTmp.email,
				emailNewsletter: this.state.profileTmp.emailNewsletter,
				emailNotifications: this.state.profileTmp.emailNotifications,
				firstName: this.state.profileTmp.firstName,
				lastName: this.state.profileTmp.lastName,
				gender: this.state.profileTmp.gender,
				phone: ((this.state.profileTmp.phone)?this.state.profileTmp.phonePrefix + this.state.profileTmp.phone:null),
				description: this.state.profileTmp.description
			},
			session: this.props.session.sessionInfo
		}
		clnt.updateProfile(updPrms, this.handleProfileUpdateResult);
	},
	//обработка нажатия на подтверждение телефона
	handlePhoneConfClick: function () {
		//если ещё не подтвержден
		if(this.state.profile.phoneStatus == ProfilePhoneState.unConfirmed) {
			this.sendPhoneConfirmRequest();			
		}
		//если подтверждение уже отправлено
		if(this.state.profile.phoneStatus == ProfilePhoneState.confirmPending) {
			this.setState({displayPhoneConf: true})
		}
	},
	//генерация представления профиля
	render: function () {
		//содержимое профиля
		var content;
		//работаем если профиль загрузился
		if(this.state.profileReady) {
			//форма смены пароля
			var chPwdForm;
			if(this.state.displayChPwd) {
				chPwdForm =	<FormBuilder form={this.state.chPwdForm} 
								onOK={this.onChPwdFormOK} 
								onChancel={this.onChPwdFormChancel} 
								onShowError={this.props.onShowError}
								language={this.props.language}/>
			}
			//форма ввода кода подтверждения
			var phoneConfForm;
			if(this.state.displayPhoneConf) {
				phoneConfForm =	<FormBuilder form={this.state.phoneConfForm} 
									onOK={this.onPhoneConfFormOK} 
									onChancel={this.onPhoneConfFormChancel} 
									onShowError={this.props.onShowError}
									language={this.props.language}/>
			}
			//аватар
			var userPictureEditor;
			if(this.state.modeEdit) {
				var uploadBtnCaption;
				var delBtn;
				if(this.state.profile.picture.url != config.defaultProfilePictureUrl) {
					delBtn =	<span>
									&nbsp;&nbsp;
									<a href="javascript:void(0);"
										className="u-lnk-norm"
										onClick={this.handleDeleteProfilePicture}>
										{Utils.getStrResource({lang: this.props.language, code: "UI_BTN_DEL"})}
									</a>
								</span>
					uploadBtnCaption = Utils.getStrResource({lang: this.props.language, code: "UI_BTN_UPD"});
				} else {
					uploadBtnCaption = Utils.getStrResource({lang: this.props.language, code: "UI_BTN_ADD"});
				}
				userPictureEditor =	<div className="w-row u-row-descr">												
										<div className="w-col w-col-4 w-col-small-6 w-col-tiny-6">
											<div>{Utils.getStrResource({lang: this.props.language, code: "UI_FLD_USERPIC"})}</div>
										</div>
										<div className="w-col w-col-8 w-col-small-6 w-col-tiny-6">
											<ImageUpLoader language={this.props.language}
												onUpLoaded={this.handleUploadProfilePicture}
												style={ImageUpLoaderStyles.ANCOR}
												caption={uploadBtnCaption}
												single={true}
												preset="obj_ava"/>
											{delBtn}										
										</div>
									</div>
			}
			//имя пользователя
			var userName;
			if(this.state.modeEdit) {
				userName = <div className="w-row u-row-descr">												
							<div className="w-col w-col-4 w-col-small-6 w-col-tiny-6">
								<div>{Utils.getStrResource({lang: this.props.language, code: "UI_PLH_FIRST_NAME"})}  <span className="text-danger">*</span></div>
							</div>
							<div className="w-col w-col-8 w-col-small-6 w-col-tiny-6">
								<input className="w-input u-form-field rel"
									type="text"
									ref="firstName"
									id="firstName"
									value={this.state.profileTmp.firstName}
									placeholder={Utils.getStrResource({lang: this.props.language, code: "UI_PLH_FIRST_NAME"})}
									onChange={this.handleFormItemChange}/>
								<input className="w-input u-form-field rel"
									type="text"
									ref="lastName"
									id="lastName"
									value={this.state.profileTmp.lastName}
									placeholder={Utils.getStrResource({lang: this.props.language, code: "UI_PLH_LAST_NAME"})}
									onChange={this.handleFormItemChange}/>
							</div>
						</div>
			} else {
				userName =	<div className="u-block-owner addition2">
							<div className="u-t-center">
								{this.state.profile.lastName} {this.state.profile.firstName}
								<Rater total={5} rating={this.state.profile.rating}/>
							</div>
						</div>	
			}
			//пол
			var userGender;
			if(this.state.modeEdit) {
				userGender =	<div>
									<OptionsSelector view={OptionsSelectorView.SELECT}
										options={optionsFactory.buildOptions({
													language: this.props.language, 
													id: "gender",
													options: profileGender})}
										language={this.props.language}
										defaultOptionsState={this.state.profileTmp.gender}
										appendEmptyOption={true}
										emptyOptionLabel={Utils.makeEmptyOptionLabel(Utils.getStrResource({lang: this.props.language, code: "UI_FLD_GENDER"}))}
										onOptionChanged={Utils.bind(function (value) {this.handleFormItemChange({target: {id: "gender", value: value}})}, this)}/>
								</div>
			} else {
				userGender = <div><strong>{Utils.getStrResource({lang: this.props.language, code: this.state.profile.gender, searchUndefined: false})}</strong></div>
			}
			//почта
			var userMail;
			if(this.state.modeEdit) {
				userMail =	<div>
								<input className="w-input u-form-field"
									type="text"
									ref="email"
									id="email"
									disabled="disabled"
									value={this.state.profileTmp.email}
									placeholder={Utils.getStrResource({lang: this.props.language, code: "UI_PLH_MAIL"})}
									onChange={this.handleFormItemChange}/>
								<div className="w-checkbox">
									<input className="w-checkbox-input"
										type="checkbox"
										ref="emailNewsletter"
										id="emailNewsletter"
										onChange={this.handleFormItemChange.bind(this, {target: {id: "emailNewsletter", value: !this.state.profileTmp.emailNewsletter}})}
										checked={this.state.profileTmp.emailNewsletter}/>
									<label className="w-form-label" 
										onClick={this.handleFormItemChange.bind(this, {target: {id: "emailNewsletter", value: !this.state.profileTmp.emailNewsletter}})}>
										{Utils.getStrResource({lang: this.props.language, code: "UI_LBL_EMAIL_NEWS_LETTERS"})}		
									</label>
								</div>
								<div className="w-checkbox">
									<input className="w-checkbox-input"
										type="checkbox"
										ref="emailNotifications"
										id="emailNotifications"
										onChange={this.handleFormItemChange.bind(this, {target: {id: "emailNotifications", value: !this.state.profileTmp.emailNotifications}})}
										checked={this.state.profileTmp.emailNotifications}/>
									<label className="w-form-label" 
										onClick={this.handleFormItemChange.bind(this, {target: {id: "emailNotifications", value: !this.state.profileTmp.emailNotifications}})}>
										{Utils.getStrResource({lang: this.props.language, code: "UI_LBL_EMAIL_NOTIFICATIONS"})}										
									</label>
								</div>
							</div>
			} else {
				userMail = <div><strong>{this.state.profile.email}</strong></div>
			}
			//телефон
			var userPhone;
			if(this.state.modeEdit) {
				userPhone =	<div style={{display: "flex"}}>
								<OptionsSelector classes={"w-select u-form-field rel"}
										view={OptionsSelectorView.SELECT}
										options={optionsFactory.buildOptions({
													language: this.props.language, 
													id: "phonePrefix",
													labels: _.pluck(this.state.phoneCodes, "label"),
													options: _.pluck(this.state.phoneCodes, "code")})}
										language={this.props.language}
										defaultOptionsState={this.state.profileTmp.phonePrefix}
										appendEmptyOption={false}
										onOptionChanged={Utils.bind(function (value) {
											this.handleFormItemChange({target: {id: "phonePrefix", value: value}})}, this)
										}/>
								<input className="w-input u-form-field rel"
									type="text"
									ref="phone"
									id="phone"
									value={this.state.profileTmp.phone}
									placeholder={Utils.getStrResource({lang: this.props.language, code: "UI_PLH_PHONE"})}
									onChange={this.handleFormItemChange}/>
							</div>
			} else {
				var phoneState;
				if((this.state.profile.phone)&&(this.props.editable)) {
					if(this.state.profile.phoneStatus == ProfilePhoneState.unConfirmed) {
						phoneState = 	<a className="u-t-right u-lnk-norm" href="javascript:void(0);" onClick={this.handlePhoneConfClick}>
											{Utils.getStrResource({lang: this.props.language, code: "UI_BTN_PHONE_CONFIRM"})}
										</a>
					}
					if(this.state.profile.phoneStatus == ProfilePhoneState.confirmPending) {
						phoneState =	<a className="u-t-right u-lnk-norm" href="javascript:void(0);" onClick={this.handlePhoneConfClick}>
											{Utils.getStrResource({lang: this.props.language, code: "UI_BTN_PHONE_ENTER_CODE"})}
										</a>
					}
					if(this.state.profile.phoneStatus == ProfilePhoneState.confirmed) {
						phoneState = <span className="glyphicon glyphicon-ok u-t-green" title={Utils.getStrResource({lang: this.props.language, code: "UI_LBL_PHONE_CONFIRMED"})}></span>
					}
				}
				userPhone = <div><strong>{((this.state.profile.phone)?("+" + this.state.profile.phone):"")}</strong>&nbsp;{phoneState}</div>
			}
			//о себе
			var userDesc;
			if(this.state.modeEdit) {
				userDesc =	<div>
								<textarea className="w-input u-form-field"
									ref="description"
									id="description"
									value={this.state.profileTmp.description}
									placeholder={Utils.getStrResource({lang: this.props.language, code: "UI_PLH_ABOUT_ME"})}
									onChange={this.handleFormItemChange}>
								</textarea>
							</div>
			} else {
				userDesc = <div>{this.state.profile.description}</div>
			}
			//контроллер редактирования профиля
			var editControl;
			if(this.props.editable) {
				if(this.state.modeEdit) {
					editControl = 	<div>
										<button type="button" className="w-button u-btn-primary" onClick={this.handleOKEditClick}>
											{Utils.getStrResource({lang: this.props.language, code: "UI_BTN_OK"})}
										</button>
										<button type="button" className="w-button u-btn-regular" onClick={this.handleCancelEditClick}>
											{Utils.getStrResource({lang: this.props.language, code: "UI_BTN_CHANCEL"})}
										</button>
										<button type="button" className="w-button u-btn-regular" onClick={this.handleChPwdClick}>
											{Utils.getStrResource({lang: this.props.language, code: "UI_BTN_CHPWD"})}
										</button>
									</div>
				} else {
					editControl = 	<a className="u-t-right u-lnk-norm" href="javascript:void(0);" onClick={this.handleEditClick}>
										{Utils.getStrResource({lang: this.props.language, code: "UI_BTN_EDIT"})}
									</a>
				}
			}
			//код для заголовка
			var userProfileTitleCode = "UI_LBL_USER_PROFILE"
			if(this.props.editable) userProfileTitleCode = "UI_LBL_PROFILE";
			//блок информации для авторизованных пользователей
			var authOnlyInfo;
			if(this.props.session.loggedIn) {
				authOnlyInfo =	<div>
									<div className="w-row u-row-descr">												
										<div className="w-col w-col-4 w-col-small-6 w-col-tiny-6">
											<div>{Utils.getStrResource({lang: this.props.language, code: "UI_FLD_MAIL"})}</div>
										</div>
										<div className="w-col w-col-8 w-col-small-6 w-col-tiny-6">
											{userMail}													
										</div>
									</div>
									<div className="w-row u-row-descr">
										<div className="w-col w-col-4 w-col-small-6 w-col-tiny-6">
											<div>{Utils.getStrResource({lang: this.props.language, code: "UI_FLD_PHONE"})}</div>
										</div>
										<div className="w-col w-col-8 w-col-small-6 w-col-tiny-6">
											{userPhone}
										</div>
									</div>
								</div>
			}
			//финальная сборка содержимого
			content =	<div>
							{chPwdForm}
							{phoneConfForm}
							<div className="u-block-underline h3">
								<h3>{Utils.getStrResource({lang: this.props.language, code: userProfileTitleCode})}</h3>
							</div>
							<div className="u-block-owner addition2">
								<img className="u-img-author-m large" src={this.state.profile.picture.url}/>
							</div>
							{userPictureEditor}
							{userName}
							<div className="w-row u-row-descr">
								<div className="w-col w-col-4 w-col-small-6 w-col-tiny-6">
									<div>{Utils.getStrResource({lang: this.props.language, code: "UI_FLD_GENDER"})}</div>
								</div>
								<div className="w-col w-col-8 w-col-small-6 w-col-tiny-6">
									{userGender}													
								</div>
							</div>											
							{authOnlyInfo}
							<div className="w-row u-row-descr">
								<div className="w-col w-col-4 w-col-small-6 w-col-tiny-6">
									<div>{Utils.getStrResource({lang: this.props.language, code: "UI_FLD_ABOUT_ME"})}</div>
								</div>
								<div className="w-col w-col-8 w-col-small-6 w-col-tiny-6">
									{userDesc}
								</div>
							</div>
							<div className="w-row u-row-descr">
								<div className="w-col w-col-4 w-col-small-6 w-col-tiny-6">
									<div className="u-block-spacer"></div>
								</div>
								<div className="w-col w-col-8 w-col-small-6 w-col-tiny-6 w-clearfix">
									{editControl}
								</div>
							</div>
							<div className="u-block-owner addition"></div>
							<div className="empty"></div>			
						</div>
		}
		//генератор		
		return (
			<div>
				{content}				
			</div>
		);
	}
});