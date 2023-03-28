import React from 'react';
import { withRouter } from 'react-router-dom';
import {Search, Print as PrintIcon, Close} from '@material-ui/icons';
import {getMonthName, formatTime} from "../../_helper/functions";
import ReactToPrint from "react-to-print";
import PrintProvider, { Print, NoPrint } from 'react-easy-print';


class Table extends React.Component{
	constructor(props){
		super(props);
		this.requestData=props.requestData;
		this.state={
			search: false,
			requestData : this.requestData,
			pagination : [10, 15, 20]
		}
	}
	allPages(){
		let [{data:{paginationMetadata}, requestData}, pages] = [this.props, []];
		for(let i=1; i<=paginationMetadata.totalPages; i++){
			pages.push(
				<li key={i} className={ paginationMetadata.currentPage === i ? "page-item disabled_button" : "page-item" }
					onClick={()=>{
						requestData['pageNumber'] = i;
						this.setState({requestData});
						this.props.handleSearchClick(requestData, this.props.$class)
					}}
				>
					<a className="page-link" style={{color:'#007bff'}}>
						{i}
					</a>
				</li>
			)
		}
		return pages
	}
	disableButtons(){
		let {paginationMetadata} = this.props.data;
		let nextBtn = document.getElementById("nxtButton");
		let prevBtn = document.getElementById("prevButton");
		if(paginationMetadata.nextPage !== "Yes"){
			nextBtn.classList.add("disabled_button")
		}
		else{
			nextBtn.classList.remove("disabled_button")
		}
		if(paginationMetadata.previousPage !==  "No"){
			prevBtn.classList.remove("disabled_button")
		}
		else{
			prevBtn.classList.add("disabled_button")
		}
	}
	render(){
		let {title, columns, data:{items:data}, icon, meeting, data:{paginationMetadata}} = this.props;
		let {search, requestData, pagination} = this.state;
		paginationMetadata?.currentPage && this.disableButtons();
		return (
			<PrintProvider ref={el => (this.componentRef = el)}>
				<Print single name="foo">
					<div className="row w-100 d-flex justify-content-between m-0">
						<Print printOnly>
							<h1 className="font-weight-light">{title}</h1>
						</Print>
						<NoPrint>{!search 
						? 
							<div>
								<h5 className="font-weight-light">{title}</h5>
							</div>
						:
							<div>
								<button className="btn btn-md mx-1">
								<span>
										<Close 
											onClick={()=>{
												requestData['QuerySearch'] = "";
												this.setState({search:false, requestData})
												this.props.handleSearchClick(requestData, this.props.$class)
											}}
										/>
									</span>
								</button>
								<button className="btn btn-md mx-1">
								<span>
									<input 
										aria-invalid="false" 
										type="text" 
										aria-label="Search" 
										className="MuiInputBase-input MuiInput-input" 
										value={requestData["QuerySearch"]}
										onChange={(e)=>{
											requestData["QuerySearch"] = e.target.value;
											this.setState({requestData})
										}}
										style={{border:'none', borderBottom:"2PX solid rgb(31 134 219)", width:'15rem', background:'none'}}
									/>
									</span>
								</button>
								<button className="startMeeting btn btn-sm btn-primary border-0 px-3" 
									onClick={()=>{this.props.handleSearchClick(requestData, this.props.$class)}}
								>
								<span>
										Search
									</span>
								</button>
							</div>}
						</NoPrint>
						<NoPrint>
							<div>
								<button className="btn btn-md mx-1">
								<span>
										<Search onClick={()=>{this.setState({search:true})}}/>
									</span>
								</button>
								<ReactToPrint
									trigger={() => <button className="btn btn-md mx-1">
										<span>
												<PrintIcon/>
											</span>
										</button>
									}
									documentTitle={title}
									content={() => this.componentRef}
									bodyClass={"patients-table"}
								/>
							</div>
						</NoPrint>
					</div>
					<div className="row">
						<div className="table-section col-md-12">
							<div className="table-section-inner" style={{overflowX:'auto'}}>
							<table className="patients-table table table-sm mb-0">
								<thead>
									<tr className="shadow">
										{
											columns.map((column, index)=>{
												return column.label && column.label === "Edit" ? <th key={`th${index}`} scope="col" className="p-2 pl-3 border-0"></th> :column.label !==" " ? <th key={`th${index}`} scope="col" className="p-2 pl-3 border-0">{column.label}</th> : null;
											})
										}
									</tr>
								</thead>
								<tbody>
									{	
										data ? data.map((row, index)=>{
											console.log('this is row data', row)
											return <tr key={`tr${index}`}className="bg-white shadow" style={{color:'black'}}>
												{columns.map((column, i)=>{
													let data = column.name === "startDateTime" ? new Date(row[column.name]) : row[column.name];
													return column.label !== " " && <td key={`${index}td${i}`} className="align-middle font-weight-bold p-2" 
													style={{cursor : column.name === this.props?.link?.key ? 'pointer' : '', color: column.name === this.props?.link?.key? 'blue' : 'black'}}
													onClick={()=>{
														if(column.name === this.props?.link?.key){
															console.log('entered', row, column, this.props?.link?.key)
														this.props.history.push(`/${this.props?.link?.link}/${row[this.props.link.key]}`)
													}}}>
															<a>
																{icon && icon.index === i && <span 
																	onClick={()=>{
																		this.props.history.push(`${icon?.link+row[icon?.key]}`)
																	}} 
																	className="material-icons align-middle btn btn-sm btn-light"
																>
																	<icon.icon/></span> }
															{
																	column.name === "startDateTime" 
																? 
																	`${getMonthName(data) + " " + data.getDate() + ", " + data.getFullYear()} ${formatTime(data)}` 
																: 
																	column.label === "Action" 
																? 
																	<NoPrint>
																		<a 
																			className="startMeeting btn btn-sm btn-primary border-0 px-3"
																			onClick={()=>{
																				this.props.history.push(`${meeting?.link+row.id}`)
																			}} 
																		>
																			Start Meeting
																		</a>
																	</NoPrint>
																:
																	" "+data ? data : ''
															}
															</a> 
														</td>
												})}
												</tr>
											}) : <tr>Sorry No Record Found</tr>	
										}
								</tbody>
							</table>
							</div>
						</div>
					</div>
					<NoPrint>
						<div className="row float-right pr-5 mt-3 pb-5">
							<label htmlFor="exampleFoFrmControlSelect1" className="pt-1 pr-2 m-0">Rows per page: </label>
							<form>
								<div className="form-group mr-3">
									<select 
										className="form-control" 
										id="exampleFormControlSelect1" 
										onClick={(e)=>{
											requestData['pageSize'] = e.target.value;
											this.setState({requestData});
											this.props.handleSearchClick(requestData, this.props.$class)
										}}
									>
										{
											pagination.map((length, index)=>{
												return <option key={`option${index}`}>{length}</option>
											})
										}
									</select>
								</div>
							</form>
							<ul className="pagination text-dark">
								<li 
									id="prevButton"
									className="page-item text-dark"
									onClick={()=>{
										requestData['pageNumber'] = paginationMetadata.currentPage-1;
										this.setState({requestData});
										this.props.handleSearchClick(requestData, this.props.$class)
									}}
								>
									<a className="page-link" style={{color:'#007bff'}}>Previous</a>
								</li>
							{
								paginationMetadata?.currentPage && this.allPages()
							}
								<li 
									id="nxtButton"
									className={"page-item"}
									onClick={()=>{
										requestData['pageNumber'] = paginationMetadata.currentPage+1;
										this.setState({requestData});
										this.props.handleSearchClick(requestData, this.props.$class)
									}}
								>
									<a className="page-link" style={{color:'#007bff'}}>Next</a>
								</li>
							</ul>
						</div>
					</NoPrint>
				</Print>
			</PrintProvider>
		);

	}
}

export default withRouter(Table);