import { Test, TestingModule } from '@nestjs/testing';
import { ShelvesController } from './shelves.controller';
import { ShelvesService } from './shelves.service';

describe('ShelvesController', () => {
  let shelvesController: ShelvesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ShelvesController],
      providers: [ShelvesService],
    }).compile();

    shelvesController = app.get<ShelvesController>(ShelvesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(shelvesController.getHello()).toBe('Hello World!');
    });
  });
});
