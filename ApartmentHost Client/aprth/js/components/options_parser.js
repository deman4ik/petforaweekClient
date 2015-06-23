/*
	Компонент для разбора и выдачи списка опций (в строке с разделителем)
*/
//способы представления списка опций
var OptionsParserView = {
	LIST: "list", //список вертикальный
	ROW: "row" //строка горизогтальная
}
//способы конвертации опций
var OptionsParserConvert = {
	NO_CONVERT: "no", //не конвертировать
	DO_CONVERT: "yes" //конвертировать
}
//парсер опций
var OptionsParser = React.createClass({
	//формирование представления
	render: function () {
		//представление списка
		var view;
		if(this.props.view) {
			view = this.props.view;
		} else {
			view = OptionsParserView.ROW;
		}
		//заголовок списка
		var title;
		if(this.props.title) {
			switch(view) {
				case(OptionsParserView.LIST): {
					title = <div className="descr">{this.props.title}</div>;
					break;
				}
				case(OptionsParserView.ROW): {
					title = this.props.title;
					break;
				}
				default: {
					title = this.props.title;
				}
			}			
		}
		//стиль списка
		var listStyle;
		if(this.props.listStyle) {
			listStyle = this.props.listStyle;
		}
		//разделитель элементов в строке
		var rowSeparator;
		if(this.props.rowSeparator) {
			rowSeparator = this.props.rowSeparator;
		} else {
			rowSeparator = ","
		}
		//формирование представления списка опций
		var options;
		var convertOptions;
		if(this.props.convertOptions) {
			convertOptions = this.props.convertOptions;
		} else {
			convertOptions = OptionsParserConvert.DO_CONVERT;
		}		
		if((this.props.options)&&(Array.isArray(this.props.options))) {
			var optionsLength = this.props.options.length;
			var optionsItems = this.props.options.map(function (option, i) {
				var optionsItem;
				switch(view) {
					case(OptionsParserView.LIST): {
						optionsItem = 	<li>
											{(convertOptions == OptionsParserConvert.DO_CONVERT)?Utils.getStrResource({lang: this.props.language, code: option}):option}
										</li>
						break;
					}
					case(OptionsParserView.ROW): {
						optionsItem = (convertOptions == OptionsParserConvert.DO_CONVERT)?Utils.getStrResource({lang: this.props.language, code: option}):option;
						if(i < (optionsLength - 1)) optionsItem += rowSeparator + " ";
						break;
					}				
					default: {
						optionsItem = ((convertOptions == OptionsParserConvert.DO_CONVERT)?Utils.getStrResource({lang: this.props.language, code: option}):option) + this.props.rowSeparator + " ";
						if(i < (optionsLength - 1)) optionsItem += rowSeparator + " ";
					}
				}
				return (
					{optionsItem}			
				);
			}, this);
			switch(view) {
				case(OptionsParserView.LIST): {					
					options = 	<div>
									{title}
									<ul className="descr" style={listStyle}>
										{optionsItems}								
									</ul>
								</div>
					break;
				}
				case(OptionsParserView.ROW): {
					options = {optionsItems}
					break;
				}				
				default: {
					options = {optionsItems}
				}
			}
		}
		return (
			<span>{options}</span>
		);
	}
});