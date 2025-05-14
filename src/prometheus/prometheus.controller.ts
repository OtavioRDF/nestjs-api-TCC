import { Controller, Get, Res } from "@nestjs/common";
import { PrometheusService } from "./prometheus.service";
import { Response } from "express";
import { register } from "prom-client";

@Controller('metrics')
export class PrometheusController{
    constructor(private readonly promService: PrometheusService) {}

    @Get()
    async getMetrics(@Res() res: Response): Promise<void> {
        const metrics = await this.promService.getMetrics();
        const nodeMetrics = await register.metrics();

        const combinedMetrics = `${metrics}\n${nodeMetrics}`;

        res.setHeader('Content-Type', 'text/plain; version=0.0.4; charset=utf-8');
        res.send(combinedMetrics);
    }
}