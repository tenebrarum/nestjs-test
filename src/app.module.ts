import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CatsController } from './modules/cats/cats.controller';
import { CatsModule } from './modules/cats/cats.module';
var cors = require('cors')

@Module({
  imports: [CatsModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors())
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        'cats/(.*)',
      )
      .forRoutes(CatsController);
  }

}
