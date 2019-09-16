import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// core components
import GridContainer from "components/Grid/GridContainer.js";

export default function ContainerPage(props) {
    const { routesProp } = props;

    const switchRoutes = routesProp.subRoutes ?
        <Switch>
        {routesProp.subRoutes.map((prop, key) => (
            <Route
            path={routesProp.layout + routesProp.path + prop.path }
            component={prop.component}
            key={key}
            />
        ))}
        <Redirect from={routesProp.layout + routesProp.path} to={routesProp.layout + routesProp.path + '/index'} />
        </Switch>
        : null;

    return (
        <GridContainer>
            {switchRoutes}
        </GridContainer>
    )
}