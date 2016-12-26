### sign in
		method: post
		url: "/v1/user/signin"
		req: 
			{
				email:"",
				password："" //明文
			}
		res:
			{
				success:200 //401用户密码有错误 ，500服务器错误
			}


### forget pwd
		method: post
		url: "/v1/user/forget"
		req: 
			{
				email:""
			}
		res:
			{
				success:200 //401用户密码有错误 ，500服务器错误				
			}


### reset pwd 
	https://dockyard.sh/reset?key=""
	method: post
		url: "/v1/user/reset"
		req: 
			{
				email:"",
				password:"",
				re-password:""
			}
		res:
			{
				success:200 //400 other err ，500服务器错误
				message:""
			}


###  sign up
	method: post
		url: "/v1/user"
		req: 
			{
				usrname:"",
				email:"",
				password:""
			}
		res:
			{
				success:201 //400 other err ，500 service err
				message:""
			}


###  sign up
	method: post
		url: "/v1/user"
		req: 
			{
				usrname:"",
				email:"",
				password:""
			}
		res:
			{
				success:201 //400 other err ，500 service err
				message:""
			}


###  repositories
		method: get
		url: "/v1/user/<username>/orgs" // only org list 
		req: 
			{
				usrname:""
			}
		res:
			{
				success:200 //400 other err ，500 service err
				message:""
				list:[{
							name": "", // see repo-list param
							title: "",
							bio: "", // desc
							id": 222,  // see repo-list param 
							gravatar: "img",
							teams: 23,
							repositories: 498,
							role:"" //admin write read
						}]
			}

		method: get
		url: "/v1/orgs/<org>/repositories" //org repo
		req: 
			{
				org-id:""
			}
		res:
			{
				success:200 //400 other err ，500 service err
				message:""
				list:[
					{
						"namespace": "huawei",  // see repo-detail param
						"repository": "docker", // see repo-detail param
						"description": "",
						role:"", //admin write read
						"star": 342

					}
				]	
			}

### create repo
		method: post
		url: "/web/v1/repository" 
		req: 
			{
				
				
			}
		res:
			{}
			





