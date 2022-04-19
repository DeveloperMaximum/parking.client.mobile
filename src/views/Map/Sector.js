import React from 'react';

import { App } from "../../components/App/Context";
import { Root } from "../../components/ui/Root/Root";
import { Header } from "../../components/ui/Header/Header";
import { Footer } from "../../components/ui/Footer/Footer";

import { Item } from "../../components/App/Sector";

export class Sector extends React.Component {

    static contextType = App;

    render() {

        return (
            <Root viewId={"SECTOR"}>
                <Header>
                    <div className="d-flex justify-content-between">
	                    <div className="d-flex" onClick={() => this.props.history.push(`/`)}>
	                        <i className="icon icon-chevron_left d-inline-block" />
	                        <h1 className="d-inline-block d-inline-block">Карта сектора</h1>
	                    </div>
	                    <div className="d-flex search-inner" onClick={async () => {
		                    await this.context.dialog({
			                    recursive: true,
			                    header: "Поиск",
			                    content: "Введите ID парковочного места",
			                    child: () => {
			                    	return (
					                    <>
						                    <div className={'input-group'}>
							                    <input type={`text`} className={"form-control mt-3 border-primary"} id={"SEARCH_INNER_ID"} />
						                    </div>
					                    </>
				                    )
			                    },
			                    buttons: {
				                    demo: {
					                    text: 'Искать',
					                    callback: async () => {
					                    	const search = document.querySelector(`#SEARCH_INNER_ID`).value;
						                    if(search === ''){
						                    	return 'Необходимо указать номер парковочного места';
						                    }

						                    let all = document.querySelectorAll(`#SECTOR .inner-${search}`);
						                    if(all.length === 0){
							                    return 'Указанное парковочное место не найдено';
						                    }
						                    return new Promise((resolve, reject) => {
							                    document.querySelector(`#APP`).classList.add('scrolling');
							                    document.querySelector(`#SECTOR header`).classList.add('position-fixed');
							                    document.querySelector(`#SECTOR .inner-${search}`).classList.add('active');

							                    setTimeout(() => {
								                    document.querySelector(`#SECTOR main .inner-${search}`).scrollIntoView({block: "center", behavior: "smooth"});
								                    document.querySelector(`#APP`).classList.remove('scrolling');
								                    document.querySelector(`#SECTOR header`).classList.remove('position-fixed');

								                    setTimeout(() => {
									                    document.querySelector(`#SECTOR .inner-${search}`).classList.remove('active');
									                    resolve(true);

									                    setTimeout(() => {
										                    document.querySelector(`#SECTOR .inner-${search}`).click();
										                    resolve(true);
									                    }, 500)

								                    }, 1500);
							                    }, 500);
						                    });
					                    },
				                    }
			                    }
		                    });
	                    }}>
	                        <i className="icon icon-search d-inline-block" />
	                    </div>
                    </div>
                </Header>

                <main>
                    <Item.Table id={this.props.match.params.id} history={this.props.history} />
                </main>

                <Footer history={this.props.history} />
            </Root>
        );
    }
}
