import { JsonController, Get, Post, Body, Authorize, Put } from 'kiwi-server';
import { UserIn, LoginIn, ForgotPasswordIn, ResetPasswordIn } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { ProjectService } from '../services/project.service';
import { Log } from '../sdk/logs';
import { Response } from '../sdk/response';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service';
import { ResponseCode } from '../sdk/constants';

@JsonController('/user')
export class UserController {


	constructor(private authService: AuthService, private projectService: ProjectService, private userService: UserService) { }

	@Post('/login')
	public post(@Body() body: LoginIn) {
		return this.authService.login(body);
	}

	@Post()
	public register(@Body() body: UserIn) {
		return this.authService.register(body);
	}

	@Authorize()
	@Get('/current')
	public current(request: any) {
		try {
			return new Response(ResponseCode.OK, '', request.user);
		} catch (err) {
      Log.error(`user/current`, err);
      return new Response(ResponseCode.ERROR, environment.common.genericErrorMessage);
    }	
	}

	@Authorize()
	@Get('/logout')
	public logout() {
		// TODO: not sure if we need it
	}

	@Authorize()
	@Get('/projects')
	public async projects(request: any){
		try {
			const user = await this.userService.get(request.user.email);
      const projects = await this.projectService.list(user.projects);
      return new Response(ResponseCode.OK, '', projects);
    } catch (err) {
      Log.error(`user/projects`, err);
      return new Response(ResponseCode.ERROR, environment.common.genericErrorMessage);
    }
	}

	@Post('/forgot-password')
	public forgotPassword(@Body() body: ForgotPasswordIn) { }


	@Put('/reset-password')
	public resetPassword(@Body() body: ResetPasswordIn) { }
}