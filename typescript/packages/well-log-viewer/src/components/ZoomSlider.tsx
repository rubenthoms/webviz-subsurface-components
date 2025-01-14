import React, { Component } from "react";

import Slider from "@mui/material/Slider";

export interface ZoomSliderProps {
    onChange: (value: number) => void; // zoom value callback
    value: number; // zoom value.

    max?: number; // max zoom value. default 256
    step?: number; // step of zoom level. default 0.5
}

interface State {
    level: number;
}

function convertLevelToValue(level: number): number {
    // convert zoom level to zoom value
    return 2 ** level;
}
function convertValueToLevel(value: number): number {
    // convert zoom value to zoom level
    return value > 0 ? Math.log2(value) : 0;
}

function valueLabelFormat(value: number /*, index: number*/): string {
    return value.toFixed(Number.isInteger(value) || value > 20 ? 0 : 1);
}

class ZoomSlider extends Component<ZoomSliderProps, State> {
    constructor(props: ZoomSliderProps) {
        super(props);

        // TODO: Fix this the next time the file is edited.
        // eslint-disable-next-line react/prop-types
        const level = convertValueToLevel(this.props.value);
        this.state = {
            level: level,
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidUpdate(prevProps: ZoomSliderProps): void {
        // TODO: Fix this the next time the file is edited.
        // eslint-disable-next-line react/prop-types
        if (this.props.value !== prevProps.value) {
            this.setState((state: Readonly<State>) => {
                // TODO: Fix this the next time the file is edited.
                // eslint-disable-next-line react/prop-types
                const level = convertValueToLevel(this.props.value);
                if (state.level === level) return null;
                return { level: level };
            });
        }
    }

    // callback function from Zoom slider
    onChange(
        _event: Event,
        level: number | number[] // zoom level
    ): void {
        if (typeof level !== "number") return;
        this.setState((state: Readonly<State>) => {
            if (state.level === level) return null;
            // TODO: Fix this the next time the file is edited.
            // eslint-disable-next-line react/prop-types
            if (this.props.onChange)
                // TODO: Fix this the next time the file is edited.
                // eslint-disable-next-line react/prop-types
                this.props.onChange(convertLevelToValue(level));
            else console.error("ZoomSlider props.onChange not set");
            return { level: level as number };
        });
    }

    render(): JSX.Element {
        return (
            <Slider
                value={this.state.level}
                defaultValue={0}
                min={0}
                // TODO: Fix this the next time the file is edited.
                // eslint-disable-next-line react/prop-types
                step={this.props.step || 0.5}
                // TODO: Fix this the next time the file is edited.
                // eslint-disable-next-line react/prop-types
                max={convertValueToLevel(this.props.max || 256)}
                scale={convertLevelToValue} // convert zoom level to zoom value function
                onChange={this.onChange}
                getAriaValueText={valueLabelFormat}
                valueLabelFormat={valueLabelFormat}
                aria-labelledby="non-linear-slider"
                valueLabelDisplay="auto"
            />
        );
    }
}

export default ZoomSlider;
