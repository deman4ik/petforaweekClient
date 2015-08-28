/*
	Регистрация
*/
var Register = React.createClass({
	//переменные окружения
	contextTypes: {
		router: React.PropTypes.func //ссылка на роутер
	},
	//состояние формы сброса пароля
	getInitialState: function () {
		return {
			mail: "", //E-Mail пользователя
			password: "", //пароль
			passwordConf: "", //подтверждение пароля
			noMailSpecified: false, //флаг отсутствия E-Mailа
			noPassSpecified: false, //флаг отсуствия пароля
			noPassConfSpecified: false, //флаг отсуствия подтверждения пароля
			badPassConfSpecified: false, //флаг некорректного подтверждения пароля
		}
	},
	//обработка результата регистрации
	handleRegister: function (result) {
		this.props.onHideProgress();
		if(result.TYPE == clnt.respTypes.STD) {
			this.props.onShowError(Utils.getStrResource({
					lang: this.props.language, 
					code: "CLNT_COMMON_ERROR"}), 
				result.MESSAGE
			);
		} else {
			this.context.router.transitionTo("confirm", null, {userId: result.MESSAGE.data[0]});
		}
	},
	//регистрация в системе
	register: function () {
		try {
			var auth = authFactory.build({
				language: this.props.language,
				userName: this.state.mail,
				userPass: this.state.password
			});
			auth.language = this.props.language;
			var regData = authFactory.buildRegister(auth);
			this.props.onDisplayProgress(Utils.getStrResource({
				lang: this.props.language, 
				code: "CLNT_COMMON_PROGRESS"
			}));
			clnt.register({language: this.props.language, data: regData}, this.handleRegister);	
		} catch (e) {
			this.props.onShowError(Utils.getStrResource({
					lang: this.props.language, 
					code: "CLNT_COMMON_ERROR"}),
				e.message
			);
		}			
	},
	//инициализация при подключении компонента к странице
	componentDidMount: function () {
	},
	//обновление свойств компонента
	componentWillReceiveProps: function (newProps) {
	},
	//обработка изменения поля формы регистрации
	handleFormItemChange: function (e) {
		var tmp = {};
		_.extend(tmp, this.state);
		tmp[e.target.id] = e.target.value;
		this.setState(tmp);		
	},
	//выполнение регистрации
	checkPrmsAndRegister: function (doConfirm) {
		var tmpState = {}
		_.extend(tmpState, this.state);
		tmpState.noCodeSpecified = false; 
		tmpState.noPassSpecified = false;
		tmpState.noPassConfSpecified = false;
		tmpState.badPassConfSpecified = false;
		if(
			(this.state.mail)&&
			(this.state.password)&&
			(this.state.passwordConf)&&
			(this.state.password == this.state.passwordConf)
		) {
			this.setState(tmpState, this.register);
		} else {
			if(!this.state.mail) tmpState.noMailSpecified = true;
			if(!this.state.password) tmpState.noPassSpecified = true;
			if(!this.state.passwordConf) tmpState.noPassConfSpecified = true;
			if(this.state.password != this.state.passwordConf) tmpState.badPassConfSpecified = true;
			this.setState(tmpState);
		}
	},	
	//обработка кнопки "Регистрация"
	handleRegisterClick: function () {
		this.checkPrmsAndRegister();				
	},
	//отработка нажатия на отмену формы регистрации
	handleCancelClick: function () {
		if(!this.context.router.goBack()) {
			this.context.router.transitionTo("main");
		}
	},
	//генерация представления формы регистрации
	render: function () {
		//содержимое формы
		var cMailInput = React.addons.classSet;
		var classesMailInput = cMailInput({
			"w-input": true,
			"u-form-field": true,
			"has-error": this.state.noMailSpecified
		});
		var cPassInput = React.addons.classSet;
		var classesPassInput = cPassInput({
			"w-input": true,
			"u-form-field": true,
			"has-error": this.state.noPassSpecified
		});
		var cPassConfInput = React.addons.classSet;
		var classesPassConfInput = cPassConfInput({
			"w-input": true,
			"u-form-field": true,
			"has-error": ((this.state.noPassConfSpecified)||(this.state.badPassConfSpecified))
		});
		var content =	<div>
						<div className="w-row">
							<div className="w-col w-col-3">
								<label className="u-form-label n1">
									{Utils.getStrResource({lang: this.props.language, code: "UI_FLD_USER"})}:
								</label>
								<div className="u-t-small">
									{Utils.getStrResource({lang: this.props.language, code: "UI_NOTE_USER"})}
								</div>
							</div>
							<div className="w-col w-col-9">
								<input className={classesMailInput}
									placeholder={Utils.getStrResource({lang: this.props.language, code: "UI_PLH_USER"})}
									type="text" 
									ref="mail" 
									id="mail"
									value={this.state.mail}
									onChange={this.handleFormItemChange}/>
							</div>
						</div>
						<div className="w-row">
							<div className="w-col w-col-3">
								<label className="u-form-label n1">{Utils.getStrResource({lang: this.props.language, code: "UI_FLD_NEW_PASS"})}:</label>									
							</div>
							<div className="w-col w-col-9">
								<input className={classesPassInput}
									placeholder={Utils.getStrResource({lang: this.props.language, code: "UI_PLH_NEW_PASS"})}
									type="password" 
									ref="password" 
									id="password"
									value={this.state.password}
									onChange={this.handleFormItemChange}/>
							</div>
						</div>
						<div className="w-row">
							<div className="w-col w-col-3">
								<label className="u-form-label n1">{Utils.getStrResource({lang: this.props.language, code: "UI_FLD_NEW_PASS_CONF"})}:</label>									
							</div>
							<div className="w-col w-col-9">
								<input className={classesPassConfInput}
									placeholder={Utils.getStrResource({lang: this.props.language, code: "UI_PLH_NEW_PASS_CONF"})}
									type="password" 
									ref="passwordConf" 
									id="passwordConf"
									value={this.state.passwordConf}
									onChange={this.handleFormItemChange}/>
							</div>
						</div>
						<div className="u-block-spacer"></div>
						<div className="u-block-spacer"></div>										
						<input className="w-button u-btn-primary"
							type="button"
							value={Utils.getStrResource({lang: this.props.language, code: "UI_BTN_OK"})}
							onClick={this.handleRegisterClick}/>
						<input className="w-button u-btn-regular"
							type="button"
							value={Utils.getStrResource({lang: this.props.language, code: "UI_BTN_CHANCEL"})}
							onClick={this.handleCancelClick}/>
					</div>
		//генератор		
		return (
			<div className="w-section">
				<div className="w-container">
					<div className="u-block-underline h3">
						<h3>{Utils.getStrResource({lang: this.props.language, code: "UI_TITLE_REGISTER"})}</h3>
					</div>
					<div className="w-form">
						<form className="w-clearfix" id="regConfForm">
							<div className="u-block-spacer"></div>
							<div className="u-block-spacer"></div>
							{content}
						</form>
					</div>
				</div>
			</div>
		);
	}
});