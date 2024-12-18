import { BadRequestException, ConflictException, Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChildrenService {
  db: PrismaService;

  constructor(db: PrismaService){
    this.db = db;
  }

  create(createChildDto: CreateChildDto) {
    return this.db.kids.create({
      data: createChildDto
    });
  }

  findAll(address?: string) {
    return this.db.kids.findMany({
      where: {
        address: address,
      }
    });
  }

  async findOne(id: number) {
    return await this.db.kids.findUnique({
      where: {
        id: id
      }
    });
  }

  async update(id: number, updateChildDto: UpdateChildDto) {
    try{
      const existingChild = await this.db.kids.findUnique({
        where: { id },
      });

      if (!existingChild) {
        return null;
      }

      if ((!existingChild.wasGood && updateChildDto.wasGood == null )&& updateChildDto.wantedGame) {
        throw new ConflictException("Nem lehet rosszgyereknek allitani jatekot!");
      }

      if (updateChildDto.wasGood == false && updateChildDto.wantedGame){
        throw new BadRequestException("Nem lehet rosszgyereknek allitani jatekot!");
      }

      const game = updateChildDto.wantedGame ? updateChildDto.wantedGame : existingChild.wantedGame;

      return await this.db.kids.update({
        where: {
          id: id,
        },
        data: {
          ...updateChildDto,
          wantedGame: updateChildDto.wasGood == false ? null : game,
        }
      });
    }catch(e){
      if(e instanceof Prisma.PrismaClientKnownRequestError){
        return null;
      }
      throw e;
    }
  }

  async remove(id: number) {
    try{
      return await this.db.kids.delete({
        where: {
          id: id
        }
      });
    }catch (e){
      if(e instanceof Prisma.PrismaClientKnownRequestError){
        return null;
      }
    }
  }

  goodKids(){
    return this.db.kids.findMany({
      where: {
        wasGood: true
      }
    });
  }

  async getGames(){
    return await this.db.kids.groupBy({
      by: ['wantedGame'],
      _count: {
        wantedGame: true,
      },
    });
  }
}
