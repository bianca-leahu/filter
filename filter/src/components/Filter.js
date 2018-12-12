import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Table, Input } from 'reactstrap';
import LoadingCircle from './LoadingCircle';

export default class Filter extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        isLoading: PropTypes.bool.isRequired
    }

    state = {
        filters: [],
        filteredData: [],
        noMatch: false
    }

    handleInputChange = (e) => {
        const filters = this.state.filters;

        let addNewFilter = true;

        const abbreviation = 'abbreviation';

        if (filters.length) {
            filters.forEach((filter, index) => {
                if (filter['id'] === e.target.name) {
                    if (e.target.value === '' || !e.target.value.length) {
                        filters.splice(index, 1);
                    }
                    else {
                        filter['value'] = e.target.value;
                    }

                    addNewFilter = false;
                }
            })
        }

        if (addNewFilter) {
          filters.push({ id: e.target.name, value: e.target.value });
        }

        this.setState({
            filters
        });


        const valuesArray = this.state.filters.map((filterItem) => {
            const formatedInputValue = filterItem.value.toLowerCase().toString();

            if (filterItem.id !== 'name') {
                return this.props.data.filter((item) => `${filterItem.id === 'party' || filterItem.id === 'canton' ? item[filterItem.id][abbreviation] : item[filterItem.id]}`.toLowerCase().toString().indexOf(formatedInputValue) !== -1)
            }
            else {
                return this.props.data.filter((item) => item.firstName.toLowerCase().indexOf(formatedInputValue) !== -1 || item.lastName.toLowerCase().indexOf(formatedInputValue) !== -1);
            }
        });

        this.getFilteredData(valuesArray);
    }

    getFilteredData = (data) => {
        const filteredData = data.slice(1).reduce((result, currentArray) => {
            return currentArray.filter((currentItem) => result.indexOf(currentItem) !== -1);
        }, data[0]);

        if (filteredData && filteredData.length === 0) {
            this.setState({
                noMatch: true
            })
        }
        else {
            this.setState({
                noMatch: false
            })
        }
    
        this.setState({
            filteredData
        })
    }

    render() {
        const { filteredData, noMatch } = this.state,
            { isLoading } = this.props;
        const list = filteredData && filteredData.length ? filteredData : this.props.data;

        return (
            <Fragment>
                {isLoading
                    ? <LoadingCircle />
                    : <div className='container filter-page'>
                        <div className='filter-page__search d-flex'>
                            <Input
                                ref={el => this.inputTitle = el}
                                name='id'
                                placeholder='Filter by ID'
                                defaultValue=''
                                autoComplete='off'
                                onChange={this.handleInputChange} />

                            <Input
                                name='name'
                                placeholder='Filter by Name'
                                defaultValue=''
                                autoComplete='off'
                                onChange={this.handleInputChange} />

                            <Input
                                name='party'
                                placeholder='Filter by Party'
                                defaultValue=''
                                autoComplete='off'
                                onChange={this.handleInputChange} />

                            <Input
                                name='canton'
                                placeholder='Filter by Canton'
                                defaultValue=''
                                autoComplete='off'
                                onChange={this.handleInputChange} />

                            <Input
                                type="select"
                                name="gender"
                                onChange={this.handleInputChange} >
                                <option value=''>Both Genders</option>
                                <option value='f'>Female</option>
                                <option value='m'>Male</option>
                            </Input>
                        </div>

                        {!noMatch 
                            ? <div className='filter-page__table d-flex'>
                                <Table className='text-left'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Party</th>
                                            <th>Canton</th>
                                            <th>Gender</th>
                                        </tr>
                                    </thead>
                                
                                    <tbody>
                                        {list.map((item) =>
                                            <tr key={item.id}>
                                                <td className='font-weight-bold'>{item.id}</td>
                                                <td>{item.firstName} {item.lastName}</td>
                                                <td>{item.party.abbreviation}</td>
                                                <td>{item.canton.abbreviation}</td>
                                                <td>{item.gender === 'm' ? 'Male' : 'Female'}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                            : <p className='font-weight-bold'>No Results Matching the Filter</p>}
                    </div>}
            </Fragment>
        );
    }
}