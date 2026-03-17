import * as React from "react";
import Svg, { Rect, SvgProps } from "react-native-svg";

const HugSvg = (props: SvgProps) => (
    <Svg
        width={24}
        height={7}
        viewBox="0 0 24 7"
        fill="none"
        {...props}
    >
        <Rect width={24} height={2} rx={1} fill="#FFFBFB" fillOpacity={0.5} />
        <Rect
            x={4}
            y={5}
            width={16}
            height={2}
            rx={1}
            fill="#FFFBFB"
            fillOpacity={0.5}
        />
    </Svg>
);
export default HugSvg;
