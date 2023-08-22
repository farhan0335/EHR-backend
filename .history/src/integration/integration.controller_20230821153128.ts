import { Controller } from '@nestjs/common';

@Controller('integration')
export class IntegrationController {
    constructor(private readonly integrationSer)
}
