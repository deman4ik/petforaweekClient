/*
	Поиск объявлений
*/
var PostsSearch = React.createClass({
	//состояние
	getInitialState: function () {
		return {
		}
	},
	//инициализация при подключении компонента к странице
	componentDidMount: function () {
	},
	//обновление свойств компонента
	componentWillReceiveProps: function (newProps) {
	},
	//генерация представления класса
	render: function () {
		//генератор		
		return (
				<Posts mode={PostsModes.SEARCH}
					session={this.props.session}
					onLogIn={this.props.onLogIn}
					onDisplayProgress={this.props.onDisplayProgress}
					onHideProgress={this.props.onHideProgress}
					onShowError={this.props.onShowError}
					language={this.props.language}/>
		);
	}
});