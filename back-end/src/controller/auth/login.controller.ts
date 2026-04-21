import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import {LoginService} from "../../service/auth/login.service";

@Controller('auth')
export class LoginController {
    constructor(private readonly loginService: LoginService){

    }

    @Post()
    findOne(@Body() email: string,mot_de_passe: string) {
        return this.loginService.findOne(email,mot_de_passe);
    }

}