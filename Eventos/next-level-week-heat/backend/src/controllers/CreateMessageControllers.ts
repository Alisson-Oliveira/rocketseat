import { Request, Response } from 'express';
import { CreateMessageServices } from '../services/CreateMessageServices';

class CreateMessageControllers {
  async handle(request: Request, response: Response) {
    const { user_id } = request;
    const { message } = request.body;
    
    const service = new CreateMessageServices();

    try {
      const result = await service.execute(message, user_id);

      return response.json(result);
    } catch (error) {
      return response.json({ error: error.message });
    }  
  }
}

export { CreateMessageControllers };