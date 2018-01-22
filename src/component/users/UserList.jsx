import React from 'react';
import {Table,Button,Pagination,message,Modal } from 'antd';
import {getUserList,deleteUser} from 'apis/user/user';

const {confirm} = Modal;
export default class UserList extends React.Component {

	state={
		userList:[],
		loading:false,
		searchInfo:{},
		pagination:{
			pageSize:2,
			current:1
		},
		selectedRowKeys:[]
	}

	componentDidMount(){
		const pagination = this.state.pagination;
	    this.fetchData(pagination);
  	}

	fetchData=( params   )=>{
		this.setState({loading:true})
		getUserList( params ).then(json=>{
			this.setState({loading:false})
			if(json.code==="0000"){
				let pagination = json.pagination;
		    	this.setState({pagination,userList:json.data})
			}
	    }).catch(error=>{
	    });
	}

	pageChange=(current,pageSize)=>{
		this.fetchData( {current,pageSize} );
	}

	search=()=>{
		let searchInfo ={};
		this.fetchData( searchInfo);
	}


	onSelectChange = (selectedRowKeys) => {
	    this.setState({ selectedRowKeys });
	}

	doDelete=(recoder,e)=>{
		console.log(recoder,e)
		let id =e.target.getAttribute("data-id");
		let that = this;
		confirm({
			title:"提示",
			content:`确认要删除${recoder.username}?`,
			onOk(){
				deleteUser(id).then(json=>{
					if(json.code==="0000"){
						message.info(json.msg);
						that.fetchData();
					}
				})
			},
			okText:"确认",
			cancelText:"取消"
		})
		
	}

	render(){
		let {loading,selectedRowKeys,pagination }  = this.state;
		const hasSelected = selectedRowKeys.length > 0;
		const columns = [{
			title:"ID",
			dataIndex:"id",
			key:"id"
		},{
		  title: '用户名',
		  dataIndex: 'username',
		  key: 'username',
		}, {
		  title: 'email',
		  dataIndex: 'email',
		  key: 'email',
		},{
		  title: '手机号',
		  dataIndex: 'phone',
		  key: 'phone',
		}, {
		  title: 'Action',
		  key: 'action',
		  render: (text, record) => (
		    <span>
		      <a href="javascript:void(0)" onClick={this.doDelete.bind(this,record) } data-id={record.id}>删除</a>
		    </span>
		  ),
		}];
		const rowSelection ={
			selectedRowKeys,
      		onChange: this.onSelectChange,
      		hideDefaultSelections: true,
      		selections: [{
	        key: 'all-data',
	        text: '选择所有',
	        onSelect: (changableRowKeys) => {
	          this.setState({
	            selectedRowKeys:changableRowKeys
	          });
	        },
	      }, {
	        key: 'odd',
	        text: '奇数行',
	        onSelect: (changableRowKeys) => {
	          let newSelectedRowKeys = [];
	          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
	            if (index % 2 !== 0) {
	              return false;
	            }
	            return true;
	          });
	          this.setState({ selectedRowKeys: newSelectedRowKeys });
	        },
	      }, {
	        key: 'even',
	        text: '偶数行',
	        onSelect: (changableRowKeys) => {
	          let newSelectedRowKeys = [];
	          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
	            if (index % 2 !== 0) {
	              return true;
	            }
	            return false;
	          });
	          this.setState({ selectedRowKeys: newSelectedRowKeys });
	        },
	      }],
	      onSelection: this.onSelection,
		}

		

		return (
			<div>
				<div style={{ marginBottom: 16 }}>
		          <Button
		            type="primary"
		            onClick={this.search}
		            loading={loading}
		          >
		            刷新
		          </Button>
		          <span style={{ marginLeft: 8 }}>
		            {hasSelected ? `已选择 ${selectedRowKeys.length} 项` : ''}
		          </span>
		        </div>
				
				<Table pagination={false} locale={{emptyText:"没有数据..."}} loading={loading} rowKey="id" onChange={this.handleChange} rowSelection={rowSelection} columns={columns} dataSource={this.state.userList} />
				<div className="pagination-wrap">
					<Pagination  {...pagination}  onChange={this.pageChange} showTotal={ (total)=>(`共${total}条记录`) } />
				</div>
			</div>
		)
	}

}

