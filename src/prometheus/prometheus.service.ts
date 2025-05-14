import * as client from 'prom-client';

export class PrometheusService {
    private readonly register: client.Registry;

    constructor(){
        this.register = new client.Registry();
        this.register.setDefaultLabels({ app: 'nestjs-prometheus'});
        client.collectDefaultMetrics({ register: this.register });        
    }

    getMetrics() {
        return this.register.metrics();
    }	
}