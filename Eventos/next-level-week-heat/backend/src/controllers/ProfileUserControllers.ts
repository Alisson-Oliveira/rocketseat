import { Request, Response } from 'express';
import { ProfileUserServices } from '../services/ProfileUserServices';

class ProfileUserControllers {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const service = new ProfileUserServices();

    try {
      const result = await service.execute(user_id);

      return response.json(result);
    } catch (error) {
      return response.json({ error: error.message });
    }  
  }
}

export { ProfileUserControllers };