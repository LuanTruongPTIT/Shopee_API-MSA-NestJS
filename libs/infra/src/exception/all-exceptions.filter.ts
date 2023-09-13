import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const error: any = exception.getError();
    const ctx = host.switchToHttp();
    const response: any = ctx.getResponse<Response>();
    response.json({
      statusCode: error.statusCode,
      error,
      timestamp: new Date().toISOString(),
      stack: exception.stack,
    });
  }
}
