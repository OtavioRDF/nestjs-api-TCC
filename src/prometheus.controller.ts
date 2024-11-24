import { Controller, Get, Res } from "@nestjs/common";
import { PrometheusService } from "./prometheus.service";

@Controller('metrics')
export class PrometheusController{
    constructor(private readonly promService: PrometheusService) {}

    @Get()
    async getMetrics(@Res() res) {
        const metrics = await this.promService.getMetrics();
        res.setHeader('Content-Type', this.promService.getMetrics());
        res.send(metrics);
    }
}