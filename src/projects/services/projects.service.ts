import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsEntity } from '../entities/project.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectDto } from '../dto/project.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { ProjectUpdateDTO } from '../dto/projectUpdate.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private readonly projectRepository: Repository<ProjectsEntity>,
  ) {}

  public async createProject(body: ProjectDto): Promise<ProjectsEntity> {
    try {
      return await this.projectRepository.save(body);
    } catch (error) {
      throw error;
    }
  }

  public async findProjects(): Promise<ProjectsEntity[]> {
    try {
      const project: ProjectsEntity[] = await this.projectRepository.find();

      if (project.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No project found',
        });
      }

      return project;
    } catch (error) {
      if (error instanceof Error) {
        throw new ErrorManager.createSignatureError(error.message);
      } else {
        throw error;
      }
    }
  }

  public async findProjectById(id: string): Promise<ProjectsEntity> {
    try {
      if (!id) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `Project not found`,
        });
      }

      const project: ProjectsEntity = await this.projectRepository
        .createQueryBuilder('project')
        .where({ id })
        .getOne();

      if (!project) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No project found',
        });
      }

      return project;
    } catch (error) {
      throw error;
    }
  }

  public async updateProject(
    id: string,
    body: ProjectUpdateDTO,
  ): Promise<UpdateResult | undefined> {
    try {
      if (!id) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `Project not found`,
        });
      }

      const project: UpdateResult = await this.projectRepository.update(
        id,
        body,
      );
      if (project.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `Can't update project`,
        });
      }
      return project;
    } catch (error) {
      if (error instanceof Error) {
        throw new ErrorManager.createSignatureError(error.message);
      } else {
        throw error;
      }
    }
  }

  public async deleteProject(id: string): Promise<DeleteResult | undefined> {
    try {
      if (!id) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `Project not found`,
        });
      }

      const project: DeleteResult = await this.projectRepository.delete(id);
      if (project.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `Can't delete project`,
        });
      }
      return project;
    } catch (error) {
      if (error instanceof Error) {
        throw new ErrorManager.createSignatureError(error.message);
      } else {
        throw error;
      }
    }
  }
}
