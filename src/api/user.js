import { BaseService } from "@/service";

class User extends BaseService {

	// 获取用户信息
	getUserInfo({ params = {}, options = {} }) {
		return this.request({
			url: "/sys/userinfo",
			method: "GET",
			params,
			options
		});
	}
}

export default User;



