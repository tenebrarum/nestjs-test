import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, Observable, tap } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        console.log('Before...');
        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap(() => console.log(`After... ${Date.now() - now}ms`)),
                catchError((error, caugth) => {
                    console.log(`After... ${Date.now() - now}ms`)
                    throw error
                }),
            );
    }
}