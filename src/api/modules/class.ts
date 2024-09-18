import { Class, ResultData } from "@/api/interface/index";
import { PORT } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 课程管理模块
 */
export const toUploadFile = (params: Class.File) => {
	return http.post(PORT + "/upload", params);
};

export const getUnion = () => {
	return http.get<Class.union[]>(PORT + "/experimentitem/unionData");
};

// 获取课程列表
export const getCourseList = () => {
	return http.get<Class.Course[]>(PORT + "/course");
};

// 获取实验课表
export const getExperimentitemList = () => {
	return http.get<Class.Experimentitem[]>(PORT + "/experimentitem");
};

export const addCourse = (params: Class.Course) => {
	return http.post<ResultData>(PORT + "/course", params);
};

export const addExperimentitem = (params: Class.Experimentitem) => {
	return http.post<ResultData>(PORT + "/experimentitem", params);
};

export const delCourse = (params: Class.delCourse) => {
	return http.delete<ResultData>(PORT + "/course", params);
};

export const delExperimentitem = (params: Class.delExperimentitem) => {
	return http.delete<ResultData>(PORT + "/experimentitem", params);
};
