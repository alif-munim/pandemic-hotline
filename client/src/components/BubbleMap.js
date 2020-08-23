import React from "react";
import {
	AzureMap,
	AzureMapDataSourceProvider,
	AzureMapLayerProvider,
	AzureMapsProvider,
} from "react-azure-maps";
import { AuthenticationType } from "azure-maps-control";
import Typography from "@material-ui/core/Typography";
// import { key } from "../key";
import { wrapperStyles } from "./RouteExample";
// import Description from "../Layout/Description";
function mouseOn(e) {
	e.map.getCanvas().style.cursor = "pointer";
}
function mouseLeave(e) {
	e.map.getCanvas().style.cursor = "";
}
function clusterClicked(e) {
	if (e && e.shapes && e.shapes.length > 0 && e.shapes[0].properties.cluster) {
		//Get the clustered point from the event.
		const cluster = e.shapes[0];
		//Get the cluster expansion zoom level. This is the zoom level at which the cluster starts to break apart.
		e.map.sources
			.getById("BubbleLayer DataSourceProvider")
			.getClusterExpansionZoom(cluster.properties.cluster_id)
			.then(function (zoom) {
				//Update the map camera to be centered over the cluster.
				e.map.setCamera({
					center: cluster.geometry.coordinates,
					zoom: zoom,
					type: "ease",
					duration: 200,
				});
			});
	}
}
const option = {
	authOptions: {
		authType: AuthenticationType.subscriptionKey,
		subscriptionKey: "KxZCtiOPTPXUg1qsqLr-jYzY0yXFQj2orHQ2lo47ZW8",
	},
	center: [-97, 39],
	zoom: 3,
	style: "night",
	view: "Auto",
};
const bubbleLayerOptions = {
	//Scale the size of the clustered bubble based on the number of points inthe cluster.
	radius: [
		"step",
		["get", "point_count"],
		20,
		100,
		30,
		750,
		40, //If point_count >= 750, radius is 40 pixels.
	],
	//Change the color of the cluster based on the value on the point_cluster property of the cluster.
	color: [
		"step",
		["get", "point_count"],
		"rgba(0,255,0,0.8)",
		100,
		"rgba(255,255,0,0.8)",
		750,
		"rgba(255,0,0,0.8)", //If the point_count >= 100, color is red.
	],
	strokeWidth: 0,
	filter: ["has", "point_count"], //Only rendered data points which have a point_count property, which clusters do.
};
const BubbleLayer = () =>
	React.createElement(
		"div",
		{ style: wrapperStyles.map },
		React.createElement(
			"div",
			{ style: { height: "300px" } },
			React.createElement(
				AzureMapsProvider,
				null,
				React.createElement(
					AzureMap,
					{ options: option },
					React.createElement(
						AzureMapDataSourceProvider,
						{
							id: "BubbleLayer DataSourceProvider",
							dataFromUrl: "https://api.npoint.io/8e937bc7bf821bf142c2",
							options: {
								//Tell the data source to cluster point data.
								cluster: true,
								//The radius in pixels to cluster points together.
								clusterRadius: 45,
								//The maximium zoom level in which clustering occurs.
								//If you zoom in more than this, all points are rendered as symbols.
								clusterMaxZoom: 15,
							},
						},
						React.createElement(AzureMapLayerProvider, {
							id: "BubbleLayer LayerProvider",
							options: bubbleLayerOptions,
							type: "BubbleLayer",
							events: {
								mouseenter: mouseOn,
								mouseleave: mouseLeave,
								click: clusterClicked,
							},
						}),
						React.createElement(AzureMapLayerProvider, {
							id: "BubbleLayer2 LayerProvider",
							options: {
								iconOptions: {
									image: "none", //Hide the icon image.
								},
								textOptions: {
									textField: ["get", "point_count_abbreviated"],
									offset: [0, 0.4],
								},
							},
							type: "SymbolLayer",
						}),
						React.createElement(AzureMapLayerProvider, {
							id: "BubbleLayer3 LayerProvider",
							options: {
								filter: ["!", ["has", "point_count"]], //Filter out clustered points from this layer.
							},
							type: "SymbolLayer",
						})
					)
				)
			)
		)
	);
export default BubbleLayer;
