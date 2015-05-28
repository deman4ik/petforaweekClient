/*
	Сообщение в теле страницы
*/
var InLineMessage = React.createClass({
	//генерация представления сообщения
	render: function () {		
		//классы текста сообщения
		var cText = React.addons.classSet;
		var classesText = cText({
			"inline-message": true,
			"text-danger": (this.props.type == Utils.getMessageTypeErr()),
			"text-success": (this.props.type == Utils.getMessageTypeInf())
		});
		//финальная сборка представления
		return (
			<h1 className={classesText}>{this.props.message}</h1>
		);
	}
});