"use strict";
var router_1 = require("@angular/router");
var demo_component_1 = require("./demo.component");
var other_component_1 = require("./other.component");
var appRoutes = [
    {
        path: '',
        pathMatch: 'full',
        component: demo_component_1.DemoComponent
    },
    {
        path: 'other',
        component: other_component_1.OtherComponent
    },
    {
        path: 'demo',
        component: demo_component_1.DemoComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
