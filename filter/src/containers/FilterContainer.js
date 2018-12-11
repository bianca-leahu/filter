import React, { Component } from 'react';
import Filter from '../components/Filter';
import { getData } from '../api/filterApi';

export default class FilterContainer extends Component {

	state = {
		data: [],
		isLoading: false
	}

	componentWillMount() {
		this.showData();
	}

	showData = async () => {
		this.setState({
            isLoading: true
        });

		try {
			const fetchedData = await getData(),
				// remove the duplicate users
				data = fetchedData.filter((obj, pos, arr) => arr.map(mapObj => mapObj.id).indexOf(obj.id) === pos);

			this.setState({
				data
			})

			this.setState({
	            isLoading: false
	        });
		}
		catch (err) {
            this.setState({
                isLoading: false
            });

            console.log(err);
        }
	}

    render() {
        return (
            <Filter 
            	data={this.state.data}
            	isLoading={this.state.isLoading} />
        );
    }
}