/*
	Объявления
*/
//фильтр объявлений
var getPostsFilter = function () {
	var tmpFilter = {
		useRadius: "", //искать в радиусе
		radius: config.searchRadius, //радиус поиска по карте
		latitude: "", //широта выбранной точки поиска
		longitude: "", //долгота выбранной точки поиска
		address: "", //адрес жилья		
		swLat: "", //широта ЮВ угла квадрата поиска по выбранной точке
		swLong: "", //долгота ЮВ угла квадрата поиска по выбранной точке
		neLat: "", //широта СЗ угла квадрата поиска по выбранной точке
		neLong: "", //долгота СЗ угла квадрата поиска по выбранной точке
		dFrom: "", //дата начала периода бронирования
		dTo: "", //дата коночания периода бронирования
		sex: "", //пол постояльца
		apartType: "", //тип жилья
		priceFrom: "", //цена с
		priceTo: "", //цена по
		price: "" //цена (сводное состояние)
	}
	return tmpFilter;	
};
//режимы работы клсса объявлений
var PostsModes = {
	FAVORITES: "favorites", //режим избранного
	SEARCH: "search" //режим поиска
}
//состояние объявлений по умолчанию
var resetProsts = function () {
	return {
		adverts: [], //список объявлений
		markers: [], //список маркеров для карты
		advertsCnt: 0, //количество отображаемых объявлений
		advertsTotalCnt: 0, //общее количество найденных объявлений
		advertsReady: false, //флаг доступности списка объявлений для отображения
		filterIsSet: false, //флаг установленности фильтра			
		filterClnt: getPostsFilter(), //текущее состояние фильтра
		filter: {}, //текущее состояние фильтра	(для сервера)
		mapZoom: config.searchMapZoom, //масштаб карты по умолчанию
		mapZoomReset: false, //признак сброса масштаба карты к значению по умолчанию
		mapBounds: { //текущее состояние карты (границы)
			latitude: "", //широта центра области карты
			longitude: "", //долгота центра области карты
			swLat: "", //широта ЮВ угла области карты
			swLong: "", //долгота ЮВ угла области карты
			neLat: "", //широта СЗ угла области карты
			neLong: "", //долгота СЗ угла области карты
		},
		page: 1, //текущая страница выдачи
		pagesToSkip: null //количество пропускаемых страниц		
	}
}
//класс объявлений
var Posts = React.createClass({
	//переменные окружения
	contextTypes: {
		router: React.PropTypes.func //ссылка на роутер
	},	
	//состояние
	getInitialState: function () {
		return resetProsts()
	},
	//расчет "цены за период" объявлений по датам
	calcAdvertsPricePeriod: function (adverts) {
		var hlC = this.state.filterClnt.sex;
		if((adverts)&&(Array.isArray(adverts))) {
			if((this.state.filterClnt.dFrom)&&(this.state.filterClnt.dTo)&&(hlC)) {
				var dFrom = new Date(this.state.filterClnt.dFrom);
				var dTo = new Date(this.state.filterClnt.dTo);
				adverts.map(function (item, i) {
					var pr = _.findWhere(item.genders, {name: hlC});					
					if(pr) {
						item.pricePeriod = pr.price * 1 * Utils.daysBetween(dFrom, dTo);
						item.higlightPriceCat = hlC;
					} else {
						item.pricePeriod = 0;
						item.higlightPriceCat = hlC;
					}
				});
			} else {
				if((this.state.filterClnt.dFrom)&&(this.state.filterClnt.dTo)) {
					var dFrom = new Date(this.state.filterClnt.dFrom);
					var dTo = new Date(this.state.filterClnt.dTo);				
					adverts.map(function (item, i) {
						item.pricePeriod = _.min(_.pluck(item.genders, "price")) * 1 * Utils.daysBetween(dFrom, dTo);
						item.higlightPriceCat = hlC;
					});
				} else {
					adverts.map(function (item, i) {
						item.pricePeriod = 0;
						item.higlightPriceCat = hlC;
					});
				}
			}
		}
	},
	//получение данных объявлений от сервера
	handleSearchResult: function (resp) {
		this.props.onHideProgress();
		if(resp.STATE == clnt.respStates.ERR) {
			this.props.onShowError(Utils.getStrResource({lang: this.props.language, code: "CLNT_COMMON_ERROR"}), resp.MESSAGE);
		} else {
			var markers = [];
			var adverts = [];
			if(this.state.page > 1) {
				_.extend(markers, this.state.markers);
				_.extend(adverts, this.state.adverts);
			}
			//обработаем ответ в зависимости от режима
			switch(this.props.mode) {
				//режим поиска
				case(PostsModes.SEARCH): {					
					//наделаем маркеров для карты
					resp.MESSAGE.cards.map(function (item, i) {
						if((item.apartment.latitude)&&(item.apartment.longitude)) {
							var link = "#/posts/" + item.id;
							var linkQ = "";
							if((this.state.filterClnt.dFrom)&&(this.state.filterClnt.dTo)) {								
								linkQ += ((linkQ == "")?"":"&") + "dFrom=" + this.state.filterClnt.dFrom + "&dTo=" + this.state.filterClnt.dTo;
							}
							if(this.state.filterClnt.sex) {
								linkQ += ((linkQ == "")?"":"&") + "priceCat=" + this.state.filterClnt.sex;
							}							
							link += (linkQ == "")?"":"?" + linkQ;
							var content = "<div>" +
								"<b>" + Utils.getStrResource({lang: this.props.language, code: item.apartment.type}) + "</b><br/>" + 
								"<a href='" + link + "'>" +
								"<img class='u-img-author-review' src='" + item.user.picture.large + "'/><br/>" +
								(item.user.lastName?(item.user.lastName + " "):"") + item.user.firstName + "<br/>" +								
								Utils.getStrResource({lang: this.props.language, code: "UI_LBL_FROM"}) + " " + item.priceDay + " " + Utils.getStrResource({lang: this.props.language, code: "CURRENCY"}) + "/" +
								Utils.getStrResource({lang: this.props.language, code: "UI_LBL_PERIOD_DAY"}) + 
								"</a>" +
								"</div>";							 
							markers.push({
								latitude: item.apartment.latitude,
								longitude: item.apartment.longitude,
								title: item.apartment.name,
								content: content
							});
						}
					}, this);
					//если это поиск, то необходимо расчитать цену за период для каждого объявления
					this.calcAdvertsPricePeriod(resp.MESSAGE.cards);					
				}
				//режим избранного
				case(PostsModes.FAVORITES): {
					//для избранного - просто затираем цену за период
					this.calcAdvertsPricePeriod(resp.MESSAGE.cards);
					break;
				}
				//прочие режимы
				default: {}
			}
			//добавим полученные объявления к существующим
			resp.MESSAGE.cards.map(function (item, i) {
				adverts.push(item);
			});			
			//теперь выставляем состояние компоненты
			this.setState({adverts: adverts, advertsCnt: adverts.length, markers: markers, advertsReady: true, filterIsSet: true, advertsTotalCnt: resp.MESSAGE.count});
		}
	},
	//получение ответа о смене статуса в избранном
	handleFavorChange: function (resp, itemId) {
		if(resp.STATE == clnt.respStates.ERR) {
			this.props.onShowError(Utils.getStrResource({lang: this.props.language, code: "CLNT_COMMON_ERROR"}), resp.MESSAGE);
		} else {
			var advTmp = this.state.adverts;
			var advLengthTmp = this.state.advertsCnt;
			//обработаем ответ в зависимости от режима
			switch(this.props.mode) {
				//режим поиска
				case(PostsModes.SEARCH): {
					_.where(advTmp, {id: itemId})[0].isFavorite = resp.MESSAGE.data[0];
					break;
				}
				//режим избранного
				case(PostsModes.FAVORITES): {
					advTmp = _.without(advTmp, _.findWhere(advTmp, {id: itemId}));
					advLengthTmp --;
					break;
				}
				//прочие режимы
				default: {}
			}
			this.setState({adverts: advTmp, advertsCnt: advLengthTmp});
		}
	},
	//изменение состояния элемента в избранном
	toggleAdvertFavor: function (itemId) {
		var self = this;
		var togglePrms = {
			language: this.props.language, 
			postId: itemId, 
			session: this.props.session.sessionInfo
		}
		clnt.toggleAdvertFavor(togglePrms, function (resp) {self.handleFavorChange(resp, itemId)});
	},
	//сохранение фильтра
	saveFilterState: function () {
		Utils.deleteObjectState("filterParams");
		Utils.saveObjectState("filterParams", this.state.filterClnt);
	},
	//загрузка сохраненного фильтра
	loadFilterState: function (callBack) {
		var filterParams = Utils.loadObjectState("filterParams");
		var filterClntNew = {};
		_.extend(filterClntNew, this.state.filterClnt);
		_.extend(filterClntNew, filterParams);
		if(filterParams) {
			if((!config.useSearchRadar)||(filterClntNew.useRadius != PostsFilterPrms.postFilterUseRadius)) {
				filterClntNew.radius = config.searchRadius;
				this.setState({filterClnt: filterClntNew}, Utils.bind(function () {
					this.recalcSearchArea(callBack);
				}, this));					
			} else {
				this.setState({filterClnt: filterClntNew}, callBack);
			}
		} else {
			callBack();
		}	
	},
	//формирование фильтра для передачи на сервер
	buildSrvAdvertsFilter: function () {
		var serverFilter = {};
		if(this.state.filterClnt.address) serverFilter.adress = this.state.filterClnt.address;
		if(this.state.filterClnt.swLat) serverFilter.swLat = this.state.filterClnt.swLat;
		if(this.state.filterClnt.swLong) serverFilter.swLong = this.state.filterClnt.swLong;
		if(this.state.filterClnt.neLat) serverFilter.neLat = this.state.filterClnt.neLat;
		if(this.state.filterClnt.neLong) serverFilter.neLong = this.state.filterClnt.neLong;
		if(this.state.filterClnt.sex) serverFilter.genders = [this.state.filterClnt.sex];
		if(this.state.filterClnt.dFrom) serverFilter.availableDateFrom = this.state.filterClnt.dFrom;
		if(this.state.filterClnt.dFrom) serverFilter.availableDateTo = this.state.filterClnt.dTo;
		if(this.state.filterClnt.priceFrom) serverFilter.priceDayFrom = this.state.filterClnt.priceFrom;
		if(this.state.filterClnt.priceTo) serverFilter.priceDayTo = this.state.filterClnt.priceTo;
		if(this.state.filterClnt.apartType) serverFilter.type = [this.state.filterClnt.apartType];
		return serverFilter;
	},
	//пересчет области поиска
	recalcSearchArea: function (callBack)  {
		var tmp = {};
		_.extend(tmp, this.state.filterClnt);
		if((tmp.latitude)&&(tmp.longitude)&&(tmp.radius)&&(tmp.useRadius == PostsFilterPrms.postFilterUseRadius)) {
			var c = new google.maps.Circle({center: new google.maps.LatLng(tmp.latitude, tmp.longitude), radius: tmp.radius});
			var bounds = c.getBounds();			
			tmp.swLat = bounds.getSouthWest().lat();
			tmp.swLong = bounds.getSouthWest().lng();
			tmp.neLat = bounds.getNorthEast().lat();
			tmp.neLong = bounds.getNorthEast().lng();
		}
		if(tmp.useRadius != PostsFilterPrms.postFilterUseRadius) {
			tmp.swLat = this.state.mapBounds.swLat;
			tmp.swLong = this.state.mapBounds.swLong;
			tmp.neLat = this.state.mapBounds.neLat;
			tmp.neLong = this.state.mapBounds.neLong;
		}
		this.setState({filterClnt: tmp}, callBack);		
	},
	//поиск и фильтрация
	findAndFilter: function (sessionInfo) {
		if(this.state.filterIsSet) {
			var srvFilter = this.buildSrvAdvertsFilter();
			if((srvFilter.swLat)&&(srvFilter.swLong)&&(srvFilter.neLat)&&(srvFilter.neLong)) {
				this.setState({mapZoomReset: false});
				if(this.state.pagesToSkip) {
					srvFilter.limit = this.state.pagesToSkip * config.searchPageSize; 
					srvFilter.skip = 0;
					this.setState({page: this.state.pagesToSkip, pagesToSkip: null});					
				} else {
					srvFilter.limit = config.searchPageSize; 
					srvFilter.skip = (this.state.page - 1) * config.searchPageSize;
				}
				this.props.onDisplayProgress(Utils.getStrResource({lang: this.props.language, code: "CLNT_COMMON_PROGRESS"}));			
				var getPrms = {
					language: this.props.language, 
					filter: srvFilter, 
					session: (sessionInfo)?sessionInfo:this.props.session.sessionInfo
				}
				clnt.getAdverts(getPrms, this.handleSearchResult);
			}
		}
	},
	//загрузка избранного
	loadFavorits: function () {
		if(this.props.session.loggedIn) {
			this.props.onDisplayProgress(Utils.getStrResource({lang: this.props.language, code: "CLNT_COMMON_PROGRESS"}));
			var getPrms = {
				language: this.props.language, 
				filter: {isFavoritedUserId: this.props.session.sessionInfo.user.profile.id},
				session: this.props.session.sessionInfo
			}
			clnt.getAdverts(getPrms, this.handleSearchResult);
		}
	},
	//смена параметров поиска
	onFindChange: function (find, callBack) {
		var recalcSA = false;
		var tmp = {};
		_.extend(tmp, this.state.filterClnt);
		if(
			(this.state.filterClnt.latitude != find.latitude)||
			(this.state.filterClnt.longitude != find.longitude)||
			(this.state.filterClnt.address != find.address)
		) recalcSA = true;
		tmp.latitude = find.latitude;
		tmp.longitude = find.longitude;
		tmp.address = find.address;
		tmp.dFrom = find.dFrom;
		tmp.dTo = find.dTo;
		tmp.sex = find.sex;
		this.setState({filterClnt: tmp}, function () {
			this.saveFilterState();
			if(recalcSA) {
				this.recalcSearchArea(callBack);
			} else {
				if((callBack)&&(Utils.isFunction(callBack))) callBack();
			}
		});		
	},
	//смена параметров фильтра
	onFilterChange: function (filter) {
		var recalcSA = false;
		var tmp = {};
		_.extend(tmp, this.state.filterClnt);
		if(
			(this.state.filterClnt.radius != filter.radius)||
			(this.state.filterClnt.useRadius != filter.useRadius)
		) recalcSA = true;
		tmp.useRadius = filter.useRadius;
		tmp.radius = filter.radius;
		tmp.apartType = filter.apartType;
		tmp.priceFrom = filter.priceFrom;
		tmp.priceTo = filter.priceTo;
		tmp.price = filter.price;
		this.setState({filterClnt: tmp, page: 1}, function () {
			this.saveFilterState();
			if(recalcSA) {
				this.recalcSearchArea(this.findAndFilter);
			} else {
				this.findAndFilter();
			}						
		});	
	},
	//нажатие на поиск
	onFind: function (find) {
		this.setState({filterIsSet: true, mapZoomReset: true, page: 1}, Utils.bind(function () {			
			this.onFindChange(find, this.findAndFilter);
		}, this));
	},
	//нажатие на очистку поиска
	onFindClear: function () {
		var tmp = {};
		_.extend(tmp, this.state.filterClnt);
		tmp.useRadius = PostsFilterPrms.postFilterUseRadius;
		tmp.radius = config.searchRadius;
		tmp.latitude = "";
		tmp.longitude = "";
		tmp.address = "";
		tmp.swLat = "";
		tmp.swLong = "";
		tmp.neLat = "";
		tmp.neLong = "";
		tmp.dFrom = "";
		tmp.dTo = "";
		tmp.sex = "";
		tmp.apartType = "";
		tmp.priceFrom = "";
		tmp.priceTo = "";
		tmp.price = "";
		this.setState({filterClnt: tmp, adverts: [], advertsCnt: 0, advertsReady: false, markers: [], filterIsSet: false, page: 1}, function () {
			this.saveFilterState();
		});
	},
	//нажатие на кнопку избранного
	onFavorChange: function (itemId) {
		if(this.props.session.loggedIn)
			this.toggleAdvertFavor(itemId);
		else
			this.props.onLogIn({
				actionType: AppAfterAuthActionTypes.CALLBACK, 
				actionPrms: {callBack: this.toggleAdvertFavor, prms: itemId}
			});
	},
	//нажатие на элемент списка
	onItemClick: function (itemId) {
		var query = {};
		//соберем запрос на переход от режима работы
		switch(this.props.mode) {
			//поиск
			case(PostsModes.SEARCH): {
				if(this.state.filterClnt.dFrom) query.dFrom = this.state.filterClnt.dFrom;
				if(this.state.filterClnt.dTo) query.dTo = this.state.filterClnt.dTo;
				if(this.state.filterClnt.sex) query.priceCat = this.state.filterClnt.sex;
				break;
			}
			//избранное
			case(PostsModes.FAVORITES): {
				break;
			}
			//прочие режимы
			default: {}
		}
		this.context.router.transitionTo("post", {postId: itemId}, query);
	},
	//смена радиуса поиска на карте
	handleMapRadarRadiusChanged: function (radius) {		
		var tmp = {};
		_.extend(tmp, this.state.filterClnt);
		tmp.radius = radius;		
		this.setState({filterClnt: tmp, page: 1}, function () {
			this.saveFilterState();
			this.recalcSearchArea(this.findAndFilter);
		});
	},
	//смена места радиуса поиска на карте
	handleMapRadarPlaceChanged: function (newPlace) {
		var tmp = {};
		_.extend(tmp, this.state.filterClnt);
		tmp.latitude = newPlace.center.lat();
		tmp.longitude = newPlace.center.lng();
		tmp.address = newPlace.address;
		this.setState({filterClnt: tmp, page: 1}, function () {
			this.saveFilterState();
			this.recalcSearchArea(this.findAndFilter);
		});		
	},
	//смена границ карты
	handleMapBoundsChange: function (newBounds) {
		if((newBounds)&&(!this.state.filterClnt.useRadius)) {
			var tmp = {};
			var mbTmp = {};
			_.extend(tmp, this.state.filterClnt);
			_.extend(mbTmp, this.state.mapBounds);
			tmp.latitude = newBounds.getCenter().lat();
			tmp.longitude = newBounds.getCenter().lng();
			tmp.swLat = newBounds.getSouthWest().lat();
			tmp.swLong = newBounds.getSouthWest().lng();
			tmp.neLat = newBounds.getNorthEast().lat();
			tmp.neLong = newBounds.getNorthEast().lng();
			mbTmp.latitude = newBounds.getCenter().lat();
			mbTmp.longitude = newBounds.getCenter().lng();
			mbTmp.swLat = newBounds.getSouthWest().lat();
			mbTmp.swLong = newBounds.getSouthWest().lng();
			mbTmp.neLat = newBounds.getNorthEast().lat();
			mbTmp.neLong = newBounds.getNorthEast().lng();
			this.setState({filterClnt: tmp, mapBounds: mbTmp, page: 1, mapZoom: newBounds.zoom}, function () {
				this.saveFilterState();
				this.findAndFilter();
			});
		}
	},
	//обработка нажатия на кнопку догрузки
	handleMoreClick: function () {
		var nextPage = this.state.page + 1;
		Utils.saveObjectState("pagesDisplayed", nextPage);
		this.setState({page: nextPage}, this.findAndFilter);
	},
	//инициализация при подключении компонента к странице (до)
	componentWillMount: function () {
		var pDspl = Utils.loadObjectState("pagesDisplayed");
		var mZoom = Utils.loadObjectState("mapZoom");
		this.setState({
			pagesToSkip: pDspl, 
			mapZoom: (mZoom||config.searchMapZoom)
		});
		Utils.deleteObjectState("pagesDisplayed");
		Utils.deleteObjectState("mapZoom");
	},
	//инициализация при подключении компонента к странице (после)
	componentDidMount: function () {
		//инициализируем в зависимости от режима работы
		switch(this.props.mode) {
			//режим поиска
			case(PostsModes.SEARCH): {				
				$(".nano").nanoScroller();
				
				this.loadFilterState(Utils.bind(function () {
					if(!$.isEmptyObject(this.buildSrvAdvertsFilter())) {
						this.setState({filterIsSet: true, page: 1}, this.findAndFilter);
					}
				}, this));
				break;
			}
			//режим избранного
			case(PostsModes.FAVORITES): {
				this.loadFavorits();				
				break;
			}
			//прочие режимы
			default: {}
		};
		Utils.fixFooter();
	},
	//завершение генерации/обновления представления компонента
	componentDidUpdate: function (prevProps, prevState) {
		Utils.fixFooter();		
		$(".nano").nanoScroller();
	},
	//отключение компонента от страницы
	componentWillUnmount: function () {
		Utils.saveObjectState("pagesDisplayed", this.state.page);
		Utils.saveObjectState("mapZoom", this.state.mapZoom);
	},
	//обновление свойств компонента
	componentWillReceiveProps: function (newProps) {
		//если произошел выход
		if((!newProps.session.loggedIn)&&(this.props.session.loggedIn)) {
			//работаем в зависимости от режима работы
			switch(this.props.mode) {
				//режим поиска
				case(PostsModes.SEARCH): {
					//выполним повторный поиск если есть что искать
					this.setState({page: 1}, Utils.bind(function() {
						this.findAndFilter(newProps.session.sessionInfo);
					}, this));
					break;
				}
				//режим избранного
				case(PostsModes.FAVORITES): {
					break;
				}
				//прочие режимы
				default: {}
			};
		}
		//если произошел вход
		if((newProps.session.loggedIn)&&(!this.props.session.loggedIn)) {
			//работаем в зависимости от режима работы
			switch(this.props.mode) {
				//режим поиска
				case(PostsModes.SEARCH): {
					//выполним повторный поиск если есть что искать
					this.findAndFilter(newProps.session.sessionInfo);
					break;
				}
				//режим избранного
				case(PostsModes.FAVORITES): {
					//просто сброс и загрузка списка избранного
					this.setState(resetProsts(), this.loadFavorits);
					break;
				}
				//прочие режимы
				default: {}
			};
		};
	},
	//генерация представления класса
	render: function () {
		//финальное содержимое
		var content;
		//собираем компонент от режима
		switch(this.props.mode) {
			//режим поиска
			case(PostsModes.SEARCH): {
				//форма поиска
				var postsFindForm =	<PostsFindForm language={this.props.language}										
										latitude={this.state.filterClnt.latitude}
										longitude={this.state.filterClnt.longitude}
										address={this.state.filterClnt.address}
										dFrom={this.state.filterClnt.dFrom}
										dTo={this.state.filterClnt.dTo}
										sex={this.state.filterClnt.sex}
										onShowError={this.props.onShowError}
										onFind={this.onFind}
										onFindClear={this.onFindClear}/>
				//форма фильтра
				var postsFilterForm =	<PostsFilterForm language={this.props.language}											
											useRadius={this.state.filterClnt.useRadius}
											radius={this.state.filterClnt.radius}
											apartType={this.state.filterClnt.apartType}											
											priceFrom={this.state.filterClnt.priceFrom}											
											priceTo={this.state.filterClnt.priceTo}
											price={this.state.filterClnt.price}
											onFilterChange={this.onFilterChange}/>
				//счетчик результатов поиска
				var postsSearchCounter;
				if((this.state.filterIsSet)&&(this.state.advertsReady)) {
					postsSearchCounter = <PostsSearchCounter language={this.props.language} cntFound={this.state.advertsTotalCnt} cntDspl={this.state.advertsCnt}/>
				}
				//карта
				var map;				
				map =	<Map latitude={this.state.filterClnt.latitude}
							longitude={this.state.filterClnt.longitude}							
							radius={this.state.filterClnt.radius}
							address={this.state.filterClnt.address}
							markers={this.state.markers}
							mode={mapModes.modeGroup}
							zoom={this.state.mapZoom}
							zoomReset={this.state.mapZoomReset}
							showRadar={(this.state.filterClnt.useRadius == PostsFilterPrms.postFilterUseRadius)?true:false}
							onSearchRadarRadiusChange={this.handleMapRadarRadiusChanged}
							onSearchRadarPlaceChange={this.handleMapRadarPlaceChanged}
							onMapBoundsChange={this.handleMapBoundsChange}/>
				//список объявлений
				var postsList;
				if((this.state.advertsReady)&&(this.state.advertsCnt > 0)) {
					postsList = <PostsList onFavorChange={this.onFavorChange}
									onItemClick={this.onItemClick}
									language={this.props.language}
									items={this.state.adverts}
									mode={this.props.mode}
									session={this.props.session}/>
				}
				//кнопка догрузки результата
				var loadMoreBtn;
				if((this.state.advertsTotalCnt > this.state.advertsCnt)&&(this.state.advertsReady)&&(this.state.advertsCnt > 0)) {					
					loadMoreBtn =	<input className="w-button u-btn-primary block" 
					                     type="button" 
					                     onClick={this.handleMoreClick}
										           value={Utils.getStrResource({lang: this.props.language, code: "UI_BTN_MORE"})}>
									      </input>
				}
				//соберем финальный вид компонента
				content =	<div className="w-section u-sect-page-cardlst">
								<div>
									{postsFindForm}					
								</div>
								<div className="w-row">
									<div className="w-col w-col-7 w-col-stack u-col-cardlst1">
									  <div className="nano has-scrollbar">
										  <div className="nano-content">
										  		{postsSearchCounter}
												{postsFilterForm}		
												{postsList}
												<div className="u-block-spacer"></div>
												{loadMoreBtn}
											</div>		
										</div>	
									</div>
									<div className="w-col w-col-5 w-col-stack u-col-cardlst2">
										{map}
									</div>									
								</div>	
							</div>
				break;
			}
			//режим избранного
			case(PostsModes.FAVORITES): {
				//список объявлений
				var postsList;
				if(this.props.session.loggedIn) {
					if((this.state.advertsReady)&&(this.state.advertsCnt > 0)) {
						postsList = <PostsList onFavorChange={this.onFavorChange}
										onItemClick={this.onItemClick}
										language={this.props.language}
										items={this.state.adverts}
										mode={this.props.mode}
										session={this.props.session}/>
					} else {
						if((this.state.advertsReady)&&(this.state.advertsCnt == 0)) {				
							postsList =	<InLineMessage type={Utils.getMessageTypeInf()} 
											message={Utils.getStrResource({lang: this.props.language, code: "CLNT_NO_FAVORITES"})}/>
						}
					}
				} else {
					postsList =	<InLineMessage type={Utils.getMessageTypeErr()} 
									message={Utils.getStrResource({lang: this.props.language, code: "SRV_UNAUTH"})}/>					

				}
				//соберем финальный вид компонента
				content =	<div className="w-section u-sect-page-cardlst">
								<div className="w-row">
									<div className="w-col w-col-12 w-col-stack u-col-cardlst1">										
										{postsList}
									</div>
								</div>
							</div>
				break;
			}
			//прочие режимы
			default: {
				content =	<InLineMessage type={Utils.getMessageTypeErr()} 
								message={Utils.getStrResource({lang: this.props.language, code: "CLNT_NO_MODE"})}/>
			}
		}
		//генератор		
		return (
			<div name="posts" className="content-center">
				{content}
			</div>
		);
	}
});