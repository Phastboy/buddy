import { Test, TestingModule } from '@nestjs/testing';
import { SpacesController } from './spaces.controller';
import { SpacesService } from './spaces.service';

describe('SpacesController', () => {
  let spacesController: SpacesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SpacesController],
      providers: [SpacesService],
    }).compile();

    spacesController = app.get<SpacesController>(SpacesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(spacesController.getHello()).toBe('Hello World!');
    });
  });
});
