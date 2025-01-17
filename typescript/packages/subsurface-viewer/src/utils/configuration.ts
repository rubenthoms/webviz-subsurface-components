// This configuration object determines which deck.gl classes are accessible in the serialized json
// See https://deck.gl/docs/api-reference/json/overview for more details.

import {
    COORDINATE_SYSTEM,
    FirstPersonView,
    MapView,
    OrbitView,
    OrthographicView,
} from "@deck.gl/core";

import * as AggregationLayers from "@deck.gl/aggregation-layers";
import * as GeoLayers from "@deck.gl/geo-layers";
import * as Layers from "@deck.gl/layers";
import * as MeshLayers from "@deck.gl/mesh-layers";

import { registerLoaders } from "@loaders.gl/core";

import * as CustomLayers from "../layers";
import * as CustomViews from "../views";

// Note: deck already registers JSONLoader...
registerLoaders([]);

export default {
    // Classes that should be instantiatable by JSON converter
    classes: Object.assign(
        // Support `@deck.gl/core` Views
        {
            FirstPersonView,
            MapView,
            OrbitView,
            OrthographicView,
            ...CustomViews,
        },

        // a map of all layers that should be exposes as JSONLayers
        Layers,
        AggregationLayers,
        GeoLayers,
        MeshLayers,
        CustomLayers
    ),

    // Functions that should be executed by JSON converter
    functions: {},

    // Enumerations that should be available to JSON parser
    // Will be resolved as `<enum-name>.<enum-value>`
    enumerations: {
        COORDINATE_SYSTEM,
    },

    // Constants that should be resolved with the provided values by JSON converter
    constants: {},
};
