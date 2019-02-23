import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import ImageResults from './imageresults.js'


class Search extends Component {
state = {
	searchText: '',
	amount: 5,
	apiurl: "https://pixabay.com/api/",
	apikey: "11620925-8698ca9d4c482a1f734b88dea",
	images: []
}

onTextChange = (e) => {
	const val=e.target.value
	this.setState({[e.target.name]: val}, () => {
		if (val===''){
			this.setState({images: []})
		}
		else {
		//https://pixabay.com/api/?key=11620925-8698ca9d4c482a1f734b88dea&q=yellow+flowers&image_type=photo
			axios.get(`${this.state.apiurl}/?key=${this.state.apikey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=false`)
			.then(res => this.setState({images: res.data.hits}))
			.catch(err => console.log(err));
			}
		})
}

onAmountChange = (e, index, value) => { this.setState({amount: value})}

	render(){
		console.log(this.state.images);
		return(
			<div>
				<TextField
					name="searchText"
					value={this.state.searchText}
					onChange={this.onTextChange}
					floatingLabelText="Search for Images"
					fullWidth={true}
				/>
				<br />

			<SelectField
	            value={this.state.amount}
	            onChange={this.onAmountChange}
	            floatingLabelText="Amount"
            >
	            <MenuItem value="">
	              <em>None</em>
	            </MenuItem>
	            <MenuItem value={5} primaryText="five" />
	            <MenuItem value={10} primaryText="ten" />
	            <MenuItem value={15} primaryText="fifteen" />
	            <MenuItem value={20} primaryText="twenty" />
          </SelectField>
          <br/>
          {this.state.images.length>0 ? (<ImageResults images={this.state.images} />):null}
			</div>
			)
	}
}

export default Search;
