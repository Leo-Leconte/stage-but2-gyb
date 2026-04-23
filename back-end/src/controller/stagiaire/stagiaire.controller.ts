import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import { StagiaireService } from '../../service/stagiaire/stagiaire.service';

@Controller('api/stagiaire')
export class StagiaireController {
    constructor(private readonly stagiaireService: StagiaireService) {}

    @Get()
    findAll() {
        try{
            return this.stagiaireService.findAll();
        }
        catch(error){
            console.error("",error);
        }
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.stagiaireService.findByid(id);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.stagiaireService.delete(id);
    }

    @Post('/create')
    create(@Body() stagiaire: any) {
        return this.stagiaireService.create(stagiaire);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() stagiaire: any) {
        return this.stagiaireService.update(id, stagiaire);
    }
}
