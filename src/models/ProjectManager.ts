import Joi from "joi";
import AbstractManager from "./AbstractManager";

export interface Project {
  id?: number;
  name: string;
  description: string;
  type: string;
  start_date: string;
  end_date: string;
  project_cost: number;
  share_link: string;
  is_private: boolean;
}

interface ProjectUpdated {
  id: number;
  name?: string;
  description?: string;
  type?: string;
  start_date?: string;
  end_date?: string;
  project_cost?: number;
  share_link?: string;
}

export default class ProjectManager extends AbstractManager {
  static table = "project";

  static async insert(project: Project) {
    return (await this.connection).query(
      `INSERT INTO ${ProjectManager.table} SET ?`,
      [project]
    );
  }

  static async update(project: ProjectUpdated, id: number) {
    return (await this.connection).query(
      `UPDATE ${ProjectManager.table} SET ? WHERE id = ?`,
      [project, id]
    );
  }

  static async validate(data: Project, forCreation: boolean = true) {
    const presence = forCreation ? "required" : "optional";
    return await Joi.object({
      name: Joi.string().max(255).presence(presence),
      description: Joi.string().max(255),
      type: Joi.string().max(255).presence(presence),
      start_date: Joi.string().max(255).presence(presence),
      end_date: Joi.string().max(255).presence(presence),
      project_cost: Joi.number().presence(presence),
      share_link: Joi.string().max(255).presence(presence),
      is_private: Joi.boolean()
    }).validate(data, { abortEarly: false }).error;
  }
}
