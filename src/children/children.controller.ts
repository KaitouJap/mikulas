import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Query } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post()
  create(@Body() createChildDto: CreateChildDto) {
    return this.childrenService.create(createChildDto);
  }

  @Get()
  findAll(
    @Query('address') address?: string
  ) {
    return this.childrenService.findAll(address);
  }
  
  @Get('good')
  findGoodKids(){
    return this.childrenService.goodKids();
  }

  @Get('games')
  findGamesWithCount(){
    return this.childrenService.getGames();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const kid = await this.childrenService.findOne(+id);
    if(kid == null) throw new NotFoundException("Nincs ilyen ID-jű gyerek!");
    return kid;
  }


  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateChildDto: UpdateChildDto) {
    const kid = await this.childrenService.update(+id, updateChildDto); 
    if(kid == null) throw new NotFoundException("Nincs ilyen ID-jű gyerek!");
    return kid; 
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const kid = await this.childrenService.remove(+id);
    if(kid == null) throw new NotFoundException("Nincs ilyen ID-jű gyerek!");
    return kid;
  }

}
