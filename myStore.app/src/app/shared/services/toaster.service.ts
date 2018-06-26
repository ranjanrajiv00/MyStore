import { Injectable } from '@angular/core';
declare var $: any;

@Injectable()
export class ToasterService {
    private config: any;

    constructor() {
        this.config = {
            type: 'info',
            timer: 4000,
            placement: {
                from: 'top',
                align: 'right'
            }
        };
    }

    info(message: string) {
        this.config.type='info';
        $.notify({
            icon: "ti-pin-alt",
            message: message
        }, this.config);
    }

    success(message: string) {
        this.config.type='success';
        $.notify({
            icon: "ti-thumb-up",
            message: message
        }, this.config);
    }

    warning(message: string) {
        this.config.type='warning';
        $.notify({
            icon: "ti-alert",
            message: message
        }, this.config);
    }

    error(message: string) {
        this.config.type='danger';
        $.notify({
            icon: "ti-thumb-down",
            message: message
        }, this.config);
    }
}