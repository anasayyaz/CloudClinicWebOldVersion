import React from 'react';
import { withRouter } from 'react-router-dom';
import { Search, Print as PrintIcon, Close } from '@material-ui/icons';
import { getMonthName, formatTime } from "../../_helper/functions";
import ReactToPrint from "react-to-print";
import PrintProvider, { Print, NoPrint } from 'react-easy-print';
import { NavLink } from "react-router-dom";


class STable extends React.Component {
	constructor(props) {
		super(props);
		this.requestData = props.requestData;
		this.state = {
			search: false,
			requestData: this.requestData,
		}
	}
	render() {
		let { title, columns, data, icon, meeting } = this.props;
		let { search, requestData } = this.state;
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
								<button className="btn btn-md cc-btn mx-1">
									<span className="material-icons align-middle">
										<Close
											onClick={() => {
												requestData['QuerySearch'] = "";
												this.setState({ search: false, requestData })
												this.props.handleSearchClick(requestData, this.props.$class)
											}}
										/>
									</span>
								</button>
								<button className="btn btn-md cc-btn mx-1">
									<span className="material-icons align-middle">
										<input
											aria-invalid="false"
											type="text"
											aria-label="Search"
											className="MuiInputBase-input MuiInput-input"
											value={requestData["QuerySearch"]}
											onChange={(e) => {
												requestData["QuerySearch"] = e.target.value;
												this.setState({ requestData })
											}}
											style={{ border: 'none', borderBottom: "2PX solid rgb(31 134 219)", width: '15rem', background: 'none' }}
										/>
									</span>
								</button>
								<button className="startMeeting btn btn-sm cc-btn border-0 px-3"
									onClick={() => { this.props.handleSearchClick(requestData, this.props.$class) }}
								>
									<span className="material-icons align-middle">
										Search
									</span>
								</button>
							</div>}
						</NoPrint>
						<NoPrint>
							<div>
								{this.props.search && <button className="btn btn-md cc-btn mx-1">
									<span className="material-icons align-middle">
										<Search onClick={() => { this.setState({ search: true }) }} />
									</span>
								</button>}
								<ReactToPrint
									trigger={() => <button className="btn btn-md cc-btn mx-1">
										<span className="material-icons align-middle">
											<PrintIcon />
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
							<div className="table-section-inner" style={{ overflowX: 'auto' }}>
								<table className="patients-table table table-sm mb-0">
									<thead>
										<tr className="shadow">
											{
												columns.map((column, index) => {
													return column.hide
														?
														<th key={`th${index}`} scope="col" className="p-2 pl-3 border-0"></th>
														:
														<th key={`th${index}`} scope="col" className="p-2 pl-3 border-0">{column.label}</th>;
												})
											}
										</tr>
									</thead>
									<tbody>
										{
											Array.isArray(data) ? data.map((row, index) => {
												return <tr key={`tr${index}`} className="bg-white shadow" style={{ color: 'black' }}>
													{columns.map((column, i) => {
														let data = column.name === "startDateTime" ? new Date(row[column.name]) : row[column.name];
														console.log('column', column.button, column)
														return <td key={`${index}td${i}`} className="align-middle font-weight-bold p-2">
															{column?.button?.show ?
																<div style={{ marginTop: "0px", marginBottom: "20px", textAlign: "right" }}>
																	<button
																		className="btn btn-md cc-btn w-20 border-0 shadow"
																		onClick={() => { column.button.operation(row[column.name]) }}
																		style={{
																			cursor:column.button?.disabled && row[column.button?.disabled?.key] === column.button?.disabled?.value && 'default',
																			background:column.button?.disabled && row[column.button?.disabled?.key] === column.button?.disabled?.value && 'gray',
																		}}
																		disabled={
																			column.button?.disabled && row[column.button?.disabled?.key] === column.button?.disabled?.value ? true : false }
																	>{column?.button?.value === "Edit" ? <column.button.icon/> : column?.button?.value}</button>
																</div>
																: <a>
																	{column?.name === "startDateTime" ? `${getMonthName(data) + " " + data.getDate() + ", " + data.getFullYear()} ${formatTime(data)}` : data}
																</a>}
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
				</Print>
			</PrintProvider>
		);

	}
}

export default withRouter(STable);