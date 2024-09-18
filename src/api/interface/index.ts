// 包含包含所有的数据类型的定义

// * 请求响应参数(不包含data)
import { FileType } from "ant-design-vue/es/upload/interface";

export interface Result {
	code: string;
	msg: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data: T;
}

// 分页响应参数
export interface ResPage<T> {
	list: T[];
	pageNum: number;
	pageSize: number;
	total: number;
}

// 分页请求参数
export default interface ReqPage {
	pageNum: number;
	pageSize: number;
}

// * 登录模块
export namespace Login {
	export interface ReqLoginForm {
		username: string;
		password: string;
	}
	export interface ResLogin {
		access_token: string;
		username: string;
		token: string;
	}
	export interface ResAuthButtons {
		[key: string]: string[];
	}
	export interface ReqRegisterForm {
		username: string;
		password: string;
		email: string;
		phonenumber: string;
	}
}
// 用户管理模块
export namespace User {
	export interface ReqUserParams extends ReqPage {
		username: string;
		gender: number;
		idCard: string;
		email: string;
		address: string;
		createTime: string[];
		status: number;
	}
	export interface ResUserList {
		id: string;
		username: string;
		gender: number;
		user: { detail: { age: number } };
		idCard: string;
		email: string;
		address: string;
		createTime: string;
		status: number;
		avatar: string;
		photo: any[];
		children?: ResUserList[];
	}
}

// 角色列表模块
export namespace Role {
	export interface RoleList {
		id: string;
		createTime: string;
		updateTime: string;
		name: string;
		status: number;
		type: number;
	}
}
// 学生课程模块
export namespace Class {
	export interface Course {
		courseno: string;
		coursename: string;
		credit: string;
		credithour: string;
		coursetype: string;
		experimenttype: string;
		description: string;
	}
	export interface delCourse {
		courseno: string;
	}

	export interface delExperimentitem {
		itemno: string;
	}
	export interface Experimentitem {
		itemno: string;
		itemname: string;
		courseno: string;
		itemhour: number;
		itemcontent: string;
		itemtype: number;
		iscompulsory: number;
	}

	export interface union {
		coursename: string;
		courseno: string;
		credit: number;
		credithour: number;
		coursetype: number;
		experimenttype: number;
		description: string;
		iscompulsory: number;
		itemcontent: string;
		itemhour: number;
		itemname: string;
		itemno: string;
		itemtype: number;
	}

	export interface File {
		file: FileType | undefined;
	}
}
