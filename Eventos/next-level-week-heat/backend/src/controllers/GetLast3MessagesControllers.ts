import { Request, Response } from 'express';
import { GetLast3MessagesServices } from '../services/GetLast3MessagesServices';

class GetLast3MessagesControllers {
  async handle(request: Request, response: Response) {
    const service = new GetLast3MessagesServices();

    try {
      const result = await service.execute();

      return response.json(result);
    } catch (error) {
      return response.json({ error: error.message });
    }  
  }
}

export { GetLast3MessagesControllers };