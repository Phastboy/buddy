import { ResponseInterceptor } from './response.interceptor';
import { CallHandler, ExecutionContext } from '@nestjs/common';
import { of, throwError } from 'rxjs';
import { HttpStatus } from '@nestjs/common';

describe('ResponseInterceptor', () => {
  let interceptor: ResponseInterceptor<any>;
  let context: ExecutionContext;
  let next: CallHandler;

  beforeEach(() => {
    interceptor = new ResponseInterceptor();
    context = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: jest.fn().mockReturnValue({
          statusCode: HttpStatus.OK,
        }),
      }),
    } as unknown as ExecutionContext;
    next = {
      handle: jest.fn().mockReturnValue(of('test response')),
    };
  });
  
  it('should be defined', () => {
    expect(new ResponseInterceptor()).toBeDefined();
  });

  it('should transform the response correctly', (done) => {
    interceptor.intercept(context, next).subscribe((result) => {
      expect(result).toEqual({
        success: true,
        statusCode: HttpStatus.OK,
        response: 'test response',
      });
      done();
    });
  });

  it('should handle errors correctly', (done) => {
    const error = {
      status: HttpStatus.BAD_REQUEST,
      response: { message: 'Bad Request', error: 'BadRequest' },
    };
    next.handle = jest.fn().mockReturnValue(throwError(error));

    interceptor.intercept(context, next).subscribe((result) => {
      expect(result).toEqual({
        success: false,
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad Request',
        error: 'BadRequest',
      });
      done();
    });
  });

  it('should handle errors without response correctly', (done) => {
    const error = new Error('Unexpected error');
    next.handle = jest.fn().mockReturnValue(throwError(error));

    interceptor.intercept(context, next).subscribe((result) => {
      expect(result).toEqual({
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Unexpected error',
        error: undefined,
      });
      done();
    });
  });

  it('should handle errors with custom status correctly', (done) => {
    const error = {
      status: HttpStatus.FORBIDDEN,
      message: 'Forbidden',
    };
    next.handle = jest.fn().mockReturnValue(throwError(error));

    interceptor.intercept(context, next).subscribe((result) => {
      expect(result).toEqual({
        success: false,
        statusCode: HttpStatus.FORBIDDEN,
        message: 'Forbidden',
        error: undefined,
      });
      done();
    });
  });
});
