import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { ProjectDto } from '../dto/project.dto';
import { ProjectUpdateDTO } from '../dto/projectUpdate.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('create')
  create(@Body() body: ProjectDto) {
    return this.projectsService.createProject(body);
  }

  @Get('all')
  findAll() {
    return this.projectsService.findProjects();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findProjectById(id);
  }

  @Patch('edit/:id')
  update(@Param('id') id: string, @Body() body: ProjectUpdateDTO) {
    return this.projectsService.updateProject(id, body);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.projectsService.deleteProject(id);
  }
}
